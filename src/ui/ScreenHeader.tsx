import React from 'react';
import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {palette, radius, typography} from '../config/theme';

type Props = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  style?: ViewStyle;
};

export const ScreenHeader: React.FC<Props> = ({
  title,
  subtitle,
  onBack,
  right,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {onBack ? (
        <Pressable
          onPress={onBack}
          hitSlop={10}
          style={({pressed}) => [styles.back, pressed && {opacity: 0.7}]}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
      ) : (
        <View style={styles.backPlaceholder} />
      )}
      <View style={styles.center}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.right}>{right}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.border,
  },
  backPlaceholder: {
    width: 40,
    height: 40,
  },
  backIcon: {
    color: palette.textPrimary,
    fontSize: 26,
    fontWeight: '600',
    marginTop: -3,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...typography.heading,
  },
  subtitle: {
    ...typography.bodySmall,
    marginTop: 2,
  },
  right: {
    width: 40,
    alignItems: 'flex-end',
  },
});
