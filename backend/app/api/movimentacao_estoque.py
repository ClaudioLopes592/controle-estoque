from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.movimentacao_estoque import (
    MovimentacaoEstoqueResponse,
)

from app.services.movimentacao_estoque_service import (
    MovimentacaoEstoqueService,
)

router = APIRouter(
    prefix="/movimentacoes",
    tags=["Movimentações de Estoque"],
)


@router.get(
    "/",
    response_model=list[MovimentacaoEstoqueResponse],
)
def listar_movimentacoes(db: Session = Depends(get_db)):
    return MovimentacaoEstoqueService.listar(db)


@router.get(
    "/{movimentacao_id}",
    response_model=MovimentacaoEstoqueResponse,
)
def buscar_movimentacao(
    movimentacao_id: int,
    db: Session = Depends(get_db),
):
    movimentacao = MovimentacaoEstoqueService.buscar_por_id(
        db,
        movimentacao_id,
    )

    if not movimentacao:
        raise HTTPException(
            status_code=404,
            detail="Movimentação não encontrada.",
        )

    return movimentacao