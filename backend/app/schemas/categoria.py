from typing import Optional

from pydantic import BaseModel, ConfigDict


class CategoriaBase(BaseModel):

    nome: str
    descricao: Optional[str] = None


class CategoriaCreate(CategoriaBase):
    pass


class CategoriaUpdate(CategoriaBase):
    pass


class CategoriaResponse(CategoriaBase):

    id: int

    model_config = ConfigDict(from_attributes=True)