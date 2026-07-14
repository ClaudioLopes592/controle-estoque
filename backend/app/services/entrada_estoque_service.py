from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.entrada_estoque import EntradaEstoque
from app.models.movimentacao_estoque import MovimentacaoEstoque
from app.models.produto import Produto
from app.schemas.entrada_estoque import (
    EntradaEstoqueCreate,
    EntradaEstoqueUpdate,
)


def listar_entradas(db: Session):
    return db.query(EntradaEstoque).order_by(EntradaEstoque.data_entrada.desc()).all()


def buscar_entrada(
    db: Session,
    entrada_id: int,
):
    entrada = db.query(EntradaEstoque).filter(EntradaEstoque.id == entrada_id).first()

    if not entrada:
        raise HTTPException(
            status_code=404,
            detail="Entrada de estoque não encontrada.",
        )

    return entrada


def criar_entrada(
    db: Session,
    dados: EntradaEstoqueCreate,
):
    produto = db.query(Produto).filter(Produto.id == dados.produto_id).first()

    if not produto:
        raise HTTPException(
            status_code=404,
            detail="Produto não encontrado.",
        )

    entrada = EntradaEstoque(**dados.model_dump())

    db.add(entrada)

    # Atualiza estoque
    produto.estoque_atual += dados.quantidade

    # Atualiza o último custo de compra
    produto.preco_compra = dados.custo_unitario

    # Cria movimentação de estoque
    movimentacao = MovimentacaoEstoque(
        produto_id=dados.produto_id,
        tipo="E",
        origem=dados.origem,
        quantidade=dados.quantidade,
        preco_unitario=dados.custo_unitario,
        observacao=dados.observacao,
    )
    db.add(movimentacao)

    db.commit()

    db.refresh(entrada)

    return entrada


def atualizar_entrada(
    db: Session,
    entrada_id: int,
    dados: EntradaEstoqueUpdate,
):
    entrada = buscar_entrada(
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

    # Ajusta o estoque caso a quantidade seja alterada
    if "quantidade" in dados_atualizados:

        quantidade_antiga = entrada.quantidade
        quantidade_nova = dados_atualizados["quantidade"]

        diferenca = quantidade_nova - quantidade_antiga

        produto.estoque_atual += diferenca

    # Atualiza o preço de compra caso informado
    if "custo_unitario" in dados_atualizados:
        produto.preco_compra = dados_atualizados["custo_unitario"]

    # Atualiza os demais campos
    for campo, valor in dados_atualizados.items():
        setattr(
            entrada,
            campo,
            valor,
        )

    db.commit()

    db.refresh(entrada)

    return entrada


def excluir_entrada(
    db: Session,
    entrada_id: int,
):
    entrada = buscar_entrada(
        db,
        entrada_id,
    )

    produto = db.query(Produto).filter(Produto.id == entrada.produto_id).first()

    if produto:
        produto.estoque_atual -= entrada.quantidade

    db.delete(entrada)

    db.commit()
