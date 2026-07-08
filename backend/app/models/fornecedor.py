from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Fornecedor(Base):

    __tablename__ = "fornecedores"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    nome: Mapped[str] = mapped_column(String(150), nullable=False, unique=True)

    cpf_cnpj: Mapped[str | None] = mapped_column(String(20), nullable=True)

    telefone: Mapped[str | None] = mapped_column(String(20), nullable=True)

    email: Mapped[str | None] = mapped_column(String(150), nullable=True)

    contato: Mapped[str | None] = mapped_column(String(100), nullable=True)

    endereco: Mapped[str | None] = mapped_column(String(255), nullable=True)

    entradas = relationship(
        "EntradaEstoque",
        back_populates="fornecedor",
    )
