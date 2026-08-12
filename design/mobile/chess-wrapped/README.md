# Chess Wrapped — Mobile patterns

Source root: `workspace/side_projects/chess/mobile/`

## App shell

```
GestureHandlerRootView
  SafeAreaProvider
    Auth / Filter / ScanLog / Analytics / TabSwipe / InsightsNav
      StockfishProvider (+ StudyPrefetch)
        SafeAreaView (top/left/right, bg)
          StatusBar light-content
          AppColdGate
            FilterHeader          ← sticky global chrome
            NavigationContainer   ← DarkTheme remapped to tokens
              TabNavigator        ← PagerView + floating blur bar
            DayHangSquare         ← day-period floating control
```

Cold boot: until Inter fonts load → `BootSkeleton` only.

## Information architecture

| Tab | Screen | Job |
|-----|--------|-----|
| Wrapped | `RecapScreen` | Time / moves / peak / Elo / comparisons / archetypes |
| Insights | `InsightsScreen` | Anomalies + style / opening / middlegame / endgame panels |
| Study | `StudyScreen` | Mistakes quiz, opening prep, board |
| Profile | `ProfileScreen` | Account, storage, feedback, notifications entry |

Global filters (period + time control) sit **above** tabs and re-key analytics via `FilterContext`.

Period options: All time · Year · Month · Week · Day  
Speeds: All · Bullet · Blitz · Rapid · Classical

Day mode: week strip under selects; `DayHangSquare` (52px) clears horizontal space on the week row.

## Floating tab bar

| Spec | Value |
|------|-------|
| Position | Absolute, left/right 30, bottom `max(safeBottom, 12)` |
| Material | `BlurView` intensity 42, tint dark, `dimezisBlurView` |
| Chrome | `borderRadius 32`, border `rgba(255,255,255,0.14)`, fill `rgba(18,18,18,0.56)` |
| Shadow | black 0.32 opacity, radius 18, offset y 8, elevation 12 |
| Icons | Lucide 26.4 — RefreshCw / ChartBarBig / GraduationCap / User |
| Active pill | 94.5% width of slot, h 43.47, radius 24.57, fill white 12%, border white 16% |
| Pill motion | translateX, 40ms out-quad |
| Page fade | 240ms out-cubic on first visit per filter key |

Pager: `react-native-pager-view`, overdrag enabled; `pageProgress` shared for chrome sync.

## Filter chrome

- Row of two `SelectField`s (period + speed).
- Day calendar: Mon–Sun cells; selected = filled accent treatment; future days disabled.
- Reports layout bottom to FilterContext for hang-square clearance.

## Loading physics

| Constant | Value | Meaning |
|----------|-------|---------|
| `PAGE_FADE_WAIT_MS` | 3000 | Stay blank before showing long loader |
| `PAGE_LONG_LOADER_MIN_MS` | 4000 | Minimum loader on-screen time |
| Skeleton bone | pulse 0.35–0.85 / 700ms | Soft shimmer stand-in |
| Period → loader | year/all → skeleton; else pawn | Avoid spinner fatigue on heavy ranges |

## Study / board interaction

- Interactive Alpha board, orientation white/black.
- Quiz flow: highlight truth vs guess with sage vs blue washes.
- Stockfish on-device via `StockfishProvider`; prefetch gated by debug flag.

## Platform constraints worth copying

- Portrait primary; iOS tablets allowed.
- Android adaptive icon bg in Expo config currently `#E6F4FE` (stock Expo default — replace with brand black/red when polishing store assets).
- `softwareKeyboardLayoutMode: resize`.
- Secure storage + OAuth PKCE (Lichess) / username+email (Chess.com).
- Games stay on device; server holds usernames/emails + peer baselines only.

## Screens checklist (for ports)

- [ ] Recap metrics grid + badges + comparisons
- [ ] Insights summary → detail modules
- [ ] Study mistakes + opening prep
- [ ] Profile / account / storage / feedback / notifications
- [ ] Analytics scan banner + scan log panel
- [ ] Style radar + opening/middlegame/endgame insight panels

## Relationship to Figma prototypes

Prototypes under `../chess app/` validated IA and editorial type before RN softened the system. Prefer Expo patterns for production mobile; use prototypes for marketing microsites or intentional neo-brutal experiments.
