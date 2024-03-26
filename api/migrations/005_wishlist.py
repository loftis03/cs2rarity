steps = [
    [
        """
        CREATE TABLE wishlist(
            id SERIAL PRIMARY KEY,
            account_id INTEGER REFERENCES accounts(id),
            name VARCHAR(255) UNIQUE NOT NULL
        );
        """,
        """
        DROP TABLE wishlist;
        """,
    ],
    [
        """
        CREATE TABLE wishlist_skins(
            id SERIAL PRIMARY KEY,
            skin_id VARCHAR(255) NOT NULL,
            wishlist_id INTEGER REFERENCES wishlist(id) ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE wishlist_skins;
        """,
    ],
]
