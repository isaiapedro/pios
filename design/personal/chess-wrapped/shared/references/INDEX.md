# Chess Wrapped — Sources index

## Live product

| Path | Role |
|------|------|
| `workspace/side_projects/chess/mobile/` | Shipping Expo app |
| `.../src/theme.ts` | Canonical tokens |
| `.../src/components/ui.tsx` | Primitive UI kit |
| `.../src/navigation/TabNavigator.tsx` | Floating blur tab bar |
| `.../src/components/ChessBoard.tsx` | Board + Alpha SVG pieces |
| `.../src/components/RecapCards.tsx` | Metric / badge / comparison cards |
| `.../src/components/LoadingSkeletons.tsx` | Boot + page loaders |
| `.../src/components/FilterHeader.tsx` | Global period / speed chrome |
| `.../src/components/StyleRadarChart.tsx` | Style-of-play radar |
| `.../src/icons.tsx` | Lucide stroke wrapper |
| `.../app.json` | Product name, scheme, dark UI, icon paths |
| `workspace/side_projects/chess/visual_identity.md` | Editorial / neo-brutal / analog manual |
| `workspace/side_projects/chess/chess_app_project_config.md` | Feature IA (tabs, filters, study) |
| `workspace/side_projects/chess/README.md` | Architecture + data residency |

## Design-domain prototypes (Figma Make)

| Path | Character |
|------|-----------|
| `design/personal/chess-wrapped/mobile/prototypes/figma-make/` | Playfair + IBM Plex, crimson neo-brutal `filter-rect`, bg `#0a0a0f` |

Both prototypes share IA: Wrapped · Insights · Study pages + FilterHeader + BottomNav.

## Dependencies that shape UI

From `mobile/package.json`:

- Navigation: `@react-navigation/native`, bottom-tabs (shell uses custom PagerView bar)
- Motion / chrome: `expo-blur`, `react-native-pager-view`, `react-native-gesture-handler`
- Charts: `react-native-chart-kit`, custom SVG radar
- Icons: `lucide-react-native`
- Fonts (declared): Inter (used), Playfair / IBM Plex packages present but unused at runtime
- Chess: `chess.js`, Alpha SVG paths

## Licenses

- **Alpha pieces** (Eric Bentzen via Lichess): personal non-commercial — see `../assets/chess_set/LICENSE.md`
- App code / tokens: follow the chess project `LICENSE` at `mobile/LICENSE`

## Product naming

| Surface | Name |
|---------|------|
| Expo `name` | Chess Wrapped |
| Expo `slug` | chess-wrapped |
| Scheme | `com.chesswrapped.app` |
| Tab label | Wrapped (a11y: Recap) · Insights · Study · Profile |
