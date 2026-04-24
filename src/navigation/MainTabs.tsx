import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/HomeScreen';
import {MapScreen} from '../screens/MapScreen';
import {FactsScreen} from '../screens/FactsScreen';
import {QuizHubScreen} from '../screens/QuizHubScreen';
import {BookmarksScreen} from '../screens/BookmarksScreen';
import {FloatingTabBar} from '../ui/FloatingTabBar';
import {MainTabParamList} from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabs: React.FC = () => (
  <Tab.Navigator
    screenOptions={{headerShown: false}}
    tabBar={props => <FloatingTabBar {...props} />}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Explore" component={MapScreen} />
    <Tab.Screen name="Facts" component={FactsScreen} />
    <Tab.Screen name="Quiz" component={QuizHubScreen} />
    <Tab.Screen name="Saved" component={BookmarksScreen} />
  </Tab.Navigator>
);
