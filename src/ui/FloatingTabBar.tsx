import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {palette, radius, layout} from '../config/theme';

const TAB_META: Record<string, {icon: string; label: string}> = {
  Home: {icon: '🏠', label: 'Home'},
  Explore: {icon: '🗺️', label: 'Explore'},
  Facts: {icon: '⚡', label: 'Facts'},
  Quiz: {icon: '❓', label: 'Quiz'},
  Saved: {icon: '🔖', label: 'Saved'},
};

export const FloatingTabBar: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
}) => {
  return (
    <View style={[styles.wrapper, {bottom: layout.tabBarOffset}]} pointerEvents="box-none">
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const meta = TAB_META[route.name] ?? {icon: '•', label: route.name};

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={styles.item}
              hitSlop={8}>
              <View
                style={[
                  styles.iconWrap,
                  focused && styles.iconWrapActive,
                ]}>
                <Text
                  style={[
                    styles.icon,
                    {opacity: focused ? 1 : 0.55},
                  ]}>
                  {meta.icon}
                </Text>
              </View>
              <Text
                style={[
                  styles.label,
                  {color: focused ? palette.accent : palette.textMuted},
                ]}
                numberOfLines={1}>
                {meta.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 20,
    right: 20,
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(20, 26, 58, 0.92)',
    borderRadius: radius.xxl,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: palette.borderStrong,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: {width: 0, height: 10},
    elevation: 14,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    gap: 2,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: palette.accentSoft,
    borderWidth: 1,
    borderColor: 'rgba(249, 199, 40, 0.35)',
  },
  icon: {
    fontSize: 18,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
  },
});
