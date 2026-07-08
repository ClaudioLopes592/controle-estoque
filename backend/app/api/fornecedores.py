from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.fornecedor import (
    FornecedorCreate,
    FornecedorUpdate,
    FornecedorResponse
)

from app.services.fornecedor_service import FornecedorService

router = APIRouter(
    prefix="/fornecedores",
    tags=["Fornecedores"]
)


@router.get(
    "/",
    response_model=list[FornecedorResponse]
)
def listar_fornecedores(db: Session = Depends(get_db)):
    return FornecedorService.listar(db)


@router.get(
    "/{fornecedor_id}",
    response_model=FornecedorResponse
)
def buscar_fornecedor(
    fornecedor_id: int,
    db: Session = Depends(get_db)
):

    fornecedor = FornecedorService.buscar_por_id(
        db,
        fornecedor_id
    )

    if not fornecedor:
        raise HTTPException(
            status_code=404,
            detail="Fornecedor não encontrado."
        )

    return fornecedor


@router.post(
    "/",
    response_model=FornecedorResponse,
    status_code=201
)
def criar_fornecedor(
    dados: FornecedorCreate,
    db: Session = Depends(get_db)
):

    try:

        return FornecedorService.criar(
            db,
            dados
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.put(
    "/{fornecedor_id}",
    response_model=FornecedorResponse
)
def atualizar_fornecedor(
    fornecedor_id: int,
    dados: FornecedorUpdate,
    db: Session = Depends(get_db)
):

    try:

        fornecedor = FornecedorService.atualizar(
            db,
            fornecedor_id,
            dados
        )

        if not fornecedor:

            raise HTTPException(
                status_code=404,
                detail="Fornecedor não encontrado."
            )

        return fornecedor

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.delete(
    "/{fornecedor_id}"
)
def excluir_fornecedor(
    fornecedor_id: int,
    db: Session = Depends(get_db)
):

    sucesso = FornecedorService.excluir(
        db,
        fornecedor_id
    )

    if not sucesso:

        raise HTTPException(
            status_code=404,
            detail="Fornecedor não encontrado."
        )

    return {

        "message": "Fornecedor excluído com sucesso."

    }