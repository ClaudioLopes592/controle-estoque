from sqlalchemy import ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Produto(Base):

    __tablename__ = "produtos"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    codigo: Mapped[str] = mapped_column(String(30), nullable=False, unique=True)

    nome: Mapped[str] = mapped_column(String(150), nullable=False)

    categoria_id: Mapped[int] = mapped_column(
        ForeignKey("categorias.id"), nullable=False
    )

    fornecedor_id: Mapped[int] = mapped_column(
        ForeignKey("fornecedores.id"), nullable=False
    )

    unidade_id: Mapped[int] = mapped_column(ForeignKey("unidades.id"), nullable=False)

    preco_compra: Mapped[float] = mapped_column(Numeric(10, 2), default=0)

    preco_venda: Mapped[float] = mapped_column(Numeric(10, 2), default=0)

    estoque_atual: Mapped[float] = mapped_column(Numeric(10, 2), default=0)

    estoque_minimo: Mapped[float] = mapped_column(Numeric(10, 2), default=0)

    descricao: Mapped[str | None] = mapped_column(Text, nullable=True)

    categoria = relationship("Categoria")

    fornecedor = relationship("Fornecedor")

    unidade = relationship("Unidade")

    entradas = relationship(
        "EntradaEstoque",
        back_populates="produto",
    )

    saidas = relationship(
        "SaidaEstoque",
        back_populates="produto",
    )
