from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.entrada_estoque import (
    EntradaEstoqueCreate,
    EntradaEstoqueUpdate,
    EntradaEstoqueResponse,
)

from app.services.entrada_estoque_service import (
    listar_entradas,
    buscar_entrada,
    criar_entrada,
    atualizar_entrada,
    excluir_entrada,
)

router = APIRouter(
    prefix="/entradas",
    tags=["Entradas de Estoque"],
)


@router.get(
    "",
    response_model=list[EntradaEstoqueResponse],
)
def listar(
    db: Session = Depends(get_db),
):
    return listar_entradas(db)


@router.get(
    "/{entrada_id}",
    response_model=EntradaEstoqueResponse,
)
def buscar(
    entrada_id: int,
    db: Session = Depends(get_db),
):
    return buscar_entrada(
        db,
        entrada_id,
    )


@router.post(
    "",
    response_model=EntradaEstoqueResponse,
    status_code=201,
)
def criar(
    dados: EntradaEstoqueCreate,
    db: Session = Depends(get_db),
):
    return criar_entrada(
        db,
        dados,
    )


@router.put(
    "/{entrada_id}",
    response_model=EntradaEstoqueResponse,
)
def atualizar(
    entrada_id: int,
    dados: EntradaEstoqueUpdate,
    db: Session = Depends(get_db),
):
    return atualizar_entrada(
        db,
        entrada_id,
        dados,
    )


@router.delete(
    "/{entrada_id}",
    status_code=204,
)
def excluir(
    entrada_id: int,
    db: Session = Depends(get_db),
):
    excluir_entrada(
        db,
        entrada_id,
    )

    return Response(status_code=204)
