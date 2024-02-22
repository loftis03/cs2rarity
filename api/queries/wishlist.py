import requests
import os
from models.wishlist import WishlistIn, WishlistOut
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
