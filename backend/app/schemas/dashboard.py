from datetime import datetime

from pydantic import BaseModel


class UltimaMovimentacaoSchema(BaseModel):
    id: int
    produto: str
    tipo: str
    quantidade: float
    data_movimento: datetime

    model_config = {
        "from_attributes": True
    }


class ProdutoEstoqueBaixoSchema(BaseModel):
    id: int
    nome: str
    estoque_atual: float
    estoque_minimo: float
    unidade: str

    model_config = {
        "from_attributes": True
    }


class DashboardSchema(BaseModel):
    total_produtos: int
    total_categorias: int
    total_clientes: int
    total_fornecedores: int

    estoque_total: float
    valor_total_estoque: float

    produtos_estoque_baixo: int

    # NOVO CAMPO
    lista_produtos_estoque_baixo: list[ProdutoEstoqueBaixoSchema]

    entradas_hoje: int
    saidas_hoje: int

    ultimas_movimentacoes: list[UltimaMovimentacaoSchema]

    model_config = {
        "from_attributes": True
    }