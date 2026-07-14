from datetime import date
from decimal import Decimal

from sqlalchemy import func
from sqlalchemy.orm import Session, joinedload

from app.models.categoria import Categoria
from app.models.cliente import Cliente
from app.models.fornecedor import Fornecedor
from app.models.movimentacao_estoque import MovimentacaoEstoque
from app.models.produto import Produto
from app.models.entrada_estoque import EntradaEstoque
from app.models.saida_estoque import SaidaEstoque


class DashboardService:

    @staticmethod
    def obter_resumo(db: Session):

        hoje = date.today()

        # ===========================
        # Cadastros
        # ===========================

        total_produtos = db.query(func.count(Produto.id)).scalar() or 0

        total_categorias = db.query(func.count(Categoria.id)).scalar() or 0

        total_clientes = db.query(func.count(Cliente.id)).scalar() or 0

        total_fornecedores = db.query(func.count(Fornecedor.id)).scalar() or 0

        # ===========================
        # Estoque
        # ===========================

        estoque_total = (
            db.query(func.coalesce(func.sum(Produto.estoque_atual), 0)).scalar() or 0
        )

        produtos_estoque_baixo = (
            db.query(func.count(Produto.id))
            .filter(Produto.estoque_atual <= Produto.estoque_minimo)
            .scalar()
            or 0
        )

        valor_total_estoque = db.query(
            func.coalesce(
                func.sum(Produto.estoque_atual * Produto.preco_compra),
                Decimal("0.00"),
            )
        ).scalar()

        if valor_total_estoque is None:
            valor_total_estoque = Decimal("0.00")

        # ===========================
        # Entradas do dia
        # ===========================

        entradas_hoje = (
            db.query(func.count(EntradaEstoque.id))
            .filter(func.date(EntradaEstoque.data_entrada) == hoje)
            .scalar()
            or 0
        )

        # ===========================
        # Saídas do dia
        # ===========================

        saidas_hoje = (
            db.query(func.count(SaidaEstoque.id))
            .filter(func.date(SaidaEstoque.data_saida) == hoje)
            .scalar()
            or 0
        )

        # ===========================
        # Últimas movimentações
        # ===========================
        
        ultimas_movimentacoes = (
            db.query(MovimentacaoEstoque)
            .options(joinedload(MovimentacaoEstoque.produto))
            .order_by(MovimentacaoEstoque.data_movimento.desc())
            .limit(10)
            .all()
        )

        ultimas = []

        for mov in ultimas_movimentacoes:
            ultimas.append(
                {
                    "id": mov.id,
                    "produto": mov.produto.nome,
                    "tipo": mov.tipo,
                    "quantidade": float(mov.quantidade),
                    "data_movimento": mov.data_movimento,
                }
            )    

        # ===========================
        # Retorno
        # ===========================

        return {
            "total_produtos": total_produtos,
            "total_categorias": total_categorias,
            "total_clientes": total_clientes,
            "total_fornecedores": total_fornecedores,

            "estoque_total": float(estoque_total),
            "valor_total_estoque": float(valor_total_estoque),
            "produtos_estoque_baixo": produtos_estoque_baixo,

            "entradas_hoje": entradas_hoje,
            "saidas_hoje": saidas_hoje,

            "ultimas_movimentacoes": ultimas,
        }
    
    # ===========================
    # Entradas vs Saídas
    # ===========================

    @staticmethod
    def obter_entradas_vs_saidas(db: Session):

        total_entradas = (
            db.query(func.coalesce(func.sum(EntradaEstoque.quantidade), 0))
            .scalar()
        )

        total_saidas = (
            db.query(func.coalesce(func.sum(SaidaEstoque.quantidade), 0))
            .scalar()
        )

        return {
            "entradas": float(total_entradas),
            "saidas": float(total_saidas),
        }
    
    # ===========================
    # Estoque por Categoria
    # ===========================

    @staticmethod
    def obter_estoque_por_categoria(db: Session):

        dados = (
            db.query(
                Categoria.nome.label("categoria"),
                func.sum(
                    Produto.estoque_atual * Produto.preco_compra
                ).label("valor"),
            )
            .join(
                Produto,
                Produto.categoria_id == Categoria.id,
            )
            .group_by(Categoria.nome)
            .order_by(Categoria.nome)
            .all()
        )

        return [
            {
                "categoria": categoria,
                "valor": float(valor or 0),
            }
            for categoria, valor in dados
        ]