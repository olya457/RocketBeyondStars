import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenShell} from '../ui/ScreenShell';
import {ScreenHeader} from '../ui/ScreenHeader';
import {StoryRow} from '../ui/StoryRow';
import {palette, radius, typography} from '../config/theme';
import {stories} from '../data/stories';
import {RootStackParamList} from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Stories'>;

export const StoriesScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const featured = stories.find(s => s.featured) ?? stories[0];
  const rest = stories.filter(s => s.id !== featured.id);

  return (
    <ScreenShell showStars withTabBar edges={['top']}>
      <ScreenHeader
        title="Space Stories"
        subtitle={`${stories.length} stories to explore`}
        onBack={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap: 12, paddingBottom: 20}}>
        <Pressable
          onPress={() =>
            navigation.navigate('StoryDetails', {storyId: featured.id})
          }
          style={({pressed}) => [pressed && {opacity: 0.9}]}>
          <ImageBackground
            source={featured.image}
            style={styles.featured}
            imageStyle={styles.featuredImg}>
            <View style={styles.featuredOverlay}>
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>FEATURED</Text>
              </View>
              <View style={styles.featuredBody}>
                <Text style={styles.featuredTitle}>{featured.title}</Text>
                <Text style={styles.featuredMeta}>
                  ⏱ {featured.readTime} · {featured.date}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </Pressable>

        <Text style={styles.sectionLabel}>ALL STORIES</Text>

        {rest.map(story => (
          <StoryRow
            key={story.id}
            title={story.title}
            summary={story.summary}
            readTime={story.readTime}
            image={story.image}
            onPress={() =>
              navigation.navigate('StoryDetails', {storyId: story.id})
            }
          />
        ))}
      </ScrollView>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  featured: {
    height: 180,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: palette.surface,
  },
  featuredImg: {
    borderRadius: radius.lg,
  },
  featuredOverlay: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(6,9,33,0.35)',
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    backgroundColor: palette.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  featuredBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: palette.backgroundDeep,
    letterSpacing: 1,
  },
  featuredBody: {
    backgroundColor: 'rgba(6,9,33,0.55)',
    padding: 10,
    borderRadius: radius.md,
  },
  featuredTitle: {
    ...typography.heading,
  },
  featuredMeta: {
    ...typography.caption,
    color: palette.textSecondary,
    marginTop: 4,
  },
  sectionLabel: {
    ...typography.caption,
    letterSpacing: 1.2,
    color: palette.textMuted,
    marginTop: 8,
  },
});
