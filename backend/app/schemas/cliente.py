from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr


class ClienteBase(BaseModel):

    nome: str
    cpf_cnpj: Optional[str] = None
    telefone: Optional[str] = None
    email: Optional[EmailStr] = None
    endereco: Optional[str] = None


class ClienteCreate(ClienteBase):
    pass


class ClienteUpdate(ClienteBase):
    pass


class ClienteResponse(ClienteBase):

    id: int

    model_config = ConfigDict(
        from_attributes=True
    )