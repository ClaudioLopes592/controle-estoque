from datetime import datetime
from enum import Enum

from pydantic import BaseModel, ConfigDict, EmailStr


class PerfilUsuario(str, Enum):
    ADMIN = "ADMIN"
    GERENTE = "GERENTE"
    OPERADOR = "OPERADOR"


class UsuarioBase(BaseModel):
    nome: str
    usuario: str
    email: EmailStr
    perfil: PerfilUsuario = PerfilUsuario.OPERADOR
    ativo: bool = True


class UsuarioCreate(UsuarioBase):
    senha: str


class UsuarioUpdate(BaseModel):
    nome: str
    usuario: str
    email: EmailStr
    perfil: PerfilUsuario
    ativo: bool
    senha: str | None = None


class UsuarioResponse(UsuarioBase):
    id: int
    ultimo_login: datetime | None = None
    criado_em: datetime
    atualizado_em: datetime

    model_config = ConfigDict(from_attributes=True)
