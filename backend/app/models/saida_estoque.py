from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class SaidaEstoque(Base):
    __tablename__ = "saidas_estoque"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    produto_id: Mapped[int] = mapped_column(
        ForeignKey("produtos.id"),
        nullable=False,
    )

    usuario_id: Mapped[int] = mapped_column(
        ForeignKey("usuarios.id"),
        nullable=False,
    )

    origem: Mapped[str] = mapped_column(
        String(30),
        default="VENDA",
        nullable=False,
    )

    numero_documento: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    quantidade: Mapped[float] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    preco_unitario: Mapped[float] = mapped_column(
        Numeric(10, 2),
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

    data_saida: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    criado_em: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    produto = relationship(
        "Produto",
        back_populates="saidas",
    )

    usuario = relationship(
        "Usuario",
    )
