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
