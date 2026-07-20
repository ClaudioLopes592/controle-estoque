"""adiciona cliente em saidas_estoque

Revision ID: 40705924e43b
Revises: 601c544d3cbc
Create Date: 2026-07-16 18:15:39.465574

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '40705924e43b'
down_revision: Union[str, Sequence[str], None] = '601c544d3cbc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.add_column(
        "saidas_estoque",
        sa.Column(
            "cliente_id",
            sa.Integer(),
            nullable=True,
        ),
    )

    op.create_foreign_key(
        "fk_saidas_cliente",
        "saidas_estoque",
        "clientes",
        ["cliente_id"],
        ["id"],
    )


def downgrade():
    op.drop_constraint(
        "fk_saidas_cliente",
        "saidas_estoque",
        type_="foreignkey",
    )

    op.drop_column(
        "saidas_estoque",
        "cliente_id",
    )
