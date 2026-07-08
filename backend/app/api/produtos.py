from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.produto import ProdutoCreate, ProdutoUpdate, ProdutoResponse

from app.services.produto_service import ProdutoService

router = APIRouter(prefix="/produtos", tags=["Produtos"])


@router.get("/", response_model=list[ProdutoResponse])
def listar_produtos(db: Session = Depends(get_db)):

    return ProdutoService.listar(db)


@router.get("/{produto_id}", response_model=ProdutoResponse)
def buscar_produto(produto_id: int, db: Session = Depends(get_db)):

    produto = ProdutoService.buscar_por_id(db, produto_id)

    if not produto:

        raise HTTPException(status_code=404, detail="Produto não encontrado.")

    return produto


@router.post("/", response_model=ProdutoResponse, status_code=201)
def criar_produto(dados: ProdutoCreate, db: Session = Depends(get_db)):

    try:

        return ProdutoService.criar(db, dados)

    except ValueError as e:

        raise HTTPException(status_code=400, detail=str(e))


@router.put("/{produto_id}", response_model=ProdutoResponse)
def atualizar_produto(
    produto_id: int, dados: ProdutoUpdate, db: Session = Depends(get_db)
):

    try:

        produto = ProdutoService.atualizar(db, produto_id, dados)

        if not produto:

            raise HTTPException(status_code=404, detail="Produto não encontrado.")

        return produto

    except ValueError as e:

        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{produto_id}")
def excluir_produto(produto_id: int, db: Session = Depends(get_db)):

    sucesso = ProdutoService.excluir(db, produto_id)

    if not sucesso:

        raise HTTPException(status_code=404, detail="Produto não encontrado.")

    return {"message": "Produto excluído com sucesso."}
