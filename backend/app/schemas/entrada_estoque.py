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


class ProdutoResumo(BaseModel):
    id: int
    nome: str

    model_config = ConfigDict(from_attributes=True)


class FornecedorResumo(BaseModel):
    id: int
    nome: str

    model_config = ConfigDict(from_attributes=True)


class UsuarioResumo(BaseModel):
    id: int
    nome: str

    model_config = ConfigDict(from_attributes=True)


class EntradaEstoqueResponse(EntradaEstoqueBase):
    id: int

    data_entrada: datetime

    criado_em: datetime

    produto: ProdutoResumo | None = None

    fornecedor: FornecedorResumo | None = None

    usuario: UsuarioResumo | None = None

    model_config = ConfigDict(
        from_attributes=True
    )