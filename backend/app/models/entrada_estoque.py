from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class EntradaEstoque(Base):
    __tablename__ = "entradas_estoque"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    produto_id: Mapped[int] = mapped_column(
        ForeignKey("produtos.id"),
        nullable=False,
    )

    fornecedor_id: Mapped[int | None] = mapped_column(
        ForeignKey("fornecedores.id"),
        nullable=True,
    )

    usuario_id: Mapped[int] = mapped_column(
        ForeignKey("usuarios.id"),
        nullable=False,
    )

    origem: Mapped[str] = mapped_column(
        String(30),
        default="COMPRA",
        nullable=False,
    )

    numero_documento: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    quantidade: Mapped[float] = mapped_column(
        Numeric(12, 2),
        nullable=False,
    )

    custo_unitario: Mapped[float] = mapped_column(
        Numeric(12, 2),
        nullable=False,
    )

    valor_total: Mapped[float] = mapped_column(
        Numeric(12, 2),
        nullable=False,
    )

    observacao: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    data_entrada: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    criado_em: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    atualizado_em: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    produto = relationship(
        "Produto",
        back_populates="entradas",
    )

    fornecedor = relationship(
        "Fornecedor",
        back_populates="entradas",
    )

    usuario = relationship(
        "Usuario",
    )
