from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.cliente import (
    ClienteCreate,
    ClienteUpdate,
    ClienteResponse
)

from app.services.cliente_service import ClienteService

router = APIRouter(
    prefix="/clientes",
    tags=["Clientes"]
)


@router.get(
    "/",
    response_model=list[ClienteResponse]
)
def listar_clientes(db: Session = Depends(get_db)):
    return ClienteService.listar(db)


@router.get(
    "/{cliente_id}",
    response_model=ClienteResponse
)
def buscar_cliente(
    cliente_id: int,
    db: Session = Depends(get_db)
):

    cliente = ClienteService.buscar_por_id(
        db,
        cliente_id
    )

    if not cliente:
        raise HTTPException(
            status_code=404,
            detail="Cliente não encontrado."
        )

    return cliente


@router.post(
    "/",
    response_model=ClienteResponse,
    status_code=201
)
def criar_cliente(
    dados: ClienteCreate,
    db: Session = Depends(get_db)
):

    try:

        return ClienteService.criar(
            db,
            dados
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.put(
    "/{cliente_id}",
    response_model=ClienteResponse
)
def atualizar_cliente(
    cliente_id: int,
    dados: ClienteUpdate,
    db: Session = Depends(get_db)
):

    try:

        cliente = ClienteService.atualizar(
            db,
            cliente_id,
            dados
        )

        if not cliente:

            raise HTTPException(
                status_code=404,
                detail="Cliente não encontrado."
            )

        return cliente

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.delete(
    "/{cliente_id}"
)
def excluir_cliente(
    cliente_id: int,
    db: Session = Depends(get_db)
):

    sucesso = ClienteService.excluir(
        db,
        cliente_id
    )

    if not sucesso:

        raise HTTPException(
            status_code=404,
            detail="Cliente não encontrado."
        )

    return {

        "message": "Cliente excluído com sucesso."

    }