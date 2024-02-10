import json
from json import JSONEncoder
from datetime import datetime
from models.accounts import AccountOutWithPassword


class DateTimeEncoder(JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()
        elif isinstance(o, str):
            return o
        return super().default(o)


account = AccountOutWithPassword(
    id=1,
    email="example@example.com",
    username="example",
    profile_picture="default_profile_pic.jpg",
    created_at=datetime.now(),
    hashed_password="hashed_password"
)

account_json = json.dumps(account.dict(), cls=DateTimeEncoder)
