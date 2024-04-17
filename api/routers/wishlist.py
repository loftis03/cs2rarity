from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
# from typing import List
from models.wishlist import WishlistIn, WishlistOut, WishlistSkinIn, WishlistSkinOut, WishlistList
from authenticator import authenticator
from queries.wishlist import WishlistQueries
from typing import List, Optional

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


@router.delete("/api/wishlists/{wishlist_id}/skins/{id}", response_model=bool)
def delete_skin(
    wishlist_id: int,
    id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: WishlistQueries = Depends()
):
    return queries.remove_skin_from_wishlist(wishlist_id, id, account_data)


@router.put("/api/wishlists/{wishlist_id}/", response_model=WishlistOut)
def update_wishlist_name(
    wishlist_id: int,
    updated_name: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: WishlistQueries = Depends()
):
    return queries.update_wishlist_name(wishlist_id, updated_name, account_data)


@router.post("/api/wishlist_filtered")
async def get_filtered_names(wishlist_data: WishlistList, queries: WishlistQueries = Depends()):
    wishlist_list = wishlist_data.wishlist_list
    potato = queries.get_filtered_wishlist_skins(wishlist_list)
    return potato
