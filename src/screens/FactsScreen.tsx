import React, {useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  Share,
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
import {AuroraButton} from '../ui/AuroraButton';
import {palette, radius, typography} from '../config/theme';
import {facts} from '../data/facts';
import {useBookmarks} from '../providers/BookmarksProvider';
import {MainTabParamList, RootStackParamList} from '../navigation/types';

type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Facts'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export const FactsScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {isFactSaved, toggleFact} = useBookmarks();

  const [index, setIndex] = useState(0);
  const fact = facts[index];
  const saved = isFactSaved(fact.id);

  const next = () => {
    let newIdx = index;
    while (newIdx === index && facts.length > 1) {
      newIdx = Math.floor(Math.random() * facts.length);
    }
    setIndex(newIdx);
  };

  const share = async () => {
    try {
      await Share.share({message: `🌌 Space Fact: ${fact.text}`});
    } catch {
      Alert.alert('Unable to share');
    }
  };

  return (
    <ScreenShell scroll showStars withTabBar edges={['top']}>
      <ScreenHeader title="Space Facts" onBack={() => navigation.goBack()} />

      <View style={styles.factCard}>
        <View style={styles.tagRow}>
          <Text style={styles.tag}>{fact.category.toUpperCase()}</Text>
        </View>
        <View style={styles.factBody}>
          <Image
            source={require('../assets/onboarding/explore_universe.png')}
            style={styles.factIllus}
            resizeMode="contain"
          />
          <Text style={styles.factText}>{fact.text}</Text>
        </View>
      </View>

      <AuroraButton
        label="New Fact"
        leading="🔁"
        onPress={next}
        style={{marginTop: 16}}
      />

      <View style={styles.subActions}>
        <Pressable
          onPress={() => toggleFact(fact.id)}
          style={({pressed}) => [
            styles.subBtn,
            saved && styles.subBtnActive,
            pressed && {opacity: 0.85},
          ]}>
          <Text style={[styles.subBtnIcon, saved && styles.subBtnIconActive]}>
            {saved ? '🔖' : '🤍'}
          </Text>
          <Text style={[styles.subBtnText, saved && styles.subBtnTextActive]}>
            {saved ? 'Saved!' : 'Save'}
          </Text>
        </Pressable>
        <Pressable
          onPress={share}
          style={({pressed}) => [styles.subBtn, pressed && {opacity: 0.85}]}>
          <Text style={styles.subBtnIcon}>📤</Text>
          <Text style={styles.subBtnText}>Share</Text>
        </Pressable>
      </View>

      <Text style={styles.counter}>
        {facts.length} facts in the universe 🌠
      </Text>

      <Pressable
        onPress={() => navigation.navigate('Stories')}
        style={({pressed}) => [styles.storiesBtn, pressed && {opacity: 0.9}]}>
        <Text style={styles.storiesIcon}>📖</Text>
        <Text style={styles.storiesLabel}>Space Stories</Text>
      </Pressable>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  factCard: {
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 16,
    marginTop: 8,
    minHeight: 220,
  },
  tagRow: {
    flexDirection: 'row',
  },
  tag: {
    ...typography.caption,
    color: palette.accent,
    letterSpacing: 1,
    fontWeight: '700',
    backgroundColor: palette.accentSoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  factBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 16,
  },
  factIllus: {
    width: 66,
    height: 80,
  },
  factText: {
    ...typography.heading,
    flex: 1,
  },
  subActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  subBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: palette.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.border,
    paddingVertical: 14,
  },
  subBtnActive: {
    backgroundColor: palette.accentSoft,
    borderColor: palette.accent,
  },
  subBtnIcon: {
    fontSize: 14,
  },
  subBtnIconActive: {},
  subBtnText: {
    ...typography.bodySmall,
    color: palette.textPrimary,
    fontWeight: '600',
  },
  subBtnTextActive: {
    color: palette.accent,
  },
  counter: {
    ...typography.caption,
    textAlign: 'center',
    marginTop: 18,
    color: palette.textSecondary,
  },
  storiesBtn: {
    marginTop: 20,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.surface,
    paddingVertical: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  storiesIcon: {
    fontSize: 18,
  },
  storiesLabel: {
    ...typography.body,
    fontWeight: '700',
  },
});
