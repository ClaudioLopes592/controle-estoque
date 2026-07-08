from datetime import datetime
from enum import Enum

from sqlalchemy import (
    DateTime,
    Enum as SqlEnum,
    ForeignKey,
    Integer,
    Numeric,
    Text,
)
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.database.base import Base


class TipoMovimentacao(str, Enum):
    ENTRADA = "E"
    SAIDA = "S"


class OrigemMovimentacao(str, Enum):
    COMPRA = "COMPRA"
    VENDA = "VENDA"
    AJUSTE = "AJUSTE"
    DEVOLUCAO = "DEVOLUCAO"
    PERDA = "PERDA"
    INVENTARIO = "INVENTARIO"
    PRODUCAO = "PRODUCAO"
    CONSUMO_INTERNO = "CONSUMO_INTERNO"
    OUTROS = "OUTROS"


class MovimentacaoEstoque(Base):

    __tablename__ = "movimentacoes_estoque"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    produto_id: Mapped[int] = mapped_column(ForeignKey("produtos.id"), nullable=False)

    tipo: Mapped[TipoMovimentacao] = mapped_column(
        SqlEnum(TipoMovimentacao), nullable=False
    )

    origem: Mapped[OrigemMovimentacao] = mapped_column(
        SqlEnum(OrigemMovimentacao), nullable=False
    )

    quantidade: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)

    preco_unitario: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)

    observacao: Mapped[str | None] = mapped_column(Text, nullable=True)

    data_movimento: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    produto = relationship("Produto")
