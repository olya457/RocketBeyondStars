import {NavigatorScreenParams} from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Facts: undefined;
  Quiz: undefined;
  Saved: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
  Locations: undefined;
  LocationDetails: {locationId: string};
  Stories: undefined;
  StoryDetails: {storyId: string};
  QuizPlay: {quizId: string};
  QuizResult: {quizId: string; correctAnswers: number; totalQuestions: number; review: Array<{questionText: string; correct: boolean}>};
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
