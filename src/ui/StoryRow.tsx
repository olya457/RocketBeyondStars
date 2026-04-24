import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {palette, radius, typography} from '../config/theme';

type Props = {
  title: string;
  summary: string;
  readTime: string;
  image: ImageSourcePropType;
  onPress?: () => void;
};

export const StoryRow: React.FC<Props> = ({
  title,
  summary,
  readTime,
  image,
  onPress,
}) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [styles.row, pressed && styles.pressed]}>
    <Image source={image} style={styles.image} />
    <View style={styles.body}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.summary} numberOfLines={2}>
        {summary}
      </Text>
      <View style={styles.meta}>
        <Text style={styles.time}>⏱ {readTime}</Text>
      </View>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: palette.border,
    gap: 12,
    alignItems: 'center',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    resizeMode: 'cover',
  },
  body: {
    flex: 1,
  },
  title: {
    ...typography.body,
    fontWeight: '700',
  },
  summary: {
    ...typography.bodySmall,
    marginTop: 2,
  },
  meta: {
    marginTop: 4,
    flexDirection: 'row',
  },
  time: {
    ...typography.caption,
    color: palette.textSecondary,
  },
  pressed: {
    opacity: 0.85,
  },
});
