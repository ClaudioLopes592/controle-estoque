from datetime import datetime

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.auth.jwt import criar_token
from app.auth.security import verify_password
from app.models.usuario import Usuario


class AuthService:

    @staticmethod
    def login(
        db: Session,
        usuario: str,
        senha: str,
    ):

        user = (
            db.query(Usuario)
            .filter(
                Usuario.usuario == usuario,
                Usuario.ativo.is_(True),
            )
            .first()
        )

        if not user:
            raise HTTPException(
                status_code=401,
                detail="Usuário ou senha inválidos.",
            )

        if not verify_password(
            senha,
            user.senha_hash,
        ):
            raise HTTPException(
                status_code=401,
                detail="Usuário ou senha inválidos.",
            )

        user.ultimo_login = datetime.utcnow()

        db.commit()

        token = criar_token(
            {
                "sub": str(user.id),
                "usuario": user.usuario,
                "perfil": user.perfil,
                "nome": user.nome,
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer",
            "usuario": {
                "id": user.id,
                "nome": user.nome,
                "usuario": user.usuario,
                "email": user.email,
                "perfil": user.perfil,
            },
        }