import {OnboardingSlide} from '../types';

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 'slide-1',
    title: 'Explore the Universe',
    subtitle: 'Discover amazing space facts and places',
    image: require('../assets/onboarding/explore_universe.png'),
  },
  {
    id: 'slide-2',
    title: 'Real Space Locations',
    subtitle: 'Visit space centers, observatories & museums',
    image: require('../assets/onboarding/real_locations.png'),
  },
  {
    id: 'slide-3',
    title: 'Test Your Knowledge',
    subtitle: 'Play quick quizzes and learn faster',
    image: require('../assets/onboarding/test_knowledge.png'),
  },
  {
    id: 'slide-4',
    title: 'Start Your Journey',
    subtitle: 'Save stories, explore maps, discover more',
    image: require('../assets/onboarding/start_journey.png'),
  },
];
