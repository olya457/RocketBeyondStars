import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import {AppProviders} from './src/providers/AppProviders';
import {RootNavigator} from './src/navigation/RootNavigator';
import {palette} from './src/config/theme';

const navTheme = {
  dark: true,
  colors: {
    primary: palette.accent,
    background: palette.background,
    card: palette.background,
    text: palette.textPrimary,
    border: palette.border,
    notification: palette.accent,
  },
  fonts: {
    regular: {fontFamily: 'System', fontWeight: '400' as const},
    medium: {fontFamily: 'System', fontWeight: '500' as const},
    bold: {fontFamily: 'System', fontWeight: '700' as const},
    heavy: {fontFamily: 'System', fontWeight: '900' as const},
  },
};

const App: React.FC = () => (
  <GestureHandlerRootView style={{flex: 1, backgroundColor: palette.background}}>
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={palette.background} />
      <AppProviders>
        <NavigationContainer theme={navTheme}>
          <RootNavigator />
        </NavigationContainer>
      </AppProviders>
    </SafeAreaProvider>
  </GestureHandlerRootView>
);

export default App;
