steps = [
    [
        """
        CREATE TABLE inventory(
            id SERIAL PRIMARY KEY,
            account_id INTEGER REFERENCES accounts(id),
            name VARCHAR(255) DEFAULT 'Inventory'
        );
        """,
        """
        DROP TABLE inventory;
        """,
    ],
    [
        """
        CREATE TABLE inventory_skins(
            id SERIAL PRIMARY KEY,
            skin_id VARCHAR(255) NOT NULL,
            inventory_id INTEGER REFERENCES inventory(id) ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE inventory_skins;
        """,
    ],
]
