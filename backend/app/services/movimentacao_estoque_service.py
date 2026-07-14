from sqlalchemy.orm import Session, joinedload

from app.models.movimentacao_estoque import MovimentacaoEstoque, TipoMovimentacao

from app.models.produto import Produto

# from app.schemas.movimentacao_estoque import MovimentacaoEstoqueCreate

from decimal import Decimal


class MovimentacaoEstoqueService:

    @staticmethod
    def listar(db: Session):

        return (
            db.query(MovimentacaoEstoque)
            .options(joinedload(MovimentacaoEstoque.produto))
            .order_by(MovimentacaoEstoque.data_movimento.desc())
            .all()
        )

    @staticmethod
    def buscar_por_id(db: Session, movimentacao_id: int):

        return (
            db.query(MovimentacaoEstoque)
            .options(joinedload(MovimentacaoEstoque.produto))
            .filter(MovimentacaoEstoque.id == movimentacao_id)
            .first()
        )

    # @staticmethod
    # def criar(db: Session, dados: MovimentacaoEstoqueCreate):

    #     produto = db.query(Produto).filter(Produto.id == dados.produto_id).first()

    #     if not produto:
    #         raise ValueError("Produto não encontrado.")

    #     quantidade = Decimal(str(dados.quantidade))
    #     preco = Decimal(str(dados.preco_unitario))

    #     if quantidade <= 0:
    #         raise ValueError("A quantidade deve ser maior que zero.")

    #     if dados.tipo == TipoMovimentacao.ENTRADA:

    #         produto.estoque_atual += quantidade

    #     else:

    #         if produto.estoque_atual < quantidade:
    #             raise ValueError("Estoque insuficiente.")

    #         produto.estoque_atual -= quantidade

    #     movimentacao = MovimentacaoEstoque(
    #         produto_id=dados.produto_id,
    #         tipo=dados.tipo,
    #         origem=dados.origem,
    #         quantidade=quantidade,
    #         preco_unitario=preco,
    #         observacao=dados.observacao,
    #     )

    #     try:
    #         db.add(movimentacao)
    #         db.commit()
    #         db.refresh(produto)
    #         db.refresh(movimentacao)
    #         return movimentacao
    #     except Exception as e:
    #         db.rollback()
    #         raise e
