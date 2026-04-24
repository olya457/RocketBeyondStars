import React from 'react';
import {
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenShell} from '../ui/ScreenShell';
import {ScreenHeader} from '../ui/ScreenHeader';
import {AuroraButton} from '../ui/AuroraButton';
import {BookmarkToggle} from '../ui/BookmarkToggle';
import {palette, radius, typography} from '../config/theme';
import {getLocationById} from '../data/locations';
import {useBookmarks} from '../providers/BookmarksProvider';
import {RootStackParamList} from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'LocationDetails'>;
type Rt = RouteProp<RootStackParamList, 'LocationDetails'>;

export const LocationDetailsScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const location = getLocationById(route.params.locationId);
  const {isLocationSaved, toggleLocation} = useBookmarks();

  if (!location) {
    return (
      <ScreenShell withTabBar>
        <ScreenHeader title="Not found" onBack={() => navigation.goBack()} />
        <Text style={typography.body}>Location not found.</Text>
      </ScreenShell>
    );
  }

  const openMap = async () => {
    const {latitude, longitude, name} = location;
    const label = encodeURIComponent(name);
    const geo = Platform.select({
      ios: `maps:0,0?q=${label}@${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}(${label})`,
    });
    const web = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    try {
      const canOpen = geo ? await Linking.canOpenURL(geo) : false;
      await Linking.openURL(canOpen && geo ? geo : web);
    } catch {
      Alert.alert('Unable to open map');
    }
  };

  const saved = isLocationSaved(location.id);

  return (
    <View style={styles.root}>
      <Image source={location.image} style={styles.hero} resizeMode="cover" />
      <View style={styles.overlay} />
      <ScreenShell transparent showStars={false} withTabBar edges={['top']}>
        <ScreenHeader title="" onBack={() => navigation.goBack()} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.body}>
          <View style={{height: 160}} />
          <View style={styles.card}>
            <Text style={styles.title}>{location.name}</Text>
            <View style={styles.countryRow}>
              <Text style={styles.pin}>📍</Text>
              <Text style={styles.country}>{location.country}</Text>
            </View>
            <Text style={styles.description}>{location.description}</Text>

            <View style={styles.coordBox}>
              <View style={styles.coordHeader}>
                <Text style={styles.coordEmoji}>🧭</Text>
                <Text style={styles.coordLabel}>COORDINATES</Text>
              </View>
              <View style={styles.coordValues}>
                <View style={styles.coordItem}>
                  <Text style={styles.coordKey}>LATITUDE</Text>
                  <Text style={styles.coordVal}>
                    {formatLat(location.latitude)}
                  </Text>
                </View>
                <View style={styles.coordItem}>
                  <Text style={styles.coordKey}>LONGITUDE</Text>
                  <Text style={styles.coordVal}>
                    {formatLon(location.longitude)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.actionsRow}>
              <AuroraButton
                label="Open on Map"
                leading="🗺️"
                style={{flex: 1}}
                onPress={openMap}
              />
              <BookmarkToggle
                active={saved}
                size="lg"
                onPress={() => toggleLocation(location.id)}
              />
            </View>
          </View>
        </ScrollView>
      </ScreenShell>
    </View>
  );
};

const formatLat = (v: number) => `${Math.abs(v).toFixed(4)}° ${v >= 0 ? 'N' : 'S'}`;
const formatLon = (v: number) => `${Math.abs(v).toFixed(4)}° ${v >= 0 ? 'E' : 'W'}`;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.background,
  },
  hero: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 320,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 320,
    backgroundColor: 'rgba(10,14,39,0.35)',
  },
  body: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: palette.background,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    padding: 20,
    gap: 10,
    marginTop: 0,
  },
  title: {
    ...typography.display,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pin: {
    fontSize: 12,
  },
  country: {
    ...typography.bodySmall,
    color: palette.success,
    fontWeight: '600',
  },
  description: {
    ...typography.body,
    color: palette.textSecondary,
    marginTop: 4,
  },
  coordBox: {
    marginTop: 12,
    padding: 16,
    borderRadius: radius.lg,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
  },
  coordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  coordEmoji: {
    fontSize: 14,
  },
  coordLabel: {
    ...typography.caption,
    color: palette.accent,
    letterSpacing: 1,
    fontWeight: '700',
  },
  coordValues: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 24,
  },
  coordItem: {
    flex: 1,
  },
  coordKey: {
    ...typography.caption,
    color: palette.textMuted,
    letterSpacing: 1,
  },
  coordVal: {
    ...typography.body,
    fontWeight: '700',
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 18,
  },
});
