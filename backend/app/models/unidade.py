from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class Unidade(Base):

    __tablename__ = "unidades"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    nome: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        unique=True
    )

    sigla: Mapped[str] = mapped_column(
        String(10),
        nullable=False,
        unique=True
    )