from sqlalchemy.orm import Session

from app.models.categoria import Categoria
from app.schemas.categoria import CategoriaCreate, CategoriaUpdate


class CategoriaService:

    @staticmethod
    def listar(db: Session):
        return db.query(Categoria).order_by(Categoria.nome).all()

    @staticmethod
    def buscar_por_id(db: Session, categoria_id: int):
        return db.query(Categoria).filter(
            Categoria.id == categoria_id
        ).first()

    @staticmethod
    def criar(db: Session, dados: CategoriaCreate):

        categoria_existente = db.query(Categoria).filter(
            Categoria.nome == dados.nome
        ).first()

        if categoria_existente:
            raise ValueError("Já existe uma categoria com esse nome.")

        categoria = Categoria(**dados.model_dump())

        db.add(categoria)
        db.commit()
        db.refresh(categoria)

        return categoria

    @staticmethod
    def atualizar(
        db: Session,
        categoria_id: int,
        dados: CategoriaUpdate
    ):

        categoria = CategoriaService.buscar_por_id(
            db,
            categoria_id
        )

        if not categoria:
            return None

        categoria_existente = db.query(Categoria).filter(
            Categoria.nome == dados.nome,
            Categoria.id != categoria_id
        ).first()

        if categoria_existente:
            raise ValueError("Já existe uma categoria com esse nome.")

        for campo, valor in dados.model_dump().items():
            setattr(categoria, campo, valor)

        db.commit()
        db.refresh(categoria)

        return categoria

    @staticmethod
    def excluir(db: Session, categoria_id: int):

        categoria = CategoriaService.buscar_por_id(
            db,
            categoria_id
        )

        if not categoria:
            return False

        db.delete(categoria)
        db.commit()

        return True