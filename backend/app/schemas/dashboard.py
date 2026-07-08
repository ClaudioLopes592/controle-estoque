from decimal import Decimal

from pydantic import BaseModel

from app.schemas.movimentacao_estoque import (
    MovimentacaoEstoqueResponse,
)


class DashboardResponse(BaseModel):
    total_produtos: int
    total_categorias: int
    total_clientes: int
    total_fornecedores: int

    produtos_estoque_baixo: int

    valor_total_estoque: Decimal

    ultimas_movimentacoes: list[MovimentacaoEstoqueResponse]

    model_config = {"from_attributes": True}
