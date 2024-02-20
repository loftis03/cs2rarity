steps = [
    [
        """
        CREATE TABLE inventory(
            id SERIAL PRIMARY KEY,
            account_id INTEGER REFERENCES accounts(id)
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
            skin_id VARCHAR(255) NOT NULL
        );
        """,
        """
        DROP TABLE inventory_skins;
        """,
    ],
]
