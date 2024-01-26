from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from datetime import datetime


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    username: str
    password: str
    profile_picture: str = 'default_profile_pic.jpg'
    created_at: datetime = datetime.now()


class AccountOut(BaseModel):
    id: int
    email: str
    username: str
    profile_picture: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str