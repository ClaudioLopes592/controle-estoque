from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class SaidaEstoqueBase(BaseModel):
    produto_id: int
    usuario_id: int
    origem: str = "VENDA"
    numero_documento: str | None = None
    quantidade: Decimal
    preco_unitario: Decimal
    valor_total: Decimal
    observacao: str | None = None


class SaidaEstoqueCreate(SaidaEstoqueBase):
    pass


class SaidaEstoqueUpdate(BaseModel):
    produto_id: int | None = None
    usuario_id: int | None = None
    origem: str | None = None
    numero_documento: str | None = None
    quantidade: Decimal | None = None
    preco_unitario: Decimal | None = None
    valor_total: Decimal | None = None
    observacao: str | None = None


class SaidaEstoqueResponse(SaidaEstoqueBase):
    id: int
    data_saida: datetime
    criado_em: datetime

    model_config = ConfigDict(from_attributes=True)
