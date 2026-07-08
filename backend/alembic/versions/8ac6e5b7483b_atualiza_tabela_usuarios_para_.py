"""atualiza tabela usuarios para autenticacao

Revision ID: 8ac6e5b7483b
Revises: b1f9b9e2c3fd
Create Date: 2026-07-04 16:47:26.168918
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "8ac6e5b7483b"
down_revision: Union[str, Sequence[str], None] = "b1f9b9e2c3fd"
branch_labels = None
depends_on = None


def upgrade():

    op.drop_column("usuarios", "senha")

    op.add_column(
        "usuarios",
        sa.Column("usuario", sa.String(length=30), nullable=True),
    )

    op.add_column(
        "usuarios",
        sa.Column("senha_hash", sa.String(length=255), nullable=True),
    )

    op.add_column(
        "usuarios",
        sa.Column(
            "perfil",
            sa.String(length=20),
            nullable=True,
        ),
    )

    op.add_column(
        "usuarios",
        sa.Column(
            "ativo",
            sa.Boolean(),
            server_default=sa.true(),
            nullable=False,
        ),
    )

    op.add_column(
        "usuarios",
        sa.Column(
            "ultimo_login",
            sa.DateTime(),
            nullable=True,
        ),
    )

    op.add_column(
        "usuarios",
        sa.Column(
            "criado_em",
            sa.DateTime(),
            server_default=sa.func.now(),
            nullable=False,
        ),
    )

    op.add_column(
        "usuarios",
        sa.Column(
            "atualizado_em",
            sa.DateTime(),
            server_default=sa.func.now(),
            nullable=False,
        ),
    )

    connection = op.get_bind()

    usuarios = connection.execute(sa.text("SELECT id, email FROM usuarios")).fetchall()

    logins_utilizados = set()

    for usuario in usuarios:

        if usuario.email:
            base_login = usuario.email.split("@")[0].lower()
        else:
            base_login = f"usuario{usuario.id}"

        login = base_login
        contador = 1

        while login in logins_utilizados:
            login = f"{base_login}{contador}"
            contador += 1

        logins_utilizados.add(login)

        connection.execute(
            sa.text("""
                UPDATE usuarios
                   SET usuario = :usuario,
                       perfil = 'ADMIN',
                       senha_hash = 'TEMPORARIO'
                 WHERE id = :id
                """),
            {
                "usuario": login,
                "id": usuario.id,
            },
        )

    op.alter_column(
        "usuarios",
        "usuario",
        nullable=False,
    )

    op.alter_column(
        "usuarios",
        "senha_hash",
        nullable=False,
    )

    op.alter_column(
        "usuarios",
        "perfil",
        nullable=False,
    )

    op.create_index(
        "ix_usuarios_usuario",
        "usuarios",
        ["usuario"],
        unique=True,
    )


def downgrade():

    op.add_column( "usuarios", sa.Column("senha", sa.String(length=255), nullable=False), )

    op.drop_index("ix_usuarios_usuario", table_name="usuarios")

    op.drop_column("usuarios", "atualizado_em")

    op.drop_column("usuarios", "criado_em")

    op.drop_column("usuarios", "ultimo_login")

    op.drop_column("usuarios", "ativo")

    op.drop_column("usuarios", "perfil")

    op.drop_column("usuarios", "senha_hash")

    op.drop_column("usuarios", "usuario")

    op.drop_column("usuarios", "senha")

    op.execute("DROP TYPE IF EXISTS perfilusuario")
