from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.usuario import (
    UsuarioCreate,
    UsuarioUpdate,
    UsuarioResponse,
)

from app.services.usuario_service import (
    criar_usuario,
    listar_usuarios,
    buscar_usuario,
    atualizar_usuario,
    excluir_usuario,
)

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuários"],
)


@router.post(
    "",
    response_model=UsuarioResponse,
)
def criar(
    usuario: UsuarioCreate,
    db: Session = Depends(get_db),
):
    return criar_usuario(db, usuario)


@router.get(
    "",
    response_model=list[UsuarioResponse],
)
def listar(
    db: Session = Depends(get_db),
):
    return listar_usuarios(db)


@router.get(
    "/{usuario_id}",
    response_model=UsuarioResponse,
)
def buscar(
    usuario_id: int,
    db: Session = Depends(get_db),
):
    return buscar_usuario(db, usuario_id)


@router.put(
    "/{usuario_id}",
    response_model=UsuarioResponse,
)
def atualizar(
    usuario_id: int,
    dados: UsuarioUpdate,
    db: Session = Depends(get_db),
):
    return atualizar_usuario(
        db,
        usuario_id,
        dados,
    )


@router.delete(
    "/{usuario_id}",
    status_code=204,
)
def excluir(
    usuario_id: int,
    db: Session = Depends(get_db),
):
    excluir_usuario(db, usuario_id)

    return Response(status_code=204)
