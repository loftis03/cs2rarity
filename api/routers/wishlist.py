from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
# from typing import List
from models.wishlist import WishlistIn, WishlistOut
from authenticator import authenticator
from queries.wishlist import WishlistQueries
from typing import List

router = APIRouter()

@router.get("/api/wishlist", response_model=List[WishlistOut])
def get_wishlist_by_user(
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: WishlistQueries = Depends(),
):
    if account_data is None:
        raise HTTPException(status_code=401, detail="Login to Create Wishlist.")
    return queries.get_wishlist_by_user(account_id=account_data["id"])

@router.post("/api/wishlist", response_model=WishlistOut)
def create_wishlist(
    wishlist: WishlistIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: WishlistQueries = Depends(),
):
    if account_data is None:
        raise HTTPException(status_code=401, detail="Login to Create Wishlist.")
    return queries.create_wishlist(wishlist=wishlist, account_id=account_data["id"])
