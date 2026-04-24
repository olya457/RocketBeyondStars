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
import {BookmarkToggle} from './BookmarkToggle';

type Props = {
  title: string;
  subtitle?: string;
  image: ImageSourcePropType;
  country?: string;
  saved?: boolean;
  onPress?: () => void;
  onToggleSave?: () => void;
  variant?: 'tile' | 'row' | 'featured';
};

export const MissionCard: React.FC<Props> = ({
  title,
  subtitle,
  image,
  country,
  saved,
  onPress,
  onToggleSave,
  variant = 'tile',
}) => {
  if (variant === 'row') {
    return (
      <Pressable
        onPress={onPress}
        style={({pressed}) => [styles.rowBase, pressed && styles.pressed]}>
        <Image source={image} style={styles.rowImage} />
        <View style={styles.rowBody}>
          <Text style={styles.rowTitle} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.rowSubtitle} numberOfLines={2}>
              {subtitle}
            </Text>
          ) : null}
          {country ? (
            <View style={styles.rowMeta}>
              <Text style={styles.pin}>📍</Text>
              <Text style={styles.rowCountry}>{country}</Text>
            </View>
          ) : null}
        </View>
        {onToggleSave ? (
          <BookmarkToggle
            size="sm"
            active={!!saved}
            onPress={onToggleSave}
            style={styles.rowBookmark}
          />
        ) : null}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.tileBase, pressed && styles.pressed]}>
      <Image source={image} style={styles.tileImage} />
      {onToggleSave ? (
        <BookmarkToggle
          size="sm"
          active={!!saved}
          onPress={onToggleSave}
          style={styles.tileBookmark}
        />
      ) : null}
      <View style={styles.tileBody}>
        <Text style={styles.tileTitle} numberOfLines={1}>
          {title}
        </Text>
        {country ? (
          <Text style={styles.tileCountry}>{country}</Text>
        ) : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tileBase: {
    flex: 1,
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    overflow: 'hidden',
  },
  tileImage: {
    width: '100%',
    aspectRatio: 1.25,
    resizeMode: 'cover',
  },
  tileBody: {
    padding: 12,
  },
  tileTitle: {
    ...typography.body,
    fontWeight: '700',
  },
  tileCountry: {
    ...typography.caption,
    marginTop: 3,
  },
  tileBookmark: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(6,9,33,0.8)',
  },
  rowBase: {
    flexDirection: 'row',
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 12,
    alignItems: 'center',
    gap: 12,
  },
  rowImage: {
    width: 60,
    height: 60,
    borderRadius: radius.md,
    resizeMode: 'cover',
  },
  rowBody: {
    flex: 1,
  },
  rowTitle: {
    ...typography.body,
    fontWeight: '700',
  },
  rowSubtitle: {
    ...typography.bodySmall,
    marginTop: 2,
  },
  rowMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  pin: {
    fontSize: 11,
  },
  rowCountry: {
    ...typography.caption,
    color: palette.textSecondary,
  },
  rowBookmark: {
    backgroundColor: 'transparent',
  },
  pressed: {
    opacity: 0.85,
  },
});
