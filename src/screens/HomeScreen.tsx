import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {ScreenShell} from '../ui/ScreenShell';
import {SectionTitle} from '../ui/SectionTitle';
import {MissionCard} from '../ui/MissionCard';
import {EmptyState} from '../ui/EmptyState';
import {palette, radius, typography} from '../config/theme';
import {locations} from '../data/locations';
import {useBookmarks} from '../providers/BookmarksProvider';
import {MainTabParamList, RootStackParamList} from '../navigation/types';

type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {locations: savedIds, isLocationSaved, toggleLocation} = useBookmarks();
  const featured = locations.filter(l => l.featured).slice(0, 2);
  const savedItems = locations.filter(l => savedIds.includes(l.id)).slice(0, 3);

  return (
    <ScreenShell scroll showStars withTabBar edges={['top']}>
      <View style={styles.greetingRow}>
        <View style={{flex: 1}}>
          <Text style={styles.hi}>GOOD MORNING 👋</Text>
          <Text style={styles.name}>Rocket Beyond Stars</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate('Saved')}
          style={({pressed}) => [styles.bookmarkBtn, pressed && {opacity: 0.7}]}>
          <Text style={styles.bookmarkIcon}>🔖</Text>
        </Pressable>
      </View>

      <ImageBackground
        source={require('../assets/onboarding/real_locations.png')}
        style={styles.hero}
        imageStyle={styles.heroImage}>
        <View style={styles.heroOverlay}>
          <View style={styles.explorePill}>
            <Text style={styles.explorePillText}>⭐ EXPLORE NOW</Text>
          </View>
          <View style={styles.heroRocketWrap}>
            <Image
              source={require('../assets/onboarding/explore_universe.png')}
              style={styles.heroRocket}
              resizeMode="contain"
            />
          </View>
        </View>
      </ImageBackground>

      <Text style={styles.sectionHeader}>Discover</Text>

      <Pressable
        onPress={() => navigation.navigate('Facts')}
        style={({pressed}) => [styles.randomFact, pressed && {opacity: 0.9}]}>
        <View style={styles.factIconWrap}>
          <Text style={styles.factIcon}>⚡</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.factTitle}>Random Space Fact</Text>
          <Text style={styles.factSubtitle}>Discover something new</Text>
        </View>
        <Text style={styles.factArrow}>›</Text>
      </Pressable>

      <View style={styles.tilesRow}>
        <CategoryTile
          icon="📍"
          label="Explore Locations"
          onPress={() => navigation.navigate('Locations')}
          color="#4A5AD4"
        />
        <CategoryTile
          icon="📖"
          label="Space Stories"
          onPress={() => navigation.navigate('Stories')}
          color="#7A4AD4"
        />
        <CategoryTile
          icon="❓"
          label="Quiz"
          onPress={() => navigation.navigate('Quiz')}
          color="#D47A4A"
        />
      </View>

      <SectionTitle
        title="Featured Locations"
        actionLabel="See all"
        onAction={() => navigation.navigate('Locations')}
      />
      <View style={styles.cardsRow}>
        {featured.map(item => (
          <MissionCard
            key={item.id}
            variant="tile"
            title={item.name}
            country={item.country}
            image={item.image}
            saved={isLocationSaved(item.id)}
            onToggleSave={() => toggleLocation(item.id)}
            onPress={() =>
              navigation.navigate('LocationDetails', {locationId: item.id})
            }
          />
        ))}
      </View>

      <View style={{marginTop: 24}}>
        <SectionTitle
          title="Saved Items"
          actionLabel={savedItems.length > 0 ? 'See all' : undefined}
          onAction={() => navigation.navigate('Saved')}
        />
        {savedItems.length === 0 ? (
          <EmptyState
            icon="🔖"
            title="Nothing saved yet."
            subtitle="Explore to start saving!"
          />
        ) : (
          <View style={{gap: 10}}>
            {savedItems.map(loc => (
              <MissionCard
                key={loc.id}
                variant="row"
                title={loc.name}
                subtitle="Location"
                image={loc.image}
                country={loc.country}
                saved
                onToggleSave={() => toggleLocation(loc.id)}
                onPress={() =>
                  navigation.navigate('LocationDetails', {
                    locationId: loc.id,
                  })
                }
              />
            ))}
          </View>
        )}
      </View>
    </ScreenShell>
  );
};

type TileProps = {
  icon: string;
  label: string;
  onPress: () => void;
  color: string;
};

const CategoryTile: React.FC<TileProps> = ({icon, label, onPress, color}) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [styles.tile, pressed && {opacity: 0.85}]}>
    <View style={[styles.tileIcon, {backgroundColor: color + '22'}]}>
      <Text style={styles.tileIconText}>{icon}</Text>
    </View>
    <Text style={styles.tileLabel} numberOfLines={2}>
      {label}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    marginBottom: 16,
  },
  hi: {
    ...typography.caption,
    letterSpacing: 1,
    color: palette.textSecondary,
  },
  name: {
    ...typography.display,
    marginTop: 4,
  },
  bookmarkBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.border,
  },
  bookmarkIcon: {
    fontSize: 16,
  },
  hero: {
    height: 160,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: palette.surface,
  },
  heroImage: {
    borderRadius: radius.lg,
    opacity: 0.4,
  },
  heroOverlay: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(10,14,39,0.55)',
    borderRadius: radius.lg,
  },
  explorePill: {
    alignSelf: 'flex-start',
    backgroundColor: palette.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  explorePillText: {
    fontSize: 11,
    fontWeight: '800',
    color: palette.backgroundDeep,
    letterSpacing: 0.5,
  },
  heroRocketWrap: {
    position: 'absolute',
    right: 20,
    top: 15,
    width: 120,
    height: 120,
  },
  heroRocket: {
    width: '100%',
    height: '100%',
  },
  sectionHeader: {
    ...typography.heading,
    marginBottom: 10,
  },
  randomFact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: palette.accent,
    borderRadius: radius.lg,
    padding: 14,
    marginBottom: 14,
  },
  factIconWrap: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: palette.backgroundDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  factIcon: {
    fontSize: 16,
  },
  factTitle: {
    ...typography.body,
    fontWeight: '800',
    color: palette.backgroundDeep,
  },
  factSubtitle: {
    ...typography.caption,
    color: palette.backgroundDeep,
    opacity: 0.7,
  },
  factArrow: {
    fontSize: 22,
    color: palette.backgroundDeep,
    fontWeight: '800',
  },
  tilesRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  tile: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: radius.lg,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 8,
  },
  tileIcon: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileIconText: {
    fontSize: 18,
  },
  tileLabel: {
    ...typography.bodySmall,
    textAlign: 'center',
    fontWeight: '700',
    color: palette.textPrimary,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
  },
});
