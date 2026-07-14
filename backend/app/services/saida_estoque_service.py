from sqlalchemy.orm import Session

from app.models.produto import Produto
from app.models.saida_estoque import SaidaEstoque
from app.models.movimentacao_estoque import MovimentacaoEstoque
from app.schemas.saida_estoque import (
    SaidaEstoqueCreate,
    SaidaEstoqueUpdate,
)


class SaidaEstoqueService:

    @staticmethod
    def listar(db: Session):
        return db.query(SaidaEstoque).order_by(SaidaEstoque.data_saida.desc()).all()

    @staticmethod
    def buscar_por_id(db: Session, saida_id: int):
        saida = db.query(SaidaEstoque).filter(SaidaEstoque.id == saida_id).first()

        if not saida:
            raise ValueError("Saída não encontrada.")

        return saida

    @staticmethod
    def criar(db: Session, dados: SaidaEstoqueCreate):

        produto = (
            db.query(Produto)
            .filter(Produto.id == dados.produto_id)
            .first()
        )

        if not produto:
            raise ValueError("Produto não encontrado.")

        estoque_atual = float(produto.estoque_atual)

        if estoque_atual < float(dados.quantidade):
            raise ValueError("Estoque insuficiente para realizar a saída.")

        # Atualiza estoque
        produto.estoque_atual = estoque_atual - float(dados.quantidade)

        # Registra a saída
        saida = SaidaEstoque(**dados.model_dump())

        db.add(saida)

        # Registra automaticamente a movimentação
        movimentacao = MovimentacaoEstoque(
            produto_id=dados.produto_id,
            tipo="S",
            origem=dados.origem,
            quantidade=dados.quantidade,
            preco_unitario=dados.preco_unitario,
            observacao=dados.observacao,
        )

        db.add(movimentacao)

        db.commit()

        db.refresh(saida)

        return saida

    @staticmethod
    def atualizar(
        db: Session,
        saida_id: int,
        dados: SaidaEstoqueUpdate,
    ):

        saida = SaidaEstoqueService.buscar_por_id(
            db,
            saida_id,
        )

        for campo, valor in dados.model_dump(exclude_unset=True).items():
            setattr(saida, campo, valor)

        db.commit()

        db.refresh(saida)

        return saida

    @staticmethod
    def excluir(db: Session, saida_id: int):

        saida = SaidaEstoqueService.buscar_por_id(
            db,
            saida_id,
        )

        produto = db.query(Produto).filter(Produto.id == saida.produto_id).first()

        produto.estoque_atual = float(produto.estoque_atual) + float(saida.quantidade)

        db.delete(saida)

        db.commit()
