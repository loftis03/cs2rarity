from pydantic import BaseModel
from typing import List


class WishlistIn(BaseModel):
    name: str


class WishlistOut(BaseModel):
    account_id: int
    id: int
    name: str


class WishlistSkinIn(BaseModel):
    skin_id: str
    wishlist_id: int


class WishlistSkinOut(BaseModel):
    id: int
    skin_id: str
    wishlist_id: int


class WishlistList(BaseModel):
    wishlist_list: List[int]
