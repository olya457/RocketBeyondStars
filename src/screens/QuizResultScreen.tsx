import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenShell} from '../ui/ScreenShell';
import {AuroraButton} from '../ui/AuroraButton';
import {palette, radius, typography} from '../config/theme';
import {RootStackParamList} from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'QuizResult'>;
type Rt = RouteProp<RootStackParamList, 'QuizResult'>;

export const QuizResultScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const {correctAnswers, totalQuestions, review, quizId} = route.params;
  const perfect = correctAnswers === totalQuestions;
  const title = perfect ? 'Perfect Score!' : 'Keep Learning!';
  const subtitle = perfect
    ? 'You’re a true space explorer!'
    : 'Explore more facts and try again!';

  return (
    <ScreenShell showStars edges={['top', 'bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 40}}>
        <View style={styles.top}>
          <View style={styles.badgeOuter}>
            <View style={styles.badgeInner}>
              <Text style={styles.badgeEmoji}>{perfect ? '🚀' : '🔭'}</Text>
              <Text style={styles.badgeScore}>
                {correctAnswers}/{totalQuestions}
              </Text>
            </View>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <View style={styles.reviewCard}>
          <Text style={styles.reviewLabel}>ANSWER REVIEW</Text>
          {review.map((r, i) => (
            <View key={`r-${i}`} style={styles.reviewRow}>
              <View
                style={[
                  styles.reviewDot,
                  {backgroundColor: r.correct ? palette.success : palette.error},
                ]}
              />
              <Text style={styles.reviewText} numberOfLines={1}>
                {r.questionText}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.actionsRow}>
          <AuroraButton
            label="Retry"
            leading="🔁"
            onPress={() => navigation.replace('QuizPlay', {quizId})}
            style={{flex: 1}}
          />
          <AuroraButton
            label="Go Home"
            leading="🏠"
            variant="secondary"
            onPress={() =>
              navigation.reset({index: 0, routes: [{name: 'Main'}]})
            }
            style={{flex: 1}}
          />
        </View>
      </ScrollView>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  top: {
    alignItems: 'center',
    marginTop: 30,
  },
  badgeOuter: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: palette.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: palette.accent,
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 0},
    elevation: 10,
  },
  badgeInner: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  badgeEmoji: {
    fontSize: 32,
  },
  badgeScore: {
    ...typography.title,
    fontSize: 24,
    color: palette.accent,
  },
  title: {
    ...typography.title,
    marginTop: 24,
  },
  subtitle: {
    ...typography.bodySmall,
    marginTop: 6,
    textAlign: 'center',
  },
  reviewCard: {
    marginTop: 24,
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 16,
    gap: 10,
  },
  reviewLabel: {
    ...typography.caption,
    letterSpacing: 1.2,
    color: palette.textMuted,
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reviewDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  reviewText: {
    ...typography.bodySmall,
    color: palette.textPrimary,
    flex: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
});
