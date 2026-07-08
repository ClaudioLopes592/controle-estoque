from datetime import datetime, timedelta, timezone

import jwt

SECRET_KEY = "troque_esta_chave_por_uma_bem_grande"
ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 480


def criar_token(data: dict) -> str:
    dados = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    dados.update({"exp": expire})

    return jwt.encode(
        dados,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


def validar_token(token: str):
    return jwt.decode(
        token,
        SECRET_KEY,
        algorithms=[ALGORITHM],
    )