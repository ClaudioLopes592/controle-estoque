"""remove coluna senha de usuarios

Revision ID: f48cea339e42
Revises: 8ac6e5b7483b
Create Date: 2026-07-04 21:33:22.330644

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f48cea339e42'
down_revision: Union[str, Sequence[str], None] = '8ac6e5b7483b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
