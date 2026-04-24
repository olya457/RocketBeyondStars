import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {palette, typography} from '../config/theme';

type Props = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
};

export const SectionTitle: React.FC<Props> = ({title, actionLabel, onAction}) => (
  <View style={styles.row}>
    <Text style={styles.title}>{title}</Text>
    {actionLabel ? (
      <Pressable onPress={onAction} hitSlop={8}>
        <Text style={styles.action}>{actionLabel}</Text>
      </Pressable>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    ...typography.heading,
  },
  action: {
    ...typography.bodySmall,
    color: palette.accent,
    fontWeight: '600',
  },
});
