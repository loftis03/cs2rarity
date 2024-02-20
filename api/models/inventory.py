from pydantic import BaseModel


class InventoryIn(BaseModel):
    account_id: int


class InventoryOut(BaseModel):
    id: int
    account_id: int
