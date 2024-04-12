from pydantic import BaseModel, Field
from typing import Optional
from jwtdown_fastapi.authentication import Token
from datetime import datetime


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    username: str
    password: str
    profile_picture: str = 'https://static.wikia.nocookie.net/logopedia/images/4/49/Counter-Strike_2_%28Icon%29.png/revision/latest?cb=20230330015359'
    # created_at: datetime = datetime.now()


class AccountOut(BaseModel):
    id: int
    email: str
    username: str
    profile_picture: str
    created_at: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str
