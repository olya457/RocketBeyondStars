import React, {useEffect} from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {palette, typography} from '../config/theme';
import {StarryBackdrop} from '../ui/StarryBackdrop';
import {useOnboarding} from '../providers/OnboardingProvider';
import {RootStackParamList} from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {completed, loaded} = useOnboarding();

  const opacity = React.useRef(new Animated.Value(0)).current;
  const scale = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale]);

  useEffect(() => {
    if (!loaded) {
      return;
    }
    const timer = setTimeout(() => {
      if (completed) {
        navigation.reset({index: 0, routes: [{name: 'Main'}]});
      } else {
        navigation.reset({index: 0, routes: [{name: 'Onboarding'}]});
      }
    }, 1600);
    return () => clearTimeout(timer);
  }, [completed, loaded, navigation]);

  return (
    <View style={styles.root}>
      <StarryBackdrop density={80} />
      <Animated.View
        style={[
          styles.center,
          {opacity, transform: [{scale}]},
        ]}>
        <Image
          source={require('../assets/brand/app_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 180,
    height: 180,
  },
  title: {
    ...typography.display,
    marginTop: 24,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodySmall,
    marginTop: 6,
    color: palette.textSecondary,
  },
});
