import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
  ScrollView,
} from 'react-native';
import {SafeAreaView, Edge} from 'react-native-safe-area-context';
import {palette, layout} from '../config/theme';
import {StarryBackdrop} from './StarryBackdrop';

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  showStars?: boolean;
  edges?: Edge[];
  withTabBar?: boolean;
  contentStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  paddingHorizontal?: number;
  transparent?: boolean;
};

export const ScreenShell: React.FC<Props> = ({
  children,
  scroll = false,
  showStars = true,
  edges = ['top'],
  withTabBar = false,
  contentStyle,
  contentContainerStyle,
  paddingHorizontal = layout.screenPadding,
  transparent = false,
}) => {
  const bottomPadding = withTabBar ? layout.tabBarHeight + layout.tabBarOffset + 24 : 24;

  const innerStyle = [
    {paddingHorizontal, paddingBottom: bottomPadding},
    contentContainerStyle,
  ];

  return (
    <View style={[styles.root, transparent && styles.transparent]}>
      <StatusBar barStyle="light-content" backgroundColor={palette.background} />
      {showStars ? <StarryBackdrop density={60} /> : null}
      <SafeAreaView style={styles.safe} edges={edges}>
        {scroll ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={innerStyle}
            style={contentStyle}>
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.flex, innerStyle, contentStyle]}>{children}</View>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.background,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  safe: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
});
