from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.usuarios import router as usuario_router
from app.api.categorias import router as categorias_router
from app.api.fornecedores import router as fornecedores_router
from app.api.clientes import router as clientes_router
from app.api.unidades import router as unidades_router
from app.api.produtos import router as produtos_router
from app.api.movimentacao_estoque import (router as movimentacao_router,)
from app.api.dashboard import (router as dashboard_router,)
from app.api.auth import router as auth_router
from app.api.entradas_estoque import (router as entrada_router,)
from app.api.saidas_estoque import (router as saidas_router,)

app = FastAPI(title="Controle de Estoque", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usuario_router)
app.include_router(categorias_router)
app.include_router(fornecedores_router)
app.include_router(clientes_router)
app.include_router(unidades_router)
app.include_router(produtos_router)
app.include_router(movimentacao_router)
app.include_router(dashboard_router)
app.include_router(auth_router)
app.include_router(entrada_router)
app.include_router(saidas_router)