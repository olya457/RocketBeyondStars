import React from 'react';
import {
  Image,
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
import {AuroraButton} from '../ui/AuroraButton';
import {palette, radius, typography} from '../config/theme';
import {quizzes} from '../data/quizzes';
import {MainTabParamList, RootStackParamList} from '../navigation/types';

type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Quiz'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export const QuizHubScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const [activeId, setActiveId] = React.useState<string>(quizzes[0].id);
  const active = quizzes.find(q => q.id === activeId) ?? quizzes[0];

  return (
    <ScreenShell showStars scroll withTabBar edges={['top']}>
      <View style={styles.hero}>
        <Image
          source={require('../assets/onboarding/test_knowledge.png')}
          style={styles.heroIllus}
          resizeMode="contain"
        />
        <Text style={styles.title}>Test Your Space Knowledge</Text>
        <Text style={styles.subtitle}>
          Answer 5 questions about space. How well do you know the cosmos?
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.metaBox}>
            <Text style={styles.metaValue}>{active.questions.length}</Text>
            <Text style={styles.metaLabel}>Questions</Text>
          </View>
          <View style={styles.metaSep} />
          <View style={styles.metaBox}>
            <Text style={styles.metaValue}>⏱</Text>
            <Text style={styles.metaLabel}>Time</Text>
          </View>
          <View style={styles.metaSep} />
          <View style={styles.metaBox}>
            <Text style={styles.metaValue}>
              {'⭐'.repeat(active.difficulty)}
            </Text>
            <Text style={styles.metaLabel}>Difficulty</Text>
          </View>
        </View>
      </View>

      <Text style={styles.pickLabel}>CHOOSE A QUIZ</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.quizPicker}>
        {quizzes.map(q => {
          const isActive = q.id === activeId;
          return (
            <Pressable
              key={q.id}
              onPress={() => setActiveId(q.id)}
              style={({pressed}) => [
                styles.quizChip,
                isActive && styles.quizChipActive,
                pressed && {opacity: 0.85},
              ]}>
              <Text style={styles.quizChipEmoji}>{q.emoji}</Text>
              <Text
                style={[
                  styles.quizChipLabel,
                  isActive && styles.quizChipLabelActive,
                ]}
                numberOfLines={2}>
                {q.title}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <AuroraButton
        label="Start Quiz"
        leading="⚡"
        onPress={() =>
          navigation.navigate('QuizPlay', {quizId: active.id})
        }
        style={{marginTop: 20}}
      />
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  heroIllus: {
    width: 160,
    height: 160,
  },
  title: {
    ...typography.title,
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    ...typography.bodySmall,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 14,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 20,
    backgroundColor: palette.surface,
    padding: 10,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.border,
  },
  metaBox: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  metaValue: {
    ...typography.body,
    fontWeight: '800',
    color: palette.textPrimary,
  },
  metaLabel: {
    ...typography.caption,
    marginTop: 2,
  },
  metaSep: {
    width: 1,
    height: 28,
    backgroundColor: palette.border,
  },
  pickLabel: {
    ...typography.caption,
    letterSpacing: 1.2,
    marginTop: 30,
    marginBottom: 10,
  },
  quizPicker: {
    gap: 10,
    paddingVertical: 4,
  },
  quizChip: {
    width: 130,
    padding: 12,
    borderRadius: radius.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    gap: 6,
  },
  quizChipActive: {
    borderColor: palette.accent,
    backgroundColor: palette.accentSoft,
  },
  quizChipEmoji: {
    fontSize: 22,
  },
  quizChipLabel: {
    ...typography.caption,
    color: palette.textPrimary,
    textAlign: 'center',
    fontWeight: '700',
  },
  quizChipLabelActive: {
    color: palette.accent,
  },
});
