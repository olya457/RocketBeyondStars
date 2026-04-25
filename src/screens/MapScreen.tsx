import React, {useRef, useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import MapView, {Marker, Region} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {ScreenShell} from '../ui/ScreenShell';
import {ScreenHeader} from '../ui/ScreenHeader';
import {AuroraButton} from '../ui/AuroraButton';
import {palette, radius, typography} from '../config/theme';
import {locations} from '../data/locations';
import {MainTabParamList, RootStackParamList} from '../navigation/types';

type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Explore'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const IS_IOS = Platform.OS === 'ios';

const INITIAL_REGION: Region = {
  latitude: 20,
  longitude: 0,
  latitudeDelta: 120,
  longitudeDelta: 120,
};

const {height: SCREEN_H} = Dimensions.get('window');
const MAP_HEIGHT = Math.max(320, Math.round(SCREEN_H * 0.55));

const projectLat = (lat: number) => ((90 - lat) / 180) * 0.7 + 0.12;
const projectLng = (lng: number) => (lng + 180) / 360;

export const MapScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const mapRef = useRef<MapView>(null);
  const regionRef = useRef<Region>(INITIAL_REGION);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = locations.find(l => l.id === selectedId) ?? null;

  const clampDelta = (v: number) => Math.min(160, Math.max(0.01, v));

  const animateTo = (next: Region) => {
    regionRef.current = next;
    if (IS_IOS) {
      mapRef.current?.animateToRegion(next, 300);
    }
  };

  const pickRandom = () => {
    const random = locations[Math.floor(Math.random() * locations.length)];
    setSelectedId(random.id);
    animateTo({
      latitude: random.latitude,
      longitude: random.longitude,
      latitudeDelta: 12,
      longitudeDelta: 12,
    });
  };

  const zoomIn = () => {
    const r = regionRef.current;
    animateTo({
      ...r,
      latitudeDelta: clampDelta(r.latitudeDelta / 2),
      longitudeDelta: clampDelta(r.longitudeDelta / 2),
    });
  };

  const zoomOut = () => {
    const r = regionRef.current;
    animateTo({
      ...r,
      latitudeDelta: clampDelta(r.latitudeDelta * 2),
      longitudeDelta: clampDelta(r.longitudeDelta * 2),
    });
  };

  const resetView = () => {
    setSelectedId(null);
    animateTo(INITIAL_REGION);
  };

  return (
    <ScreenShell showStars={false} withTabBar edges={['top']}>
      <ScreenHeader title="Space Map" onBack={() => navigation.goBack()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={[styles.mapWrap, {height: MAP_HEIGHT}]}>
          {IS_IOS ? (
            <MapView
              ref={mapRef}
              style={StyleSheet.absoluteFillObject}
              initialRegion={INITIAL_REGION}
              onRegionChangeComplete={region => {
                regionRef.current = region;
              }}
              showsPointsOfInterest={false}
              showsBuildings={false}
              showsTraffic={false}
              mapType="mutedStandard">
              {locations.map(loc => (
                <Marker
                  key={loc.id}
                  coordinate={{
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                  }}
                  onPress={() => setSelectedId(loc.id)}>
                  <View
                    style={[
                      styles.markerWrap,
                      selectedId === loc.id && styles.markerWrapActive,
                    ]}>
                    <Text style={styles.markerEmoji}>{loc.emoji}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          ) : (
            <View style={styles.flatMapBg}>
              {Array.from({length: 6}).map((_, i) => (
                <View
                  key={`h-${i}`}
                  style={[
                    styles.gridLineH,
                    {top: `${((i + 1) * 100) / 7}%`},
                  ]}
                />
              ))}
              {Array.from({length: 9}).map((_, i) => (
                <View
                  key={`v-${i}`}
                  style={[
                    styles.gridLineV,
                    {left: `${((i + 1) * 100) / 10}%`},
                  ]}
                />
              ))}
              {locations.map(loc => {
                const left = projectLng(loc.longitude) * 100;
                const top = projectLat(loc.latitude) * 100;
                const isActive = selectedId === loc.id;
                return (
                  <Pressable
                    key={loc.id}
                    onPress={() => setSelectedId(loc.id)}
                    hitSlop={8}
                    style={[
                      styles.flatPin,
                      {left: `${left}%`, top: `${top}%`},
                      isActive && styles.flatPinActive,
                    ]}>
                    <Text style={styles.markerEmoji}>{loc.emoji}</Text>
                  </Pressable>
                );
              })}
            </View>
          )}

          {IS_IOS ? (
            <View style={styles.controls} pointerEvents="box-none">
              <Pressable
                onPress={zoomIn}
                hitSlop={8}
                style={({pressed}) => [
                  styles.controlBtn,
                  pressed && styles.controlBtnPressed,
                ]}>
                <Text style={styles.controlIcon}>＋</Text>
              </Pressable>
              <Pressable
                onPress={zoomOut}
                hitSlop={8}
                style={({pressed}) => [
                  styles.controlBtn,
                  pressed && styles.controlBtnPressed,
                ]}>
                <Text style={styles.controlIcon}>−</Text>
              </Pressable>
              <Pressable
                onPress={resetView}
                hitSlop={8}
                style={({pressed}) => [
                  styles.controlBtn,
                  pressed && styles.controlBtnPressed,
                ]}>
                <Text style={styles.controlIconSmall}>🧭</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.controls} pointerEvents="box-none">
              <Pressable
                onPress={resetView}
                hitSlop={8}
                style={({pressed}) => [
                  styles.controlBtn,
                  pressed && styles.controlBtnPressed,
                ]}>
                <Text style={styles.controlIconSmall}>🧭</Text>
              </Pressable>
            </View>
          )}
        </View>

        <View style={styles.randomRow}>
          <AuroraButton
            label="Random Location"
            leading="🔀"
            onPress={pickRandom}
          />
        </View>

        {selected ? (
          <Pressable
            onPress={() =>
              navigation.navigate('LocationDetails', {
                locationId: selected.id,
              })
            }
            style={({pressed}) => [
              styles.previewCard,
              pressed && {opacity: 0.9},
            ]}>
            <Image source={selected.image} style={styles.previewImg} />
            <View style={{flex: 1}}>
              <View style={styles.previewTop}>
                <Text style={styles.previewTitle} numberOfLines={1}>
                  {selected.name}
                </Text>
                <Pressable
                  onPress={e => {
                    e.stopPropagation();
                    setSelectedId(null);
                  }}
                  hitSlop={8}>
                  <Text style={styles.close}>✕</Text>
                </Pressable>
              </View>
              <Text style={styles.previewSubtitle} numberOfLines={2}>
                {selected.description.split('.')[0]}
              </Text>
              <View style={styles.previewMeta}>
                <Text style={styles.previewPin}>📍</Text>
                <Text style={styles.previewCountry}>{selected.country}</Text>
              </View>
            </View>
          </Pressable>
        ) : (
          <View style={styles.hintBox}>
            <Text style={styles.hintIcon}>📍</Text>
            <Text style={styles.hintText}>
              Tap a marker to explore a location
            </Text>
          </View>
        )}
      </ScrollView>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
    gap: 12,
  },
  mapWrap: {
    marginTop: 8,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.surfaceSoft,
  },
  flatMapBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0E1230',
    overflow: 'hidden',
  },
  gridLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(160, 180, 240, 0.08)',
  },
  gridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(160, 180, 240, 0.08)',
  },
  flatPin: {
    position: 'absolute',
    width: 32,
    height: 32,
    marginLeft: -16,
    marginTop: -16,
    borderRadius: 16,
    backgroundColor: palette.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: palette.backgroundDeep,
  },
  flatPinActive: {
    width: 40,
    height: 40,
    marginLeft: -20,
    marginTop: -20,
    shadowColor: palette.accent,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 0},
    elevation: 10,
  },
  markerWrap: {
    width: 30,
    height: 30,
    borderRadius: radius.pill,
    backgroundColor: palette.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: palette.backgroundDeep,
  },
  markerWrapActive: {
    width: 38,
    height: 38,
    shadowColor: palette.accent,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 0},
    elevation: 10,
  },
  markerEmoji: {
    fontSize: 14,
  },
  controls: {
    position: 'absolute',
    right: 12,
    top: 12,
    gap: 8,
  },
  controlBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: 'rgba(10, 14, 39, 0.85)',
    borderWidth: 1,
    borderColor: palette.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 3},
    elevation: 5,
  },
  controlBtnPressed: {
    opacity: 0.75,
    transform: [{scale: 0.95}],
  },
  controlIcon: {
    color: palette.accent,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 24,
    includeFontPadding: false,
  },
  controlIconSmall: {
    fontSize: 18,
  },
  randomRow: {},
  previewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: palette.surface,
    padding: 12,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
  },
  previewImg: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    resizeMode: 'cover',
  },
  previewTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  previewTitle: {
    ...typography.body,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  close: {
    color: palette.textMuted,
    fontSize: 16,
    padding: 2,
  },
  previewSubtitle: {
    ...typography.bodySmall,
    marginTop: 2,
  },
  previewMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  previewPin: {
    fontSize: 11,
  },
  previewCountry: {
    ...typography.caption,
    color: palette.success,
  },
  hintBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: palette.surface,
    padding: 14,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
  },
  hintIcon: {
    fontSize: 14,
  },
  hintText: {
    ...typography.bodySmall,
  },
});
