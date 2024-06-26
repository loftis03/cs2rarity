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
    profile_picture: str


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
