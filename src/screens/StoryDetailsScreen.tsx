import React from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenShell} from '../ui/ScreenShell';
import {ScreenHeader} from '../ui/ScreenHeader';
import {BookmarkToggle} from '../ui/BookmarkToggle';
import {palette, radius, typography} from '../config/theme';
import {getStoryById} from '../data/stories';
import {useBookmarks} from '../providers/BookmarksProvider';
import {RootStackParamList} from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'StoryDetails'>;
type Rt = RouteProp<RootStackParamList, 'StoryDetails'>;

export const StoryDetailsScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const story = getStoryById(route.params.storyId);
  const {isStorySaved, toggleStory} = useBookmarks();

  if (!story) {
    return (
      <ScreenShell withTabBar>
        <ScreenHeader title="Not found" onBack={() => navigation.goBack()} />
        <Text style={typography.body}>Story not found.</Text>
      </ScreenShell>
    );
  }

  const saved = isStorySaved(story.id);

  const share = async () => {
    try {
      await Share.share({
        message: `${story.title}\n\n${story.summary}`,
      });
    } catch {
      Alert.alert('Unable to share');
    }
  };

  return (
    <View style={styles.root}>
      <Image source={story.image} style={styles.hero} resizeMode="cover" />
      <View style={styles.overlay} />
      <ScreenShell transparent showStars={false} withTabBar edges={['top']}>
        <ScreenHeader
          title=""
          onBack={() => navigation.goBack()}
          right={
            <View style={styles.actionsRow}>
              <Pressable
                onPress={share}
                style={({pressed}) => [
                  styles.actionBtn,
                  pressed && {opacity: 0.8},
                ]}>
                <Text style={styles.actionIcon}>📤</Text>
              </Pressable>
              <BookmarkToggle
                size="sm"
                active={saved}
                onPress={() => toggleStory(story.id)}
              />
            </View>
          }
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.body}>
          <View style={{height: 180}} />
          <View style={styles.card}>
            <Text style={styles.title}>{story.title}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.meta}>⏱ {story.readTime}</Text>
              <Text style={styles.metaSep}>·</Text>
              <Text style={styles.meta}>{story.date}</Text>
            </View>
            {story.paragraphs.map((p, i) => (
              <Text key={`p-${i}`} style={styles.paragraph}>
                {p}
              </Text>
            ))}
          </View>
        </ScrollView>
      </ScreenShell>
    </View>
  );
};

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
    height: 300,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: 'rgba(10,14,39,0.35)',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: radius.md,
    backgroundColor: palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.border,
  },
  actionIcon: {
    fontSize: 13,
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
  },
  title: {
    ...typography.title,
    fontSize: 26,
    lineHeight: 32,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
    marginBottom: 10,
  },
  meta: {
    ...typography.bodySmall,
    color: palette.textSecondary,
  },
  metaSep: {
    color: palette.textMuted,
  },
  paragraph: {
    ...typography.body,
    color: palette.textSecondary,
    lineHeight: 22,
  },
});
