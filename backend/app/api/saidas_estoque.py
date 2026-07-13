from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.saida_estoque import (
    SaidaEstoqueCreate,
    SaidaEstoqueUpdate,
    SaidaEstoqueResponse,
)
from app.services.saida_estoque_service import SaidaEstoqueService

router = APIRouter(
    prefix="/saidas",
    tags=["Saídas de Estoque"],
)


@router.get(
    "/",
    response_model=list[SaidaEstoqueResponse],
)
def listar(db: Session = Depends(get_db)):
    return SaidaEstoqueService.listar(db)


@router.get(
    "/{saida_id}",
    response_model=SaidaEstoqueResponse,
)
def buscar(
    saida_id: int,
    db: Session = Depends(get_db),
):
    try:
        return SaidaEstoqueService.buscar_por_id(
            db,
            saida_id,
        )

    except ValueError as erro:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(erro),
        )


@router.post(
    "/",
    response_model=SaidaEstoqueResponse,
    status_code=status.HTTP_201_CREATED,
)
def criar(
    dados: SaidaEstoqueCreate,
    db: Session = Depends(get_db),
):
    try:
        return SaidaEstoqueService.criar(
            db,
            dados,
        )

    except ValueError as erro:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(erro),
        )


@router.put(
    "/{saida_id}",
    response_model=SaidaEstoqueResponse,
)
def atualizar(
    saida_id: int,
    dados: SaidaEstoqueUpdate,
    db: Session = Depends(get_db),
):
    try:
        return SaidaEstoqueService.atualizar(
            db,
            saida_id,
            dados,
        )

    except ValueError as erro:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(erro),
        )


@router.delete(
    "/{saida_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def excluir(
    saida_id: int,
    db: Session = Depends(get_db),
):
    try:
        SaidaEstoqueService.excluir(
            db,
            saida_id,
        )

    except ValueError as erro:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(erro),
        )
