import {Platform} from 'react-native';

export const palette = {
  background: '#0A0E27',
  backgroundDeep: '#060921',
  surface: '#141A3A',
  surfaceElevated: '#1C2450',
  surfaceSoft: '#1A2042',
  accent: '#F9C728',
  accentSoft: 'rgba(249, 199, 40, 0.15)',
  accentStrong: '#FFD84A',
  border: 'rgba(255, 255, 255, 0.08)',
  borderStrong: 'rgba(255, 255, 255, 0.14)',
  textPrimary: '#FFFFFF',
  textSecondary: '#B7BDD4',
  textMuted: '#6E7596',
  success: '#32D583',
  error: '#F15555',
  overlay: 'rgba(0, 0, 0, 0.55)',
  mapGrid: 'rgba(120, 140, 200, 0.12)',
  mapLine: 'rgba(100, 180, 180, 0.35)',
  star: '#E8ECFF',
};

export const radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  xxl: 28,
  pill: 999,
};

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const typography = {
  display: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700' as const,
    color: palette.textPrimary,
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700' as const,
    color: palette.textPrimary,
  },
  heading: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700' as const,
    color: palette.textPrimary,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400' as const,
    color: palette.textPrimary,
  },
  bodySmall: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
    color: palette.textSecondary,
  },
  caption: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500' as const,
    color: palette.textMuted,
  },
  button: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: palette.backgroundDeep,
  },
};

export const layout = {
  tabBarOffset: Platform.OS === 'ios' ? 20 : 30,
  tabBarHeight: 68,
  screenPadding: 20,
};
