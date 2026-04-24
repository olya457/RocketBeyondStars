import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {palette, radius, typography} from '../config/theme';

type Props = {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'ghost';
  trailing?: string;
  leading?: string;
  disabled?: boolean;
};

export const AuroraButton: React.FC<Props> = ({
  label,
  onPress,
  style,
  textStyle,
  variant = 'primary',
  trailing,
  leading,
  disabled,
}) => {
  const variantStyle = variantStyles[variant];
  const labelColor =
    variant === 'primary' ? palette.backgroundDeep : palette.textPrimary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      android_ripple={{color: 'rgba(0,0,0,0.1)'}}
      style={({pressed}) => [
        styles.base,
        variantStyle,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
        style,
      ]}>
      <View style={styles.content}>
        {leading ? (
          <Text style={[styles.icon, {color: labelColor}]}>{leading}</Text>
        ) : null}
        <Text
          style={[
            typography.button,
            {color: labelColor},
            textStyle,
          ]}>
          {label}
        </Text>
        {trailing ? (
          <Text style={[styles.icon, {color: labelColor}]}>{trailing}</Text>
        ) : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.9,
    transform: [{scale: 0.99}],
  },
  disabled: {
    opacity: 0.5,
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: palette.accent,
    shadowColor: palette.accent,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: {width: 0, height: 8},
    elevation: 10,
  },
  secondary: {
    backgroundColor: palette.surfaceElevated,
    borderWidth: 1,
    borderColor: palette.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
});
