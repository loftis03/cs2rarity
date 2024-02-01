from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)

from authenticator import authenticator

from queries.accounts import AccountQueries

from models.accounts import (
    AccountForm,
    AccountToken,
    DuplicateAccountError,
    AccountIn,
    AccountOutWithPassword,
    HttpError,
    AccountOut
)

from typing import List


router = APIRouter()


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOutWithPassword = Depends(
        authenticator.try_get_current_account_data
    ),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.get("/protected", response_model=bool)
async def get_protected(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return True


@router.get("/api/accounts/{account_id}")
async def get_account_id(
    account_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: AccountQueries = Depends()
):
    return queries.get_single_account(account_id)

@router.get("/api/acccounts", response_model=List[AccountOut])
async def get_all_accounts(
    queries: AccountQueries = Depends()
):
    return queries.get_all_accounts()
