from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from application.orchestrator import Orchestrator
from config import load_config


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="job-archive")
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser("status")

    scan = sub.add_parser("scan")
    scan.add_argument("repository")
    scan.add_argument("--since")

    summarize = sub.add_parser("summarize")
    summarize.add_argument("repository")
    summarize.add_argument("--since")

    cards = sub.add_parser("cards")
    cards_sub = cards.add_subparsers(dest="cards_command", required=True)
    sync = cards_sub.add_parser("sync")
    sync.add_argument("keys", nargs="*", help="Optional issue keys; default uses sync_jql")

    card = sub.add_parser("card")
    card_sub = card.add_subparsers(dest="card_command", required=True)
    show = card_sub.add_parser("show")
    show.add_argument("key")
    update = card_sub.add_parser("update")
    update.add_argument("key")
    update.add_argument("--summary")
    update.add_argument("--description")
    update.add_argument("--status")
    update.add_argument("--comment")
    update.add_argument("--tracking")
    update.add_argument("--local-only-comment", action="store_true")

    export = sub.add_parser("export")
    export.add_argument("--professional", action="store_true")

    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    root = Path(__file__).resolve().parents[2]
    orchestrator = Orchestrator(load_config(root))

    if args.command == "status":
        print(json.dumps(orchestrator.status(), indent=2))
        return 0
    if args.command == "scan":
        print(json.dumps(orchestrator.scan(args.repository, since=args.since), indent=2))
        return 0
    if args.command == "summarize":
        print(orchestrator.get_sanitized_work_summary(args.repository, since=args.since))
        return 0
    if args.command == "cards" and args.cards_command == "sync":
        keys = args.keys or None
        print(json.dumps(orchestrator.cards_sync(keys), indent=2))
        return 0
    if args.command == "card" and args.card_command == "show":
        print(orchestrator.read_local_card(args.key))
        return 0
    if args.command == "card" and args.card_command == "update":
        result = orchestrator.update_card(
            key=args.key,
            summary=args.summary,
            description=args.description,
            status=args.status,
            comment=args.comment,
            tracking=args.tracking,
            push_comment=not args.local_only_comment,
        )
        print(json.dumps(result, indent=2))
        return 0
    if args.command == "export" and args.professional:
        print(json.dumps(orchestrator.professional_export(), indent=2))
        return 0
    parser.error(f"unhandled command: {args.command}")
    return 2


if __name__ == "__main__":
    sys.exit(main())
