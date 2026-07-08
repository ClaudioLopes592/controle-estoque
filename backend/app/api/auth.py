from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.service import AuthService
from app.database.session import get_db
from app.schemas.auth import LoginRequest, LoginResponse

router = APIRouter(
    prefix="/auth",
    tags=["Autenticação"],
)


@router.post(
    "/login",
    response_model=LoginResponse,
)
def login(
    dados: LoginRequest,
    db: Session = Depends(get_db),
):
    return AuthService.login(
        db=db,
        usuario=dados.usuario,
        senha=dados.senha,
    )