from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload

from app.models.produto import Produto
from app.models.categoria import Categoria
from app.models.fornecedor import Fornecedor
from app.models.unidade import Unidade

from app.schemas.produto import ProdutoCreate, ProdutoUpdate


class ProdutoService:

    @staticmethod
    def listar(db: Session):

        return (
            db.query(Produto)
            .options(
                joinedload(Produto.categoria),
                joinedload(Produto.fornecedor),
                joinedload(Produto.unidade)
            )
            .order_by(Produto.nome)
            .all()
        )
    
    @staticmethod
    def buscar_por_id(
        db: Session,
        produto_id: int
    ):

        return (
            db.query(Produto)
            .options(
                joinedload(Produto.categoria),
                joinedload(Produto.fornecedor),
                joinedload(Produto.unidade)
            )
            .filter(
                Produto.id == produto_id
            )
            .first()
        )

    # @staticmethod
    # def listar(db: Session):

    #     return db.query(Produto).order_by(Produto.nome).all()

    # @staticmethod
    # def buscar_por_id(db: Session, produto_id: int):

    #     return db.query(Produto).filter(Produto.id == produto_id).first()

    @staticmethod
    def criar(db: Session, dados: ProdutoCreate):

        produto_existente = (
            db.query(Produto).filter(Produto.codigo == dados.codigo).first()
        )

        if produto_existente:
            raise ValueError("Já existe um produto com esse código.")

        categoria = (
            db.query(Categoria).filter(Categoria.id == dados.categoria_id).first()
        )

        if not categoria:
            raise ValueError("Categoria não encontrada.")

        fornecedor = (
            db.query(Fornecedor).filter(Fornecedor.id == dados.fornecedor_id).first()
        )

        if not fornecedor:
            raise ValueError("Fornecedor não encontrado.")

        unidade = db.query(Unidade).filter(Unidade.id == dados.unidade_id).first()

        if not unidade:
            raise ValueError("Unidade não encontrada.")

        produto = Produto(**dados.model_dump())

        db.add(produto)

        db.commit()

        db.refresh(produto)

        return produto

    @staticmethod
    def atualizar(db: Session, produto_id: int, dados: ProdutoUpdate):

        produto = ProdutoService.buscar_por_id(db, produto_id)

        if not produto:
            return None

        produto_existente = (
            db.query(Produto)
            .filter(Produto.codigo == dados.codigo, Produto.id != produto_id)
            .first()
        )

        if produto_existente:
            raise ValueError("Já existe um produto com esse código.")

        categoria = (
            db.query(Categoria).filter(Categoria.id == dados.categoria_id).first()
        )

        if not categoria:
            raise ValueError("Categoria não encontrada.")

        fornecedor = (
            db.query(Fornecedor).filter(Fornecedor.id == dados.fornecedor_id).first()
        )

        if not fornecedor:
            raise ValueError("Fornecedor não encontrado.")

        unidade = db.query(Unidade).filter(Unidade.id == dados.unidade_id).first()

        if not unidade:
            raise ValueError("Unidade não encontrada.")

        for campo, valor in dados.model_dump().items():

            setattr(produto, campo, valor)

        db.commit()

        db.refresh(produto)

        return produto

    @staticmethod
    def excluir(db: Session, produto_id: int):

        produto = ProdutoService.buscar_por_id(db, produto_id)

        if not produto:
            return False

        db.delete(produto)

        db.commit()

        return True
