from models.inventory import InventoryOut, InventoryIn, InventorySkinIn, InventorySkinOut
from typing import List, Optional
from queries.pool import pool


class InventoryQueries:
    def get_by_user(self, account_id: int) -> List[InventoryOut]:
        with pool.connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, name, account_id
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
                        name=row[1],
                        account_id=row[2]
                    )
                    for row in rows
                ]
                return inventory

    def create_inventory(
            self, inventory: InventoryIn, account_id: int
        ) -> Optional[InventoryOut]:
        with pool.connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO inventory (name, account_id)
                    VALUES(%s, %s)
                    RETURNING id;
                    """,
                    (inventory.name, account_id),
                )
                inventory_id = cursor.fetchone()[0]
                new_inventory = InventoryOut(
                    id=inventory_id,
                    name=inventory.name,
                    account_id=account_id,
                )
                return new_inventory

    def add_skin_to_inventory(
            self, inventory_skin: InventorySkinIn, inventory_id: int, account_data: dict
    ) -> Optional[InventorySkinOut]:

        with pool.connection()as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO inventory_skins (skin_id, inventory_id)
                    VALUES (%s, %s)
                    RETURNING id;
                    """,
                    (inventory_skin.skin_id, inventory_id),
                )
                new_id = cursor.fetchone()[0]
                new_skin = InventorySkinOut(
                    id=new_id,
                    skin_id=inventory_skin.skin_id,
                    inventory_id=inventory_id,
                )
                return new_skin

    def get_all_skins_in_inventory(
            self, inventory_id: int, account_data: dict
    ) -> List[InventorySkinOut]:
         with pool.connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, skin_id, inventory_id
                    FROM inventory_skins
                    WHERE inventory_id = %s;
                    """,
                    [inventory_id],
                )

                result = []
                for skin in cursor:
                    skins = InventorySkinOut(
                        id=skin[0],
                        skin_id=skin[1],
                        inventory_id=skin[2]
                    )
                    result.append(skins)
                return result

    def remove_skin_from_inventory(
            self, inventory_id: int, id: int, account_data: dict
    ) -> bool:
        try:
            logged_in_account_id = account_data["id"]
            with pool.connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(
                        """
                        DELETE FROM inventory_skins
                        WHERE inventory_id = %s
                        AND id = %s
                        AND inventory_id IN (SELECT id FROM inventory WHERE account_id = %s)
                        """,
                        [inventory_id, id, logged_in_account_id],
                    )
            return True
        except Exception as e:
            print(e)
            return False