from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr


class FornecedorBase(BaseModel):

    nome: str
    cpf_cnpj: Optional[str] = None
    telefone: Optional[str] = None
    email: Optional[EmailStr] = None
    contato: Optional[str] = None
    endereco: Optional[str] = None


class FornecedorCreate(FornecedorBase):
    pass


class FornecedorUpdate(FornecedorBase):
    pass


class FornecedorResponse(FornecedorBase):

    id: int

    model_config = ConfigDict(from_attributes=True)