# Chess Wrapped integration

Import tokens from `../tokens` and mobile recipes from `../../mobile/patterns`. These are React Native source patterns: no web CSS, preview bundle, or prototype dependency is required.

```ts
import { colors, spacing, type } from '.../design/personal/chess-wrapped/shared/tokens';
import { mobilePatterns } from '.../design/personal/chess-wrapped/mobile/patterns';
```

Keep `withAlpha()` for derived tints and use semantic token names instead of new raw colors. The source app remains the authority for behavior and navigation.
