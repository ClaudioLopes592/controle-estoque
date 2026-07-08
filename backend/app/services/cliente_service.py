from sqlalchemy.orm import Session

from app.models.cliente import Cliente
from app.schemas.cliente import (
    ClienteCreate,
    ClienteUpdate
)


class ClienteService:

    @staticmethod
    def listar(db: Session):
        return db.query(Cliente).order_by(
            Cliente.nome
        ).all()

    @staticmethod
    def buscar_por_id(
        db: Session,
        cliente_id: int
    ):

        return db.query(Cliente).filter(
            Cliente.id == cliente_id
        ).first()

    @staticmethod
    def criar(
        db: Session,
        dados: ClienteCreate
    ):

        cliente_existente = db.query(
            Cliente
        ).filter(
            Cliente.nome == dados.nome
        ).first()

        if cliente_existente:
            raise ValueError(
                "Já existe um cliente com esse nome."
            )

        cliente = Cliente(
            **dados.model_dump()
        )

        db.add(cliente)

        db.commit()

        db.refresh(cliente)

        return cliente

    @staticmethod
    def atualizar(
        db: Session,
        cliente_id: int,
        dados: ClienteUpdate
    ):

        cliente = ClienteService.buscar_por_id(
            db,
            cliente_id
        )

        if not cliente:
            return None

        cliente_existente = db.query(
            Cliente
        ).filter(
            Cliente.nome == dados.nome,
            Cliente.id != cliente_id
        ).first()

        if cliente_existente:
            raise ValueError(
                "Já existe um cliente com esse nome."
            )

        for campo, valor in dados.model_dump().items():

            setattr(
                cliente,
                campo,
                valor
            )

        db.commit()

        db.refresh(cliente)

        return cliente

    @staticmethod
    def excluir(
        db: Session,
        cliente_id: int
    ):

        cliente = ClienteService.buscar_por_id(
            db,
            cliente_id
        )

        if not cliente:
            return False

        db.delete(cliente)

        db.commit()

        return True