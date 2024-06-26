import requests
import os
from models.wishlist import WishlistIn, WishlistOut, WishlistSkinIn, WishlistSkinOut
from queries.pool import pool
from typing import Optional, List


class WishlistQueries:
    def create_wishlist(
            self, wishlist: WishlistIn, account_id: int
    ) -> Optional[WishlistOut]:
        with pool.connection()as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id FROM wishlist
                    WHERE name = %s AND account_id = %s;
                    """,
                    (wishlist.name, account_id),
                )
                existing_wishlist_id = cursor.fetchone()
                if existing_wishlist_id:
                    return None
                cursor.execute(
                    """
                    INSERT INTO wishlist (name, account_id)
                    VALUES (%s, %s)
                    RETURNING id;
                    """,
                    (wishlist.name, account_id),
                )
                wishlist_id = cursor.fetchone()[0]
                new_wishlist = WishlistOut(
                    id=wishlist_id,
                    name=wishlist.name,
                    account_id=account_id,
                )
                return new_wishlist

    def get_wishlist_by_user(self, account_id: int) -> List[WishlistOut]:
        with pool.connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, name, account_id
                    FROM wishlist
                    WHERE account_id = %s;
                    """,
                    [account_id],
                )
                rows = cursor.fetchall()
                wishlists = [
                    WishlistOut(
                        id=str(row[0]),
                        name=row[1],
                        account_id=row[2]
                    )
                    for row in rows
                ]
                return wishlists

    def delete_wishlist(self, wishlist_id: int, account_data: dict,) -> bool:
        try:
            logged_in_account_id = account_data["id"]
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM wishlist
                        WHERE id = %s AND account_id = %s;
                        """,
                        [wishlist_id, logged_in_account_id],
                    )

            return True
        except Exception as e:
            print(e)
            return False

    def add_skin_to_wishlist(
        self, wishlist_skin: WishlistSkinIn, wishlist_id: int, account_data: dict
    ) -> Optional[WishlistSkinOut]:

        with pool.connection()as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO wishlist_skins (skin_id, wishlist_id)
                    VALUES (%s, %s)
                    RETURNING id;
                    """,
                    (wishlist_skin.skin_id, wishlist_id),
                )
                new_id = cursor.fetchone()[0]
                new_skin = WishlistSkinOut(
                    id=new_id,
                    skin_id=wishlist_skin.skin_id,
                    wishlist_id=wishlist_id,
                )
                return new_skin

    def get_all_skins_in_wishlist(
        self, wishlist_id: int, account_data: dict
    ) -> List[WishlistSkinOut]:
        with pool.connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, skin_id, wishlist_id
                    FROM wishlist_skins
                    WHERE wishlist_id = %s;
                    """,
                    [wishlist_id],
                )

                result = []
                for skin in cursor:
                    skins = WishlistSkinOut(
                        id=skin[0],
                        skin_id=skin[1],
                        wishlist_id=skin[2]
                    )
                    result.append(skins)
                return result

    def remove_skin_from_wishlist(
            self, wishlist_id: int, id: str, account_data: dict
    ) -> bool:
        try:
            logged_in_account_id = account_data["id"]
            with pool.connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(
                        """
                        DELETE FROM wishlist_skins
                        WHERE wishlist_id = %s
                        AND skin_id = %s
                        AND wishlist_id IN (SELECT id FROM wishlist WHERE account_id = %s)
                        """,
                        [wishlist_id, id, logged_in_account_id],
                    )
            return True
        except Exception as e:
            print(e)
            return False

    def update_wishlist_name(
            self, wishlist_id: int, updated_name: str, account_data: dict
    ) -> Optional[WishlistOut]:
        logged_in_account_id = account_data["id"]
        with pool.connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    UPDATE wishlist
                    SET name = %s
                    WHERE id = %s AND account_id = %s
                    RETURNING id, name, account_id;
                    """,
                    [updated_name, wishlist_id, logged_in_account_id],
                )
                result = cursor.fetchone()
                if result:
                    return WishlistOut(
                        id=result[0],
                        name=result[1],
                        account_id=result[2],
                    )
                else:
                    return None

    def get_filtered_wishlist_skins(self, wishlist_list: list[int]):
        try:
            empty_dict = {}
            for wishlist in wishlist_list:
                with pool.connection() as conn:
                    with conn.cursor() as cursor:
                        cursor.execute(
                            """
                            SELECT id, skin_id, wishlist_id
                            FROM wishlist_skins
                            WHERE wishlist_id = %s;
                            """,
                            [wishlist],
                        )

                        result = []
                        for skin in cursor:
                            skins = WishlistSkinOut(
                                id=skin[0],
                                skin_id=skin[1],
                                wishlist_id=skin[2]
                            )
                            result.append(skins)
                        empty_dict[wishlist] = result
                        result = []
            return empty_dict

        except requests.exceptions.RequestException as e:
            print(f"Error retrieving skins list: {e}")
