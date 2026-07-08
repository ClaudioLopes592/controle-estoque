from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.unidade import UnidadeCreate, UnidadeUpdate, UnidadeResponse

from app.services.unidade_service import UnidadeService

router = APIRouter(prefix="/unidades", tags=["Unidades"])


@router.get("/", response_model=list[UnidadeResponse])
def listar(db: Session = Depends(get_db)):
    return UnidadeService.listar(db)


@router.get("/{unidade_id}", response_model=UnidadeResponse)
def buscar(unidade_id: int, db: Session = Depends(get_db)):

    unidade = UnidadeService.buscar_por_id(db, unidade_id)

    if not unidade:
        raise HTTPException(status_code=404, detail="Unidade não encontrada.")

    return unidade


@router.post("/", response_model=UnidadeResponse, status_code=201)
def criar(dados: UnidadeCreate, db: Session = Depends(get_db)):

    try:

        return UnidadeService.criar(db, dados)

    except ValueError as e:

        raise HTTPException(status_code=400, detail=str(e))


@router.put("/{unidade_id}", response_model=UnidadeResponse)
def atualizar(unidade_id: int, dados: UnidadeUpdate, db: Session = Depends(get_db)):

    try:

        unidade = UnidadeService.atualizar(db, unidade_id, dados)

        if not unidade:

            raise HTTPException(status_code=404, detail="Unidade não encontrada.")

        return unidade

    except ValueError as e:

        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{unidade_id}")
def excluir(unidade_id: int, db: Session = Depends(get_db)):

    sucesso = UnidadeService.excluir(db, unidade_id)

    if not sucesso:

        raise HTTPException(status_code=404, detail="Unidade não encontrada.")

    return {"message": "Unidade excluída com sucesso."}
