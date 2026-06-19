from datetime import datetime

from sqlalchemy import JSON, Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import DateTime

from app.database import Base


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255), nullable=False)

    body = Column(Text, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    summary = Column(Text, nullable=True)
    key_points = Column(JSON, nullable=True)