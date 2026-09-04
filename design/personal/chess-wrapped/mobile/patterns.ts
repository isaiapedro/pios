import { StyleSheet } from 'react-native';
import { colors, radius, spacing, type, withAlpha } from '../shared/tokens';

export const mobilePatterns = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  card: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md },
  cardRaised: { backgroundColor: colors.surfaceRaised, borderRadius: radius.md, padding: spacing.md },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  primaryButton: { minHeight: 46, justifyContent: 'center', alignItems: 'center', borderRadius: radius.pill, backgroundColor: colors.accent, paddingHorizontal: spacing.lg },
  primaryButtonLabel: { ...type.body, fontFamily: type.subheading.fontFamily, color: colors.text },
  chip: { alignSelf: 'flex-start', borderRadius: radius.pill, backgroundColor: withAlpha(colors.accent, 0.16), paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  chipLabel: { ...type.micro, fontFamily: type.subheading.fontFamily, color: colors.textSoft },
  meterTrack: { height: 6, overflow: 'hidden', borderRadius: radius.pill, backgroundColor: withAlpha(colors.text, 0.08) },
  board: { overflow: 'hidden', borderRadius: radius.md },
});

export const boardStates = {
  selected: { borderWidth: 2, borderColor: colors.sage },
  engineHighlight: { backgroundColor: withAlpha(colors.sage, 0.5) },
  guessHighlight: { backgroundColor: withAlpha(colors.blue, 0.5) },
  legalMove: { backgroundColor: withAlpha(colors.red, 0.45) },
};
