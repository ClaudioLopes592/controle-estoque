from sqlalchemy.orm import Session

from app.models.unidade import Unidade
from app.schemas.unidade import UnidadeCreate, UnidadeUpdate


class UnidadeService:

    @staticmethod
    def listar(db: Session):
        return db.query(Unidade).order_by(Unidade.nome).all()

    @staticmethod
    def buscar_por_id(db: Session, unidade_id: int):
        return db.query(Unidade).filter(Unidade.id == unidade_id).first()

    @staticmethod
    def criar(db: Session, dados: UnidadeCreate):

        existe = db.query(Unidade).filter(Unidade.nome == dados.nome).first()

        if existe:
            raise ValueError("Já existe uma unidade com esse nome.")

        unidade = Unidade(**dados.model_dump())

        db.add(unidade)

        db.commit()

        db.refresh(unidade)

        return unidade

    @staticmethod
    def atualizar(db: Session, unidade_id: int, dados: UnidadeUpdate):

        unidade = UnidadeService.buscar_por_id(db, unidade_id)

        if not unidade:
            return None

        existe = (
            db.query(Unidade)
            .filter(Unidade.nome == dados.nome, Unidade.id != unidade_id)
            .first()
        )

        if existe:
            raise ValueError("Já existe uma unidade com esse nome.")

        for campo, valor in dados.model_dump().items():

            setattr(unidade, campo, valor)

        db.commit()

        db.refresh(unidade)

        return unidade

    @staticmethod
    def excluir(db: Session, unidade_id: int):

        unidade = UnidadeService.buscar_por_id(db, unidade_id)

        if not unidade:
            return False

        db.delete(unidade)

        db.commit()

        return True
