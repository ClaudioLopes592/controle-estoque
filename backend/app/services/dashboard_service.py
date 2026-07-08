from decimal import Decimal

from sqlalchemy import func
from sqlalchemy.orm import Session, joinedload

from app.models.categoria import Categoria
from app.models.cliente import Cliente
from app.models.fornecedor import Fornecedor
from app.models.movimentacao_estoque import MovimentacaoEstoque
from app.models.produto import Produto


class DashboardService:

    @staticmethod
    def obter_resumo(db: Session):

        total_produtos = db.query(func.count(Produto.id)).scalar() or 0

        total_categorias = db.query(func.count(Categoria.id)).scalar() or 0

        total_clientes = db.query(func.count(Cliente.id)).scalar() or 0

        total_fornecedores = db.query(func.count(Fornecedor.id)).scalar() or 0

        produtos_estoque_baixo = (
            db.query(func.count(Produto.id))
            .filter(Produto.estoque_atual <= Produto.estoque_minimo)
            .scalar()
            or 0
        )

        valor_total = db.query(
            func.sum(Produto.estoque_atual * Produto.preco_compra)
        ).scalar()

        if valor_total is None:
            valor_total = Decimal("0.00")

        ultimas_movimentacoes = (
            db.query(MovimentacaoEstoque)
            .options(joinedload(MovimentacaoEstoque.produto))
            .order_by(MovimentacaoEstoque.data_movimento.desc())
            .limit(10)
            .all()
        )

        return {
            "total_produtos": total_produtos,
            "total_categorias": total_categorias,
            "total_clientes": total_clientes,
            "total_fornecedores": total_fornecedores,
            "produtos_estoque_baixo": produtos_estoque_baixo,
            "valor_total_estoque": valor_total,
            "ultimas_movimentacoes": ultimas_movimentacoes,
        }
