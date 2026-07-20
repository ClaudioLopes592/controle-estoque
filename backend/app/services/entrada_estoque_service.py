from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload

from app.models.entrada_estoque import EntradaEstoque
from app.models.movimentacao_estoque import MovimentacaoEstoque
from app.models.produto import Produto
from app.schemas.entrada_estoque import (
    EntradaEstoqueCreate,
    EntradaEstoqueUpdate,
)


class EntradaEstoqueService:

    @staticmethod
    def listar(db: Session):
        return (
            db.query(EntradaEstoque)
            .options(
                joinedload(EntradaEstoque.produto),
                joinedload(EntradaEstoque.fornecedor),
                joinedload(EntradaEstoque.usuario),
            )
            .order_by(EntradaEstoque.data_entrada.desc())
            .all()
        )

    @staticmethod
    def buscar_por_id(
        db: Session,
        entrada_id: int,
    ):
        entrada = (
            db.query(EntradaEstoque)
            .options(
                joinedload(EntradaEstoque.produto),
                joinedload(EntradaEstoque.fornecedor),
                joinedload(EntradaEstoque.usuario),
            )
            .filter(EntradaEstoque.id == entrada_id)
            .first()
        )

        if not entrada:
            raise HTTPException(
                status_code=404,
                detail="Entrada de estoque não encontrada.",
            )

        return entrada

    @staticmethod
    def criar(
        db: Session,
        dados: EntradaEstoqueCreate,
    ):
        produto = (
            db.query(Produto)
            .filter(Produto.id == dados.produto_id)
            .first()
        )

        if not produto:
            raise HTTPException(
                status_code=404,
                detail="Produto não encontrado.",
            )

        entrada = EntradaEstoque(**dados.model_dump())

        db.add(entrada)

        produto.estoque_atual += dados.quantidade

        produto.preco_compra = dados.custo_unitario

        db.flush()

        movimentacao = MovimentacaoEstoque(
            entrada_id=entrada.id,
            produto_id=dados.produto_id,
            usuario_id=dados.usuario_id,
            tipo="E",
            origem=dados.origem,
            quantidade=dados.quantidade,
            preco_unitario=dados.custo_unitario,
            observacao=dados.observacao,
        )

        db.add(movimentacao)

        db.commit()

        db.refresh(entrada)

        return (
            db.query(EntradaEstoque)
            .options(
                joinedload(EntradaEstoque.produto),
                joinedload(EntradaEstoque.fornecedor),
                joinedload(EntradaEstoque.usuario),
            )
            .filter(EntradaEstoque.id == entrada.id)
            .first()
        )

    @staticmethod
    def atualizar(
        db: Session,
        entrada_id: int,
        dados: EntradaEstoqueUpdate,
    ):
        entrada = EntradaEstoqueService.buscar_por_id(
            db,
            entrada_id,
        )

        produto = db.query(Produto).filter(Produto.id == entrada.produto_id).first()

        if not produto:
            raise HTTPException(
                status_code=404,
                detail="Produto não encontrado.",
            )

        dados_atualizados = dados.model_dump(exclude_unset=True)

        if "quantidade" in dados_atualizados:

            quantidade_antiga = entrada.quantidade
            quantidade_nova = dados_atualizados["quantidade"]

            diferenca = quantidade_nova - quantidade_antiga

            produto.estoque_atual += diferenca

        if "custo_unitario" in dados_atualizados:
            produto.preco_compra = dados_atualizados["custo_unitario"]

        for campo, valor in dados_atualizados.items():
            setattr(
                entrada,
                campo,
                valor,
            )

        db.commit()

        db.refresh(entrada)

        return (
            db.query(EntradaEstoque)
            .options(
                joinedload(EntradaEstoque.produto),
                joinedload(EntradaEstoque.fornecedor),
                joinedload(EntradaEstoque.usuario),
            )
            .filter(EntradaEstoque.id == entrada.id)
            .first()
        )

    @staticmethod
    def excluir(
        db: Session,
        entrada_id: int,
    ):
        entrada = EntradaEstoqueService.buscar_por_id(
            db,
            entrada_id,
        )

        produto = (
            db.query(Produto)
            .filter(Produto.id == entrada.produto_id)
            .first()
        )

        if produto:
            produto.estoque_atual -= entrada.quantidade

        movimentacao = (
            db.query(MovimentacaoEstoque)
            .filter(
                MovimentacaoEstoque.entrada_id == entrada.id
            )
            .first()
        )

        if movimentacao:
            db.delete(movimentacao)

        db.delete(entrada)

        db.commit()
