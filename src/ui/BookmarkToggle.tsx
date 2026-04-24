import React from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from 'react-native';
import {palette, radius} from '../config/theme';

type Props = {
  active: boolean;
  onPress: () => void;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
};

export const BookmarkToggle: React.FC<Props> = ({
  active,
  onPress,
  size = 'md',
  style,
}) => {
  const dim = size === 'sm' ? 32 : size === 'lg' ? 56 : 44;

  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      style={({pressed}) => [
        styles.base,
        {
          width: dim,
          height: dim,
          borderRadius: radius.md,
          backgroundColor: active ? palette.accentSoft : palette.surface,
          borderColor: active ? palette.accent : palette.border,
        },
        pressed && {opacity: 0.8},
        style,
      ]}>
      <Text
        style={[
          styles.icon,
          {color: active ? palette.accent : palette.textSecondary},
        ]}>
        {active ? '🔖' : '🤍'}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  icon: {
    fontSize: 16,
  },
});
