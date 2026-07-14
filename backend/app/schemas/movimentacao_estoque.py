from datetime import datetime
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, ConfigDict
from app.schemas.produto import ProdutoResponse

from app.models.movimentacao_estoque import TipoMovimentacao, OrigemMovimentacao


class MovimentacaoEstoqueBase(BaseModel):

    produto_id: int

    tipo: TipoMovimentacao

    origem: OrigemMovimentacao

    quantidade: Decimal

    preco_unitario: Decimal

    observacao: Optional[str] = None


# class MovimentacaoEstoqueCreate(MovimentacaoEstoqueBase):
#     pass


# class MovimentacaoEstoqueUpdate(BaseModel):

#     observacao: Optional[str] = None


class MovimentacaoEstoqueResponse(BaseModel):

    id: int

    produto: ProdutoResponse

    tipo: TipoMovimentacao

    origem: OrigemMovimentacao

    quantidade: Decimal

    preco_unitario: Decimal

    observacao: Optional[str]

    data_movimento: datetime

    model_config = ConfigDict(from_attributes=True)
