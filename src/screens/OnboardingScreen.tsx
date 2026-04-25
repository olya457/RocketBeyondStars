import React, {useRef, useState} from 'react';
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenShell} from '../ui/ScreenShell';
import {AuroraButton} from '../ui/AuroraButton';
import {palette, radius, typography} from '../config/theme';
import {onboardingSlides} from '../data/onboarding';
import {useOnboarding} from '../providers/OnboardingProvider';
import {RootStackParamList} from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {markCompleted} = useOnboarding();
  const {width} = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(event.nativeEvent.contentOffset.x / width);
    if (next !== index) {
      setIndex(next);
    }
  };

  const goNext = () => {
    if (index < onboardingSlides.length - 1) {
      listRef.current?.scrollToIndex({index: index + 1});
      setIndex(index + 1);
    } else {
      finish();
    }
  };

  const finish = () => {
    markCompleted();
    navigation.reset({index: 0, routes: [{name: 'Main'}]});
  };

  const isLast = index === onboardingSlides.length - 1;

  return (
    <ScreenShell showStars edges={['top']}>
      <View style={styles.topRow}>
        {!isLast ? (
          <Text style={styles.skip} onPress={finish}>
            Skip
          </Text>
        ) : (
          <View />
        )}
      </View>
      <FlatList
        ref={listRef}
        data={onboardingSlides}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        renderItem={({item}) => (
          <View style={[styles.slide, {width: width - 40}]}>
            <View style={styles.illustrationWrap}>
              <Image
                source={item.image}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        )}
      />
      <View style={styles.dots}>
        {onboardingSlides.map((slide, i) => (
          <View
            key={slide.id}
            style={[
              styles.dot,
              i === index && styles.dotActive,
            ]}
          />
        ))}
      </View>
      <AuroraButton
        label={isLast ? 'Get Started' : 'Next'}
        trailing="›"
        onPress={goNext}
        style={styles.cta}
      />
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 8,
  },
  skip: {
    ...typography.bodySmall,
    color: palette.textSecondary,
    fontWeight: '600',
    paddingHorizontal: 6,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  illustrationWrap: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40,
  },
  illustration: {
    width: '80%',
    height: '80%',
  },
  title: {
    ...typography.display,
    textAlign: 'center',
    marginTop: 12,
  },
  subtitle: {
    ...typography.bodySmall,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: palette.border,
  },
  dotActive: {
    width: 22,
    backgroundColor: palette.accent,
  },
  cta: {
    marginBottom: 24,
  },
});
