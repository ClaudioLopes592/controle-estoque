from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class EntradaEstoqueBase(BaseModel):
    produto_id: int
    fornecedor_id: int | None = None
    usuario_id: int

    origem: str = "COMPRA"

    numero_documento: str | None = None

    quantidade: int

    custo_unitario: Decimal

    valor_total: Decimal

    observacao: str | None = None

    data_entrada: datetime | None = None


class EntradaEstoqueCreate(EntradaEstoqueBase):
    pass


class EntradaEstoqueUpdate(BaseModel):
    fornecedor_id: int | None = None

    origem: str | None = None

    numero_documento: str | None = None

    quantidade: int | None = None

    custo_unitario: Decimal | None = None

    valor_total: Decimal | None = None

    observacao: str | None = None

    data_entrada: datetime | None = None


class EntradaEstoqueResponse(EntradaEstoqueBase):
    id: int

    criado_em: datetime

    atualizado_em: datetime

    model_config = ConfigDict(from_attributes=True)