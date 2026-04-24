import React, {useMemo, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenShell} from '../ui/ScreenShell';
import {ScreenHeader} from '../ui/ScreenHeader';
import {AuroraButton} from '../ui/AuroraButton';
import {palette, radius, typography} from '../config/theme';
import {getQuizById} from '../data/quizzes';
import {RootStackParamList} from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'QuizPlay'>;
type Rt = RouteProp<RootStackParamList, 'QuizPlay'>;

type Review = {questionText: string; correct: boolean};

export const QuizPlayScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const quiz = getQuizById(route.params.quizId);

  const [qIndex, setQIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [review, setReview] = useState<Review[]>([]);

  const total = quiz?.questions.length ?? 0;
  const current = quiz?.questions[qIndex];

  const progress = useMemo(() => {
    if (!total) {
      return 0;
    }
    return (qIndex + (picked ? 1 : 0)) / total;
  }, [qIndex, picked, total]);

  if (!quiz || !current) {
    return (
      <ScreenShell withTabBar>
        <ScreenHeader title="Quiz" onBack={() => navigation.goBack()} />
        <Text style={typography.body}>Quiz not found.</Text>
      </ScreenShell>
    );
  }

  const onPick = (answerKey: string) => {
    if (picked) {
      return;
    }
    const ans = current.answers.find(a => a.key === answerKey);
    if (!ans) {
      return;
    }
    setPicked(answerKey);
    if (ans.correct) {
      setScore(s => s + 1);
    }
    setReview(r => [
      ...r,
      {questionText: current.text, correct: ans.correct},
    ]);
  };

  const goNext = () => {
    if (qIndex < total - 1) {
      setQIndex(i => i + 1);
      setPicked(null);
    } else {
      navigation.replace('QuizResult', {
        quizId: quiz.id,
        correctAnswers: score,
        totalQuestions: total,
        review,
      });
    }
  };

  return (
    <ScreenShell showStars edges={['top', 'bottom']}>
      <ScreenHeader
        title={`Question ${qIndex + 1} of ${total}`}
        onBack={() => navigation.goBack()}
      />
      <View style={styles.progressWrap}>
        <View style={[styles.progressFill, {width: `${progress * 100}%`}]} />
      </View>
      <View style={styles.dotsRow}>
        {quiz.questions.map((_, i) => (
          <View
            key={`d-${i}`}
            style={[
              styles.dot,
              i < qIndex && styles.dotDone,
              i === qIndex && styles.dotActive,
            ]}
          />
        ))}
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.trophy}>🏆</Text>
        <Text style={styles.question}>{current.text}</Text>
      </View>

      <View style={styles.answers}>
        {current.answers.map(a => {
          const isPicked = picked === a.key;
          const showCorrect = !!picked && a.correct;
          const showWrong = isPicked && !a.correct;
          return (
            <Pressable
              key={a.key}
              onPress={() => onPick(a.key)}
              disabled={!!picked}
              style={({pressed}) => [
                styles.answer,
                showCorrect && styles.answerCorrect,
                showWrong && styles.answerWrong,
                pressed && !picked && {opacity: 0.9},
              ]}>
              <View style={styles.answerKey}>
                <Text style={styles.answerKeyText}>{a.key}</Text>
              </View>
              <Text style={styles.answerLabel}>{a.label}</Text>
              {showCorrect ? <View style={styles.dotCorrect} /> : null}
              {showWrong ? <View style={styles.dotWrong} /> : null}
            </Pressable>
          );
        })}
      </View>

      {picked ? (
        <AuroraButton
          label={qIndex === total - 1 ? 'Finish' : 'Next Question'}
          trailing="›"
          onPress={goNext}
          style={{marginTop: 'auto'}}
        />
      ) : null}
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  progressWrap: {
    height: 4,
    backgroundColor: palette.surface,
    borderRadius: radius.pill,
    overflow: 'hidden',
    marginTop: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: palette.accent,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 8,
  },
  dot: {
    flex: 1,
    height: 3,
    borderRadius: radius.pill,
    backgroundColor: palette.border,
  },
  dotActive: {
    backgroundColor: palette.accent,
  },
  dotDone: {
    backgroundColor: palette.textMuted,
  },
  questionCard: {
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 16,
    marginTop: 20,
    gap: 10,
  },
  trophy: {
    fontSize: 22,
  },
  question: {
    ...typography.heading,
  },
  answers: {
    marginTop: 14,
    gap: 10,
  },
  answer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: palette.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 14,
  },
  answerCorrect: {
    borderColor: palette.success,
    backgroundColor: 'rgba(50, 213, 131, 0.08)',
  },
  answerWrong: {
    borderColor: palette.error,
    backgroundColor: 'rgba(241, 85, 85, 0.08)',
  },
  answerKey: {
    width: 26,
    height: 26,
    borderRadius: radius.sm,
    backgroundColor: palette.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerKeyText: {
    ...typography.caption,
    fontWeight: '800',
    color: palette.textPrimary,
  },
  answerLabel: {
    ...typography.body,
    flex: 1,
  },
  dotCorrect: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: palette.success,
  },
  dotWrong: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: palette.error,
  },
});
