# Chess Wrapped — Mobile architecture notes

## Why custom tab bar over default bottom-tabs

Default React Navigation tabs fight the floating glass pill look. App still depends on `@react-navigation/*` for theming container, but primary chrome is PagerView + measured icon slots + animated active pill.

## Why FilterHeader is outside the navigator

Filters must survive tab swipes and re-key all tabs with one period/speed change. Placing chrome in the shell (sibling to `NavigationContainer`) keeps Recap/Insights/Study mount state aligned to one `visitKey`.

## Data residency (UX implication)

Heavy personal game data never lives on the VPC. UI must feel fast offline after first ingest — hence aggressive local caches, cold gates, and long-loader choreography instead of server spinners.
