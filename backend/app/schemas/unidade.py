from pydantic import BaseModel, ConfigDict


class UnidadeBase(BaseModel):

    nome: str
    sigla: str


class UnidadeCreate(UnidadeBase):
    pass


class UnidadeUpdate(UnidadeBase):
    pass


class UnidadeResponse(UnidadeBase):

    id: int

    model_config = ConfigDict(from_attributes=True)
