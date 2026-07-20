from sqlalchemy.orm import Session, joinedload

from app.models.movimentacao_estoque import MovimentacaoEstoque, TipoMovimentacao

from app.models.produto import Produto


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