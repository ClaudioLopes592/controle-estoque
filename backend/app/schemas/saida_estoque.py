from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict

from app.schemas.produto import ProdutoResponse
from app.schemas.cliente import ClienteResponse
from app.schemas.usuario import UsuarioResponse


class SaidaEstoqueBase(BaseModel):
    produto_id: int
    usuario_id: int
    cliente_id: int | None = None
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
    cliente_id: int | None = None
    origem: str | None = None
    numero_documento: str | None = None
    quantidade: Decimal | None = None
    preco_unitario: Decimal | None = None
    valor_total: Decimal | None = None
    observacao: str | None = None

class ProdutoResumo(BaseModel):
    id: int
    nome: str

    model_config = ConfigDict(from_attributes=True)


class ClienteResumo(BaseModel):
    id: int
    nome: str

    model_config = ConfigDict(from_attributes=True)


class UsuarioResumo(BaseModel):
    id: int
    nome: str

    model_config = ConfigDict(from_attributes=True)


class SaidaEstoqueResponse(SaidaEstoqueBase):
    id: int
    data_saida: datetime
    criado_em: datetime

    produto: ProdutoResumo | None = None
    cliente: ClienteResumo | None = None
    usuario: UsuarioResumo | None = None

    model_config = ConfigDict(from_attributes=True)