from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, ConfigDict


class ProdutoBase(BaseModel):

    codigo: str
    nome: str

    categoria_id: int
    fornecedor_id: int
    unidade_id: int

    preco_compra: Decimal = Decimal("0.00")
    preco_venda: Decimal = Decimal("0.00")

    estoque_atual: Decimal = Decimal("0.00")
    estoque_minimo: Decimal = Decimal("0.00")

    descricao: Optional[str] = None


class ProdutoCreate(ProdutoBase):
    pass


class ProdutoUpdate(ProdutoBase):
    pass


class CategoriaResumo(BaseModel):

    id: int
    nome: str

    model_config = ConfigDict(
        from_attributes=True
    )


class FornecedorResumo(BaseModel):

    id: int
    nome: str

    model_config = ConfigDict(
        from_attributes=True
    )


class UnidadeResumo(BaseModel):

    id: int
    nome: str
    sigla: str

    model_config = ConfigDict(
        from_attributes=True
    )


class ProdutoResponse(ProdutoBase):

    id: int

    categoria: CategoriaResumo
    fornecedor: FornecedorResumo
    unidade: UnidadeResumo

    model_config = ConfigDict(
        from_attributes=True
    )
