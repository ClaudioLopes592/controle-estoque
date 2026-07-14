from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db

from app.schemas.dashboard import DashboardSchema
from app.services.dashboard_service import DashboardService

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "/",
    response_model=DashboardSchema,
)
def obter_dashboard(
    db: Session = Depends(get_db),
):
    return DashboardService.obter_resumo(db)

@router.get("/entradas-saidas")
def obter_entradas_vs_saidas(
    db: Session = Depends(get_db),
):
    return DashboardService.obter_entradas_vs_saidas(db)

@router.get("/estoque-categorias")
def obter_estoque_por_categoria(
    db: Session = Depends(get_db),
):
    return DashboardService.obter_estoque_por_categoria(db)
