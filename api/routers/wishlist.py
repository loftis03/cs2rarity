from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
# from typing import List
from models.wishlist import WishlistIn, WishlistOut, WishlistSkinIn, WishlistSkinOut
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


@router.delete("/api/wishlists/{wishlist_id}")
def delete_wishlist(
    wishlist_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: WishlistQueries = Depends(),
):
    return queries.delete_wishlist(wishlist_id, account_data)


@router.post("/api/wishlists/{wishlist_id}/skins", response_model=WishlistSkinOut)
def add_skin(
    wishlist_skin: WishlistSkinIn,
    wishlist_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: WishlistQueries = Depends()
):
    return queries.add_skin_to_wishlist(wishlist_skin, wishlist_id, account_data)


@router.get("/api/wishlists/{wishlist_id}/skins", response_model=List[WishlistSkinOut])
def get_all_skins(
    wishlist_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: WishlistQueries = Depends()
):
    return queries.get_all_skins_in_wishlist(wishlist_id, account_data)
