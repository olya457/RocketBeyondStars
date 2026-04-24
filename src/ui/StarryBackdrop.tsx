import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {palette} from '../config/theme';

type Props = {
  density?: number;
  width?: number;
  height?: number;
};

const seededRandom = (seed: number) => {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export const StarryBackdrop: React.FC<Props> = ({
  density = 40,
  width = 100,
  height = 100,
}) => {
  const stars = useMemo(() => {
    return Array.from({length: density}, (_, i) => {
      const x = seededRandom(i * 11 + 1) * width;
      const y = seededRandom(i * 17 + 3) * height;
      const size = 1 + Math.floor(seededRandom(i * 23 + 5) * 2);
      const opacity = 0.3 + seededRandom(i * 29 + 7) * 0.6;
      return {x, y, size, opacity, key: `s-${i}`};
    });
  }, [density, width, height]);

  return (
    <View style={styles.wrapper} pointerEvents="none">
      {stars.map(s => (
        <View
          key={s.key}
          style={[
            styles.star,
            {
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  star: {
    position: 'absolute',
    backgroundColor: palette.star,
    borderRadius: 4,
  },
});
