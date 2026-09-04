"""Build routine_calendar.json for v2 — week of 24/08/2026 to 30/08/2026.

Source: knowledge/health/synthesized/routine_v2.md
Changes from v1: wake 8am, internship 9-12, singing class Wed 6:30-10, chess gated after TCC,
German 4x60min, swimming 2x/week, dog walks optional, re-entry anchors added.
"""
from __future__ import annotations

import json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[5]
OUTPUT = REPO_ROOT / "knowledge" / "health" / "synthesized" / "routine_calendar.json"

WEEK = [
    ("2026-08-24", "mon", "Execution Reset"),
    ("2026-08-25", "tue", "Writing + Interview Skills"),
    ("2026-08-26", "wed", "Singing Class Day"),
    ("2026-08-27", "thu", "Deep + Theory"),
    ("2026-08-28", "fri", "Side Project + Social Launch"),
    ("2026-08-29", "sat", "Culture + Social"),
    ("2026-08-30", "sun", "Rest + Planning"),
]

DAY_EVENTS: dict[str, list[tuple[str, str, str, str, str | None]]] = {
    "2026-08-24": [
        ("08:00", "08:15", "Wake + hydration + light exposure", "anchor", "No phone for 15 min."),
        ("08:15", "08:40", "Dog walk", "movement", "Optional — if sunny early."),
        ("08:40", "09:00", "Breakfast", "anchor", "No productive work yet."),
        ("09:00", "12:00", "Internship", "fixed", "Dashboard work. Meetings 10:30–12."),
        ("10:30", "12:00", "Work meetings", "fixed", "Inside internship block."),
        ("12:00", "13:00", "Lunch + real rest", "rest", "No screen scrolling."),
        ("13:00", "13:45", "Singing practice", "creative", "Warm-up + All of Me. Record guitar anchor first."),
        ("13:45", "15:15", "TCC — Coding Sprint", "deep_work", "GATE: must complete before chess. One task only."),
        ("15:15", "15:35", "Break", "rest", "Move. Not phone."),
        ("15:35", "17:05", "Chess project", "deep_work", "Unlocked after TCC goal met. Timer on. Close at end."),
        ("17:05", "17:35", "Yoga", "movement", "30 min."),
        ("17:35", "19:00", "Dinner + family time", "social", None),
        ("19:00", "20:00", "German", "learning", "1-hour structured course lesson. Not Duolingo."),
        ("20:00", "21:00", "DSA", "learning", "LeetCode 2 problems + decide primary resource this week."),
        ("21:00", "22:00", "Chess study OR light", "creative", "Study only. No blitz."),
        ("22:00", "23:00", "Reading", "rest", "Current book."),
        ("23:00", "23:30", "Journal + set Tue TCC goal", "rest", "Win / friction / tomorrow goal."),
    ],
    "2026-08-25": [
        ("08:00", "08:15", "Wake + hydration", "anchor", None),
        ("08:40", "09:00", "Breakfast", "anchor", None),
        ("09:00", "12:00", "Internship", "fixed", None),
        ("10:30", "12:00", "Work meetings", "fixed", None),
        ("12:00", "13:00", "Lunch", "rest", None),
        ("13:00", "13:45", "Singing practice", "creative", "One specific goal per session."),
        ("13:45", "15:15", "TCC — Writing Sprint", "deep_work", "Methodology or literature. Text only, no code."),
        ("15:15", "15:35", "Break", "rest", None),
        ("15:35", "17:05", "Chess project", "deep_work", "After TCC gate only."),
        ("17:05", "17:35", "Walk — outdoor light", "movement", None),
        ("17:35", "19:00", "Dinner", "social", None),
        ("19:00", "20:00", "German", "learning", "1-hour lesson."),
        ("20:00", "21:00", "Interview soft skills", "learning", "STAR method — 3 behavioral questions spoken out loud, timed."),
        ("21:00", "22:00", "Guitar free practice", "creative", "Samba em Prelúdio."),
        ("22:00", "23:00", "Reading", "rest", None),
        ("23:00", "23:30", "Journal", "rest", None),
    ],
    "2026-08-26": [
        ("06:30", "07:15", "Wake + prep + travel (singing class)", "anchor", "Early class day. Alarm required."),
        ("07:45", "09:30", "Singing class", "fixed", "Fixed weekly commitment."),
        ("09:30", "10:00", "Travel back + decompress", "rest", None),
        ("10:00", "12:00", "Internship", "fixed", "Late start. Focused 10–12."),
        ("10:30", "12:00", "Work meetings", "fixed", None),
        ("12:00", "13:00", "Lunch", "rest", None),
        ("13:00", "13:45", "Rest — class day recovery", "rest", "Protect this. Class is tiring."),
        ("13:45", "15:15", "TCC — Coding Sprint", "deep_work", "Gate still applies."),
        ("15:15", "15:35", "Break", "rest", None),
        ("15:35", "17:05", "Chess project", "deep_work", None),
        ("17:05", "17:35", "Yoga — recovery", "movement", "Gentle. Post-class recovery."),
        ("17:35", "19:00", "Dinner", "social", None),
        ("19:00", "20:00", "Blog writing", "creative", "Amy Winehouse review — complete remaining sections."),
        ("20:00", "21:00", "Music research", "creative", "Artist context for review. Production, musicians, references."),
        ("22:00", "23:00", "Reading", "rest", None),
        ("23:00", "23:30", "Journal", "rest", None),
    ],
    "2026-08-27": [
        ("08:00", "08:15", "Wake + hydration", "anchor", None),
        ("08:40", "09:00", "Breakfast", "anchor", None),
        ("09:00", "12:00", "Internship", "fixed", None),
        ("10:30", "12:00", "Work meetings", "fixed", None),
        ("12:00", "13:00", "Lunch", "rest", None),
        ("13:00", "13:45", "Singing practice", "creative", None),
        ("13:45", "15:15", "TCC — Writing OR Coding", "deep_work", "Whichever is behind. Gate applies."),
        ("15:15", "15:35", "Break", "rest", None),
        ("15:35", "17:05", "Chess project", "deep_work", None),
        ("17:05", "17:50", "Swimming — day 1", "movement", "Placeholder — when enrolled. Otherwise yoga."),
        ("17:50", "19:00", "Dinner", "social", None),
        ("19:00", "20:00", "German", "learning", "1-hour lesson."),
        ("20:00", "21:00", "DSA", "learning", "2 problems + theory (Big O, data structures)."),
        ("21:00", "22:00", "System design reading", "learning", None),
        ("22:00", "23:00", "Reading", "rest", None),
        ("23:00", "23:30", "Journal", "rest", None),
    ],
    "2026-08-28": [
        ("08:00", "08:15", "Wake + hydration", "anchor", None),
        ("08:40", "09:00", "Breakfast", "anchor", None),
        ("09:00", "12:00", "Internship", "fixed", None),
        ("10:30", "12:00", "Work meetings", "fixed", None),
        ("12:00", "13:00", "Lunch", "rest", None),
        ("13:00", "13:45", "Guitar — deliberate", "creative", "Samba em Prelúdio specific section."),
        ("13:45", "15:15", "TCC — Integration review", "deep_work", "Read week output. Write 1-page summary."),
        ("15:15", "15:35", "Break", "rest", None),
        ("15:35", "17:05", "Side project OR YouTube", "creative", "Chess app demo script or new feature."),
        ("17:05", "17:35", "Dog walk + outdoor", "movement", None),
        ("17:35", "19:00", "Dinner", "social", None),
        ("19:00", "19:30", "Social logistics", "social", "Message someone. RSVP weekend event."),
        ("19:30", "20:30", "German", "learning", "1-hour lesson."),
        ("20:30", "21:00", "Light — music, chess study", "creative", None),
        ("22:00", "23:00", "Reading", "rest", None),
        ("23:00", "23:30", "Journal + weekly TCC progress note", "rest", None),
    ],
    "2026-08-29": [
        ("09:00", "09:30", "Wake — slow", "anchor", "No alarm if possible."),
        ("09:30", "10:00", "Breakfast + music", "rest", "Low-cognitive. Let mind wander."),
        ("10:30", "12:00", "TCC writing", "deep_work", "Light pressure. Maintain momentum."),
        ("12:00", "13:00", "Lunch", "rest", None),
        ("13:00", "17:00", "Cultural / social expedition", "social", "Exposition, cinema, neighborhood, market. Go."),
        ("17:00", "17:15", "Brief reflection", "rest", "What caught attention? Raw material for blog/YT."),
        ("18:00", "21:00", "Social dinner or event", "social", "Relational priority."),
        ("21:00", "22:30", "Free — guitar, read, music", "rest", None),
    ],
    "2026-08-30": [
        ("09:00", "09:30", "Wake", "anchor", None),
        ("09:30", "10:10", "Swimming — day 2 OR yoga 45 min", "movement", "Restorative pace."),
        ("10:10", "11:00", "Breakfast + weekly review journal", "rest", "What moved? What avoided? What do you actually want?"),
        ("11:00", "11:30", "Weekly planning", "planning", "Next week TCC goals. Social plan. DSA check."),
        ("11:30", "13:00", "Blog OR YouTube", "creative", "One concrete output — publish or record rough cut."),
        ("13:00", "14:30", "Family lunch", "social", "Presence over phone."),
        ("14:30", "14:50", "Nap", "rest", "20 min max."),
        ("15:00", "16:00", "German", "learning", "1-hour lesson."),
        ("16:00", "17:00", "Explore", "creative", "New topic, recipe, or walk route."),
        ("17:00", "18:30", "Meal prep", "anchor", "Cook 2–3 meals for the week."),
        ("20:00", "21:30", "Light entertainment", "rest", None),
        ("21:30", "22:30", "Reading", "rest", None),
        ("23:00", "23:30", "Journal + sleep", "rest", None),
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
        "source_markdown": "knowledge/health/synthesized/routine_v2.md",
        "generated_from": "services/planner/implementation/tools/api/scripts/build_routine_calendar_v2.py",
        "version": "2026-08-22",
        "week_start": "2026-08-24",
        "week_end": "2026-08-30",
        "timezone": "America/Sao_Paulo",
        "event_count": len(events),
        "events": events,
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(events)} events → {OUTPUT}")


if __name__ == "__main__":
    main()
