from pydantic import BaseModel


class WishlistIn(BaseModel):
    name: str


class WishlistOut(BaseModel):
    account_id: int
    id: int
    name: str
