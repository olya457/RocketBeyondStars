import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {ScreenShell} from '../ui/ScreenShell';
import {ScreenHeader} from '../ui/ScreenHeader';
import {Chip} from '../ui/Chip';
import {MissionCard} from '../ui/MissionCard';
import {StoryRow} from '../ui/StoryRow';
import {EmptyState} from '../ui/EmptyState';
import {palette, radius, typography} from '../config/theme';
import {locations} from '../data/locations';
import {stories} from '../data/stories';
import {facts} from '../data/facts';
import {useBookmarks} from '../providers/BookmarksProvider';
import {SavedTab} from '../types';
import {MainTabParamList, RootStackParamList} from '../navigation/types';

type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Saved'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export const BookmarksScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {
    locations: savedLocations,
    stories: savedStories,
    facts: savedFacts,
    toggleLocation,
    toggleStory,
    toggleFact,
  } = useBookmarks();
  const [tab, setTab] = useState<SavedTab>('locations');

  const total = savedLocations.length + savedStories.length + savedFacts.length;

  const locationItems = locations.filter(l => savedLocations.includes(l.id));
  const storyItems = stories.filter(s => savedStories.includes(s.id));
  const factItems = facts.filter(f => savedFacts.includes(f.id));

  return (
    <ScreenShell showStars withTabBar edges={['top']}>
      <ScreenHeader
        title="Saved Items"
        subtitle={`${total} total items`}
      />
      <View style={styles.tabs}>
        <Chip
          icon="📍"
          label="Locations"
          active={tab === 'locations'}
          counter={savedLocations.length}
          onPress={() => setTab('locations')}
          style={{flex: 1}}
        />
        <Chip
          icon="📖"
          label="Stories"
          active={tab === 'stories'}
          counter={savedStories.length}
          onPress={() => setTab('stories')}
          style={{flex: 1}}
        />
        <Chip
          icon="⚡"
          label="Facts"
          active={tab === 'facts'}
          counter={savedFacts.length}
          onPress={() => setTab('facts')}
          style={{flex: 1}}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap: 10, paddingBottom: 20}}>
        {tab === 'locations' ? (
          locationItems.length === 0 ? (
            <EmptyState
              icon="📍"
              title="No saved locations yet"
              subtitle="Explore the app to start saving!"
            />
          ) : (
            locationItems.map(loc => (
              <MissionCard
                key={loc.id}
                variant="row"
                image={loc.image}
                title={loc.name}
                country={loc.country}
                subtitle={loc.description.split('.')[0]}
                saved
                onToggleSave={() => toggleLocation(loc.id)}
                onPress={() =>
                  navigation.navigate('LocationDetails', {
                    locationId: loc.id,
                  })
                }
              />
            ))
          )
        ) : null}

        {tab === 'stories' ? (
          storyItems.length === 0 ? (
            <EmptyState
              icon="📖"
              title="No saved stories yet"
              subtitle="Explore the app to start saving!"
            />
          ) : (
            storyItems.map(story => (
              <StoryRow
                key={story.id}
                image={story.image}
                title={story.title}
                summary={story.summary}
                readTime={story.readTime}
                onPress={() =>
                  navigation.navigate('StoryDetails', {storyId: story.id})
                }
              />
            ))
          )
        ) : null}

        {tab === 'facts' ? (
          factItems.length === 0 ? (
            <EmptyState
              icon="⚡"
              title="No saved facts yet"
              subtitle="Explore the app to start saving!"
            />
          ) : (
            factItems.map(fact => (
              <Pressable
                key={fact.id}
                onPress={() => toggleFact(fact.id)}
                style={({pressed}) => [
                  styles.factCard,
                  pressed && {opacity: 0.9},
                ]}>
                <View style={styles.factTagRow}>
                  <Text style={styles.factTag}>
                    {fact.category.toUpperCase()}
                  </Text>
                  <Text style={styles.bookmarkIcon}>🔖</Text>
                </View>
                <Text style={styles.factText}>{fact.text}</Text>
              </Pressable>
            ))
          )
        ) : null}
      </ScrollView>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  factCard: {
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 14,
    gap: 8,
  },
  factTagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  factTag: {
    ...typography.caption,
    color: palette.accent,
    letterSpacing: 1,
    fontWeight: '700',
    backgroundColor: palette.accentSoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  bookmarkIcon: {
    fontSize: 14,
  },
  factText: {
    ...typography.body,
  },
});
