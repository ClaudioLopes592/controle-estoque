from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.entrada_estoque import (
    EntradaEstoqueCreate,
    EntradaEstoqueUpdate,
    EntradaEstoqueResponse,
)

from app.services.entrada_estoque_service import EntradaEstoqueService

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
    return EntradaEstoqueService.listar(db)


@router.get(
    "/{entrada_id}",
    response_model=EntradaEstoqueResponse,
)
def buscar(
    entrada_id: int,
    db: Session = Depends(get_db),
):
    try:
        return EntradaEstoqueService.buscar_por_id(
            db,
            entrada_id,
        )

    except ValueError as erro:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(erro),
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
    return EntradaEstoqueService.criar(
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
    return EntradaEstoqueService.atualizar(
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
    EntradaEstoqueService.excluir(
        db,
        entrada_id,
    )

    return Response(status_code=204)
