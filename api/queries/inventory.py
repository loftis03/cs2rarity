from models.inventory import InventoryOut, InventoryIn
from typing import List, Optional
from queries.pool import pool


class InventoryQueries:
    def get_by_user(self, account_id: int) -> List[InventoryOut]:
        with pool.connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, account_id
                    FROM inventory
                    WHERE account_id = %s
                    """,
                    [account_id]
                )
                rows = cursor.fetchall()
                if rows is None:
                    return None

                inventory = [
                    InventoryOut(
                        id=str(row[0]),
                        account_id=row[1]
                    )
                    for row in rows
                ]
                return inventory

    def create_inventory(self, inventory: InventoryIn, account_id: int) -> Optional[InventoryOut]:
        with pool.connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO inventory (account_id)
                    VALUES(%s)
                    RETURNING id;
                    """,
                    (account_id,),
                )
                inventory_id = cursor.fetchone()[0]
                new_inventory = InventoryOut(
                    id=inventory_id,
                    account_id=account_id,
                )
            return new_inventory
