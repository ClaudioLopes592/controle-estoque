from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

# from app.database.connection import get_db
from app.database.session import get_db

from app.schemas.dashboard import DashboardResponse

from app.services.dashboard_service import DashboardService

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "/",
    response_model=DashboardResponse,
)
def dashboard(
    db: Session = Depends(get_db),
):
    return DashboardService.obter_resumo(db)
