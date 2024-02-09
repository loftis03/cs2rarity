steps = [
    [
        """
        CREATE TABLE skins(
            id VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            weapon VARCHAR(255) NOT NULL,
            pattern VARCHAR(255) NOT NULL,
            min_float INTEGER NOT NULL,
            max_float INTEGER NOT NULL,
            rarity VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL
        );
        """,
        """
            DROP TABLE skins;
        """,
    ]
]