steps = [
    [
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            profile_pic VARCHAR(255) DEFAULT 'https://static.wikia.nocookie.net/logopedia/images/4/49/Counter-Strike_2_%28Icon%29.png/revision/latest?cb=20230330015359',
            created_at VARCHAR(255) DEFAULT CURRENT_TIMESTAMP NOT NULL
        );
        """,
        """
        DROP TABLE accounts;
        """,
    ],
]
