from domain.models import NormalizedIssue
from application.card_service import CardService
from infrastructure.storage import LocalStorage


def test_mirror_preserves_tracking_on_resync(tmp_path):
    storage = LocalStorage(tmp_path)
    cards = CardService(storage)
    issue = NormalizedIssue(
        key="EFICORE-1",
        title="First",
        description="Desc",
        status="In Progress",
    )
    cards.mirror(issue, execution_summary="touched auth")
    issue.title = "First updated"
    cards.mirror(issue)
    content = cards.show("EFICORE-1")
    assert "First updated" in content
    assert "touched auth" in content
    assert "n8n" in content
