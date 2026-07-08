from pydantic import BaseModel


class LoginRequest(BaseModel):
    usuario: str
    senha: str


class UsuarioLogado(BaseModel):
    id: int
    nome: str
    usuario: str
    email: str
    perfil: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    usuario: UsuarioLogado