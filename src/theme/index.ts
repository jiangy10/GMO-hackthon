// ============================================================
// Adobe Spectrum-Inspired Theme
// ============================================================

export const colors = {
  // Primary
  adobeRed: '#E03C31',
  adobeRedDark: '#C62828',
  adobeRedLight: '#FF6659',

  // Backgrounds
  background: '#1B1B1B',
  surface: '#2D2D2D',
  surfaceLight: '#3A3A3A',
  surfaceHighlight: '#444444',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#B3B3B3',
  textTertiary: '#808080',
  textOnRed: '#FFFFFF',

  // Chat
  aiBubble: '#2D2D2D',
  userBubble: '#E03C31',
  choiceCardBg: '#2D2D2D',
  choiceCardBorder: '#444444',
  choiceCardSelected: '#E03C31',

  // Accents
  accent: '#4A90D9',
  success: '#2ECC71',
  warning: '#F39C12',

  // Misc
  divider: '#3A3A3A',
  overlay: 'rgba(0, 0, 0, 0.6)',
  inputBg: '#3A3A3A',
  inputBorder: '#555555',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

export const typography = {
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: colors.textPrimary,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    color: colors.textTertiary,
  },
  label: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: colors.textSecondary,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
  },
} as const;

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;
