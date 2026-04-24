import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {palette, radius, typography} from '../config/theme';

type Props = {
  icon?: string;
  title: string;
  subtitle?: string;
  style?: ViewStyle;
};

export const EmptyState: React.FC<Props> = ({icon = '🔖', title, subtitle, style}) => (
  <View style={[styles.box, style]}>
    <Text style={styles.icon}>{icon}</Text>
    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  box: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.surface,
    padding: 28,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 28,
  },
  title: {
    ...typography.body,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodySmall,
    textAlign: 'center',
  },
});
