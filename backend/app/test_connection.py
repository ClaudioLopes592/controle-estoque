from sqlalchemy import text

from app.database.connection import engine

try:
    with engine.connect() as conn:
        resultado = conn.execute(text("SELECT version();"))
        print(resultado.scalar())

    print("Conexão realizada com sucesso!")

except Exception as erro:
    print("Erro:")
    print(erro)