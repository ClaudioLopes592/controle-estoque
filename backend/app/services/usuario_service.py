from pwdlib import PasswordHash

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.usuario import Usuario
from app.schemas.usuario import UsuarioCreate, UsuarioUpdate

password_hash = PasswordHash.recommended()


def criar_usuario(db: Session, dados: UsuarioCreate):

    if db.query(Usuario).filter(Usuario.usuario == dados.usuario).first():

        raise HTTPException(
            status_code=400,
            detail="Usuário já cadastrado.",
        )

    if db.query(Usuario).filter(Usuario.email == dados.email).first():

        raise HTTPException(
            status_code=400,
            detail="E-mail já cadastrado.",
        )

    usuario = Usuario(
        nome=dados.nome,
        usuario=dados.usuario,
        email=dados.email,
        senha_hash=password_hash.hash(dados.senha),
        perfil=dados.perfil,
        ativo=dados.ativo,
    )

    db.add(usuario)

    db.commit()

    db.refresh(usuario)

    return usuario


def listar_usuarios(db: Session):

    return db.query(Usuario).order_by(Usuario.nome).all()


def buscar_usuario(db: Session, usuario_id: int):

    usuario = db.get(Usuario, usuario_id)

    if usuario is None:

        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado.",
        )

    return usuario


def atualizar_usuario(
    db: Session,
    usuario_id: int,
    dados: UsuarioUpdate,
):

    usuario = buscar_usuario(db, usuario_id)

    existe = (
        db.query(Usuario)
        .filter(
            Usuario.usuario == dados.usuario,
            Usuario.id != usuario_id,
        )
        .first()
    )

    if existe:

        raise HTTPException(
            status_code=400,
            detail="Usuário já utilizado.",
        )

    existe = (
        db.query(Usuario)
        .filter(
            Usuario.email == dados.email,
            Usuario.id != usuario_id,
        )
        .first()
    )

    if existe:

        raise HTTPException(
            status_code=400,
            detail="E-mail já utilizado.",
        )

    usuario.nome = dados.nome
    usuario.usuario = dados.usuario
    usuario.email = dados.email
    usuario.perfil = dados.perfil
    usuario.ativo = dados.ativo

    if dados.senha:

        usuario.senha_hash = password_hash.hash(dados.senha)

    db.commit()

    db.refresh(usuario)

    return usuario


def excluir_usuario(
    db: Session,
    usuario_id: int,
):

    usuario = buscar_usuario(db, usuario_id)

    db.delete(usuario)

    db.commit()
