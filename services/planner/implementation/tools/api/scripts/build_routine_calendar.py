from __future__ import annotations

import json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[5]
OUTPUT = REPO_ROOT / "knowledge" / "health" / "synthesized" / "routine_calendar.json"

WEEK = [
    ("2026-08-06", "thu", "System Launch"),
    ("2026-08-07", "fri", "Creative Depth"),
    ("2026-08-08", "sat", "Cultural Exploration"),
    ("2026-08-09", "sun", "Rest, Restoration, and Strategic Planning"),
    ("2026-08-10", "mon", "Execution Engine"),
    ("2026-08-11", "tue", "Craft and Network"),
    ("2026-08-12", "wed", "Synthesis and Closing the Loop"),
]

DAY_EVENTS: dict[str, list[tuple[str, str, str, str, str | None]]] = {
    "2026-08-06": [
        ("07:00", "07:15", "Wake + hydration + light exposure", "anchor", None),
        ("07:15", "07:45", "Dog walk", "movement", "Keystone habit. Non-negotiable."),
        ("07:45", "08:15", "Breakfast", "anchor", "Protein-first."),
        ("08:15", "08:30", "Yoga", "movement", "Sun salutations or simple flow."),
        ("08:30", "10:00", "TCC — Project Scoping", "deep_work", "Architecture decision only. Define task list for the week."),
        ("10:00", "10:20", "Break — walk, coffee", "rest", "Ultradian rest. No screens."),
        ("10:30", "12:00", "Work meetings", "fixed", "Fixed weekday constraint."),
        ("12:00", "13:00", "Lunch + rest", "rest", None),
        ("13:00", "13:30", "Guitar — deliberate practice", "creative", "One chord progression. Record yourself."),
        ("13:30", "15:00", "Interview Prep: DSA Fundamentals", "deep_work", "Active recall only."),
        ("15:00", "15:20", "Break", "rest", None),
        ("15:20", "16:50", "Blog / YouTube planning", "creative", "Outline one video concept."),
        ("17:00", "17:40", "Swimming", "movement", "40 min."),
        ("18:00", "19:30", "Family dinner", "social", None),
        ("19:30", "19:50", "German", "learning", "Anki or Duolingo."),
        ("20:30", "21:00", "Reading", "rest", "Non-career reading."),
        ("21:00", "22:30", "Wind down + journal", "rest", "Win, friction, tomorrow intention."),
    ],
    "2026-08-07": [
        ("07:00", "07:15", "Wake + hydration + light", "anchor", None),
        ("07:15", "07:45", "Dog walk", "movement", None),
        ("07:45", "08:15", "Breakfast", "anchor", None),
        ("08:15", "08:45", "Full yoga session", "movement", "Breath-focused identity work."),
        ("08:45", "10:15", "TCC — Coding Sprint", "deep_work", "First task from scoping list only."),
        ("10:15", "10:35", "Break", "rest", None),
        ("10:30", "12:00", "Work meetings", "fixed", None),
        ("12:00", "13:00", "Lunch", "rest", None),
        ("13:00", "13:30", "Singing — deliberate practice", "creative", "Breath support or pitch accuracy."),
        ("13:30", "15:00", "Side project block", "deep_work", "Ship one visible thing."),
        ("15:00", "15:20", "Break", "rest", None),
        ("15:20", "16:50", "Music research", "creative", "Artist, genre, or production deep dive."),
        ("17:00", "17:30", "Dog walk + outdoor time", "movement", "Second walk. Decompression."),
        ("18:00", "19:00", "Social logistics", "social", "RSVP or reach out for the weekend."),
        ("20:00", "21:00", "Chess — analysis game", "creative", "Deliberate, not blitz."),
        ("21:00", "22:30", "Wind down + journal", "rest", None),
    ],
    "2026-08-08": [
        ("08:00", "08:30", "Wake + hydration", "anchor", "No alarm if possible."),
        ("08:30", "09:15", "Yoga — weekend session", "movement", "Yin or flexibility focus."),
        ("09:30", "10:30", "Breakfast + music / podcast", "rest", "Low-cognitive morning."),
        ("10:30", "12:00", "TCC — Writing sprint", "deep_work", "Literature review or methodology. No coding."),
        ("12:00", "13:00", "Lunch", "rest", None),
        ("13:00", "17:00", "Cultural expedition", "social", "Museum, cinema, market, or new neighborhood."),
        ("17:00", "17:05", "Brief reflection", "rest", "What caught your attention?"),
        ("18:30", "20:30", "Social dinner or event", "social", "Relatedness priority."),
        ("21:00", "22:30", "Wind down", "rest", "Free guitar, journaling, music."),
    ],
    "2026-08-09": [
        ("08:00", "08:30", "Wake + hydration", "anchor", None),
        ("08:30", "09:10", "Swimming — restorative", "movement", "Moving meditation."),
        ("09:30", "10:30", "Slow breakfast + journaling", "rest", "Weekly review."),
        ("10:30", "11:00", "Weekly planning session", "planning", "Define Monday TCC goal. 30 min max."),
        ("11:00", "12:30", "Blog / YouTube deep work", "creative", "Draft post or rough video take."),
        ("13:00", "14:30", "Family lunch", "social", "Phones away."),
        ("14:30", "14:50", "Nap", "rest", "20 min max."),
        ("15:00", "17:00", "Exploratory learning", "learning", "ML paper, probability, or German dialogue."),
        ("17:00", "18:30", "Dog walk + phone call", "social", "Walk and talk with family or friend."),
        ("19:00", "20:30", "Meal prep", "anchor", "Cook 2–3 meals for the week."),
        ("20:30", "21:00", "Light entertainment", "rest", "Non-productive by design."),
        ("21:00", "22:30", "Wind down + journal", "rest", None),
    ],
    "2026-08-10": [
        ("07:00", "07:15", "Wake + hydration + light", "anchor", None),
        ("07:15", "07:45", "Dog walk", "movement", None),
        ("07:45", "08:15", "Breakfast", "anchor", None),
        ("08:15", "08:30", "Yoga", "movement", None),
        ("08:30", "10:00", "TCC — Hardest Coding Task", "deep_work", "Most avoided task first."),
        ("10:00", "10:20", "Break", "rest", None),
        ("10:30", "12:00", "Work meetings", "fixed", None),
        ("12:00", "13:00", "Lunch", "rest", None),
        ("13:00", "13:30", "Guitar — deliberate practice", "creative", "One technique. Record and listen."),
        ("13:30", "15:00", "ML / DE / AI learning", "learning", "Active recall after reading."),
        ("15:00", "15:20", "Break", "rest", None),
        ("15:20", "16:50", "System design interview prep", "deep_work", "One problem out loud."),
        ("17:00", "17:40", "Swimming", "movement", None),
        ("18:00", "19:30", "Family time + dinner", "social", None),
        ("19:30", "19:50", "German", "learning", None),
        ("20:30", "21:00", "Chess or hobby exploration", "creative", None),
        ("21:00", "22:30", "Wind down + journal", "rest", None),
    ],
    "2026-08-11": [
        ("07:00", "07:15", "Wake + hydration + light", "anchor", None),
        ("07:15", "07:45", "Yoga — outdoor if possible", "movement", "Movement + light + nature."),
        ("07:50", "08:15", "Breakfast + daily intentions", "anchor", "Three intentions for the day."),
        ("08:30", "10:00", "TCC — Writing Sprint", "deep_work", "Methodology or results narrative."),
        ("10:00", "10:20", "Break", "rest", None),
        ("10:30", "12:00", "Work meetings", "fixed", None),
        ("12:00", "13:00", "Lunch", "rest", None),
        ("13:00", "13:30", "Singing — record rough take", "creative", "Listen without judgment."),
        ("13:30", "15:00", "Interview soft skills", "deep_work", "STAR stories out loud."),
        ("15:00", "15:20", "Break", "rest", None),
        ("15:20", "16:50", "Social media content", "creative", "Three posts + one thumbnail hook."),
        ("17:00", "17:30", "Dog walk — new route", "movement", "Novel environment."),
        ("18:00", "19:30", "Social investment", "social", "Message someone. RSVP to a group."),
        ("20:00", "20:45", "Reading", "rest", None),
        ("20:45", "21:05", "German", "learning", None),
        ("21:00", "22:30", "Wind down + journal", "rest", None),
    ],
    "2026-08-12": [
        ("07:00", "07:15", "Wake + hydration + light", "anchor", None),
        ("07:15", "07:45", "Dog walk", "movement", None),
        ("07:45", "08:15", "Breakfast", "anchor", None),
        ("08:15", "08:30", "Light stretching", "movement", None),
        ("08:30", "10:00", "TCC — Integration review", "deep_work", "One-page summary of the week."),
        ("10:00", "10:20", "Break", "rest", None),
        ("10:30", "12:00", "Work meetings", "fixed", None),
        ("12:00", "13:00", "Lunch", "rest", None),
        ("13:00", "13:30", "Guitar — free play", "creative", "Exploration, no target."),
        ("13:30", "15:00", "DSA practice", "deep_work", "Two LeetCode problems."),
        ("15:00", "15:20", "Break", "rest", None),
        ("15:20", "16:50", "Blog post or journal entry", "creative", "Finish one complete piece."),
        ("17:00", "17:40", "Swimming or outdoor activity", "movement", None),
        ("18:00", "19:00", "Social logistics + calls", "social", "Plan upcoming weekend."),
        ("20:00", "21:00", "New hobby exploration", "creative", "Cook, craft, or new genre."),
        ("21:00", "22:30", "Wind down + week closing journal", "rest", "Full week reflection."),
    ],
}


def main() -> None:
    events = []
    for date, weekday, theme in WEEK:
        for start, end, title, category, notes in DAY_EVENTS[date]:
            events.append(
                {
                    "date": date,
                    "weekday": weekday,
                    "day_theme": theme,
                    "start": start,
                    "end": end,
                    "title": title,
                    "category": category,
                    "notes": notes,
                }
            )

    payload = {
        "source_markdown": "knowledge/health/synthesized/routine.md",
        "generated_from": "services/planner/implementation/tools/api/scripts/build_routine_calendar.py",
        "version": "2026-08-05",
        "week_start": "2026-08-06",
        "week_end": "2026-08-12",
        "timezone": "America/Sao_Paulo",
        "event_count": len(events),
        "events": events,
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(events)} events to {OUTPUT}")


if __name__ == "__main__":
    main()
