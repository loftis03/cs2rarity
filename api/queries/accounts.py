from queries.pool import pool
from models.accounts import (
    AccountOutWithPassword,
    AccountIn,
    DuplicateAccountError,
)


class AccountQueries:
    def get(self, username: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, email, username, password, profile_picture, created_at
                    FROM accounts
                    WHERE username = %s
                    """,
                    [username],
                )
                record = result.fetchone()
                if record is None:
                    return None

                return AccountOutWithPassword(
                    id=record[0],
                    email=record[1],
                    username=record[2],
                    hashed_password=record[3],
                    profile_picture=record[4],
                    created_at=record[5],
                )

    def create(
        self, info: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO accounts
                    (email, username, password, profile_picture, created_at)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        info.email,
                        info.username,
                        hashed_password,
                        info.profile_picture,
                    ],
                )
                id = result.fetchone()[0]
                props = info.dict()
                if self.get(props["username"]):
                    raise DuplicateAccountError
                props["hashed_password"] = hashed_password
                return AccountOutWithPassword(id=id, **props)
