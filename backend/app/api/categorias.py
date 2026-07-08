from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.categoria import CategoriaCreate, CategoriaUpdate, CategoriaResponse

from app.services.categoria_service import CategoriaService

router = APIRouter(prefix="/categorias", tags=["Categorias"])


@router.get("/", response_model=list[CategoriaResponse])
def listar_categorias(db: Session = Depends(get_db)):
    return CategoriaService.listar(db)


@router.get("/{categoria_id}", response_model=CategoriaResponse)
def buscar_categoria(categoria_id: int, db: Session = Depends(get_db)):

    categoria = CategoriaService.buscar_por_id(db, categoria_id)

    if not categoria:
        raise HTTPException(status_code=404, detail="Categoria não encontrada.")

    return categoria


@router.post("/", response_model=CategoriaResponse, status_code=201)
def criar_categoria(
    dados: CategoriaCreate,
    db: Session = Depends(get_db)
):
    try:
        return CategoriaService.criar(db, dados)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.put("/{categoria_id}", response_model=CategoriaResponse)
def atualizar_categoria(
    categoria_id: int,
    dados: CategoriaUpdate,
    db: Session = Depends(get_db)
):
    try:
        categoria = CategoriaService.atualizar(
            db,
            categoria_id,
            dados
        )

        if not categoria:
            raise HTTPException(
                status_code=404,
                detail="Categoria não encontrada."
            )

        return categoria

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

@router.delete("/{categoria_id}")
def excluir_categoria(categoria_id: int, db: Session = Depends(get_db)):

    sucesso = CategoriaService.excluir(db, categoria_id)

    if not sucesso:
        raise HTTPException(status_code=404, detail="Categoria não encontrada.")

    return {"message": "Categoria excluída com sucesso."}
