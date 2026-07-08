from sqlalchemy.orm import Session

from app.models.fornecedor import Fornecedor
from app.schemas.fornecedor import (
    FornecedorCreate,
    FornecedorUpdate
)


class FornecedorService:

    @staticmethod
    def listar(db: Session):
        return db.query(Fornecedor).order_by(
            Fornecedor.nome
        ).all()

    @staticmethod
    def buscar_por_id(
        db: Session,
        fornecedor_id: int
    ):

        return db.query(Fornecedor).filter(
            Fornecedor.id == fornecedor_id
        ).first()

    @staticmethod
    def criar(
        db: Session,
        dados: FornecedorCreate
    ):

        fornecedor_existente = db.query(
            Fornecedor
        ).filter(
            Fornecedor.nome == dados.nome
        ).first()

        if fornecedor_existente:
            raise ValueError(
                "Já existe um fornecedor com esse nome."
            )

        fornecedor = Fornecedor(
            **dados.model_dump()
        )

        db.add(fornecedor)

        db.commit()

        db.refresh(fornecedor)

        return fornecedor

    @staticmethod
    def atualizar(
        db: Session,
        fornecedor_id: int,
        dados: FornecedorUpdate
    ):

        fornecedor = FornecedorService.buscar_por_id(
            db,
            fornecedor_id
        )

        if not fornecedor:
            return None

        fornecedor_existente = db.query(
            Fornecedor
        ).filter(
            Fornecedor.nome == dados.nome,
            Fornecedor.id != fornecedor_id
        ).first()

        if fornecedor_existente:
            raise ValueError(
                "Já existe um fornecedor com esse nome."
            )

        for campo, valor in dados.model_dump().items():

            setattr(
                fornecedor,
                campo,
                valor
            )

        db.commit()

        db.refresh(fornecedor)

        return fornecedor

    @staticmethod
    def excluir(
        db: Session,
        fornecedor_id: int
    ):

        fornecedor = FornecedorService.buscar_por_id(
            db,
            fornecedor_id
        )

        if not fornecedor:
            return False

        db.delete(fornecedor)

        db.commit()

        return True