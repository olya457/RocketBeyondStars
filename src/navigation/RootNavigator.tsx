import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SplashScreen} from '../screens/SplashScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {LocationsScreen} from '../screens/LocationsScreen';
import {LocationDetailsScreen} from '../screens/LocationDetailsScreen';
import {StoriesScreen} from '../screens/StoriesScreen';
import {StoryDetailsScreen} from '../screens/StoryDetailsScreen';
import {QuizPlayScreen} from '../screens/QuizPlayScreen';
import {QuizResultScreen} from '../screens/QuizResultScreen';
import {MainTabs} from './MainTabs';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'fade',
      contentStyle: {backgroundColor: '#0A0E27'},
    }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="Main" component={MainTabs} />
    <Stack.Screen name="Locations" component={LocationsScreen} />
    <Stack.Screen name="LocationDetails" component={LocationDetailsScreen} />
    <Stack.Screen name="Stories" component={StoriesScreen} />
    <Stack.Screen name="StoryDetails" component={StoryDetailsScreen} />
    <Stack.Screen name="QuizPlay" component={QuizPlayScreen} />
    <Stack.Screen name="QuizResult" component={QuizResultScreen} />
  </Stack.Navigator>
);
