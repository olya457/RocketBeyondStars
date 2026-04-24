import React from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from 'react-native';
import {palette, radius, typography} from '../config/theme';

type Props = {
  label: string;
  icon?: string;
  active?: boolean;
  onPress?: () => void;
  counter?: number;
  style?: ViewStyle;
};

export const Chip: React.FC<Props> = ({
  label,
  icon,
  active,
  onPress,
  counter,
  style,
}) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [
      styles.base,
      active ? styles.active : styles.inactive,
      pressed && {opacity: 0.85},
      style,
    ]}>
    {icon ? (
      <Text style={[styles.icon, active && styles.iconActive]}>{icon}</Text>
    ) : null}
    <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    {counter !== undefined && counter > 0 ? (
      <Text style={[styles.counter, active && styles.counterActive]}>
        {counter}
      </Text>
    ) : null}
  </Pressable>
);

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  inactive: {
    backgroundColor: palette.surface,
    borderColor: palette.border,
  },
  active: {
    backgroundColor: palette.accent,
    borderColor: palette.accent,
  },
  icon: {
    fontSize: 14,
    color: palette.textSecondary,
  },
  iconActive: {
    color: palette.backgroundDeep,
  },
  label: {
    ...typography.bodySmall,
    color: palette.textPrimary,
    fontWeight: '600',
  },
  labelActive: {
    color: palette.backgroundDeep,
  },
  counter: {
    ...typography.caption,
    color: palette.textSecondary,
    fontWeight: '700',
  },
  counterActive: {
    color: palette.backgroundDeep,
  },
});
