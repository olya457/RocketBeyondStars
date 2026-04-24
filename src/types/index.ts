import {ImageSourcePropType} from 'react-native';

export type SpaceLocation = {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  description: string;
  featured: boolean;
  image: ImageSourcePropType;
  emoji: string;
};

export type SpaceStory = {
  id: string;
  title: string;
  date: string;
  readTime: string;
  featured: boolean;
  image: ImageSourcePropType;
  summary: string;
  paragraphs: string[];
};

export type SpaceFact = {
  id: string;
  category: string;
  text: string;
};

export type QuizAnswer = {
  key: 'A' | 'B' | 'C';
  label: string;
  correct: boolean;
};

export type QuizQuestion = {
  id: string;
  text: string;
  answers: QuizAnswer[];
};

export type QuizSet = {
  id: string;
  title: string;
  emoji: string;
  difficulty: 1 | 2 | 3;
  questions: QuizQuestion[];
};

export type OnboardingSlide = {
  id: string;
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
};

export type SavedTab = 'locations' | 'stories' | 'facts';
