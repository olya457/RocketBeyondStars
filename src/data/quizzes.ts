import {QuizSet} from '../types';

export const quizzes: QuizSet[] = [
  {
    id: 'quiz-space-knowledge',
    title: 'Test Your Space Knowledge',
    emoji: '🚀',
    difficulty: 2,
    questions: [
      {
        id: 'q1-1',
        text: 'Who was the first human in space?',
        answers: [
          {key: 'A', label: 'Neil Armstrong', correct: false},
          {key: 'B', label: 'Yuri Gagarin', correct: true},
          {key: 'C', label: 'Buzz Aldrin', correct: false},
        ],
      },
      {
        id: 'q1-2',
        text: 'Which planet is known as the Red Planet?',
        answers: [
          {key: 'A', label: 'Venus', correct: false},
          {key: 'B', label: 'Mars', correct: true},
          {key: 'C', label: 'Jupiter', correct: false},
        ],
      },
      {
        id: 'q1-3',
        text: 'What is the name of our galaxy?',
        answers: [
          {key: 'A', label: 'Andromeda', correct: false},
          {key: 'B', label: 'Milky Way', correct: true},
          {key: 'C', label: 'Orion', correct: false},
        ],
      },
      {
        id: 'q1-4',
        text: 'What does NASA stand for?',
        answers: [
          {key: 'A', label: 'National Air and Space Agency', correct: false},
          {key: 'B', label: 'National Aeronautics and Space Administration', correct: true},
          {key: 'C', label: 'North American Space Association', correct: false},
        ],
      },
      {
        id: 'q1-5',
        text: 'What was the first mission to land humans on the Moon?',
        answers: [
          {key: 'A', label: 'Apollo 10', correct: false},
          {key: 'B', label: 'Apollo 11', correct: true},
          {key: 'C', label: 'Apollo 12', correct: false},
        ],
      },
    ],
  },
  {
    id: 'quiz-solar-system',
    title: 'Solar System Basics',
    emoji: '🪐',
    difficulty: 1,
    questions: [
      {
        id: 'q2-1',
        text: 'Which planet is the largest in our Solar System?',
        answers: [
          {key: 'A', label: 'Saturn', correct: false},
          {key: 'B', label: 'Jupiter', correct: true},
          {key: 'C', label: 'Neptune', correct: false},
        ],
      },
      {
        id: 'q2-2',
        text: 'How many planets are in the Solar System?',
        answers: [
          {key: 'A', label: '7', correct: false},
          {key: 'B', label: '8', correct: true},
          {key: 'C', label: '9', correct: false},
        ],
      },
      {
        id: 'q2-3',
        text: 'Which planet is closest to the Sun?',
        answers: [
          {key: 'A', label: 'Mercury', correct: true},
          {key: 'B', label: 'Venus', correct: false},
          {key: 'C', label: 'Earth', correct: false},
        ],
      },
      {
        id: 'q2-4',
        text: 'Which planet has the most famous rings?',
        answers: [
          {key: 'A', label: 'Uranus', correct: false},
          {key: 'B', label: 'Saturn', correct: true},
          {key: 'C', label: 'Neptune', correct: false},
        ],
      },
      {
        id: 'q2-5',
        text: 'What is the hottest planet in the Solar System?',
        answers: [
          {key: 'A', label: 'Mercury', correct: false},
          {key: 'B', label: 'Venus', correct: true},
          {key: 'C', label: 'Mars', correct: false},
        ],
      },
    ],
  },
  {
    id: 'quiz-missions',
    title: 'Space Missions',
    emoji: '🌌',
    difficulty: 2,
    questions: [
      {
        id: 'q3-1',
        text: 'Which mission first landed humans on the Moon?',
        answers: [
          {key: 'A', label: 'Apollo 11', correct: true},
          {key: 'B', label: 'Apollo 13', correct: false},
          {key: 'C', label: 'Apollo 8', correct: false},
        ],
      },
      {
        id: 'q3-2',
        text: 'What is the name of the rover that landed on Mars in 2012?',
        answers: [
          {key: 'A', label: 'Spirit', correct: false},
          {key: 'B', label: 'Curiosity', correct: true},
          {key: 'C', label: 'Opportunity', correct: false},
        ],
      },
      {
        id: 'q3-3',
        text: 'Which telescope orbits Earth?',
        answers: [
          {key: 'A', label: 'James Webb', correct: false},
          {key: 'B', label: 'Hubble', correct: true},
          {key: 'C', label: 'Spitzer', correct: false},
        ],
      },
      {
        id: 'q3-4',
        text: 'Voyager 1 is known for what achievement?',
        answers: [
          {key: 'A', label: 'Landing on Mars', correct: false},
          {key: 'B', label: 'Leaving the Solar System', correct: true},
          {key: 'C', label: 'Orbiting Jupiter', correct: false},
        ],
      },
      {
        id: 'q3-5',
        text: 'Which country launched the first satellite?',
        answers: [
          {key: 'A', label: 'USA', correct: false},
          {key: 'B', label: 'USSR', correct: true},
          {key: 'C', label: 'China', correct: false},
        ],
      },
    ],
  },
  {
    id: 'quiz-technology',
    title: 'Space Technology',
    emoji: '🛰️',
    difficulty: 2,
    questions: [
      {
        id: 'q4-1',
        text: 'What is used to launch rockets into space?',
        answers: [
          {key: 'A', label: 'Fuel and engines', correct: true},
          {key: 'B', label: 'Solar panels', correct: false},
          {key: 'C', label: 'Magnets', correct: false},
        ],
      },
      {
        id: 'q4-2',
        text: 'What protects astronauts in space?',
        answers: [
          {key: 'A', label: 'Regular clothes', correct: false},
          {key: 'B', label: 'Space suits', correct: true},
          {key: 'C', label: 'Metal armor', correct: false},
        ],
      },
      {
        id: 'q4-3',
        text: 'What do satellites mainly do?',
        answers: [
          {key: 'A', label: 'Produce oxygen', correct: false},
          {key: 'B', label: 'Orbit Earth and send data', correct: true},
          {key: 'C', label: 'Land on planets', correct: false},
        ],
      },
      {
        id: 'q4-4',
        text: 'What is the ISS?',
        answers: [
          {key: 'A', label: 'A rocket', correct: false},
          {key: 'B', label: 'A space station', correct: true},
          {key: 'C', label: 'A satellite dish', correct: false},
        ],
      },
      {
        id: 'q4-5',
        text: 'What helps rockets move in space?',
        answers: [
          {key: 'A', label: 'Air', correct: false},
          {key: 'B', label: 'Gravity only', correct: false},
          {key: 'C', label: 'Thrust', correct: true},
        ],
      },
    ],
  },
  {
    id: 'quiz-deep-space',
    title: 'Deep Space & Fun Facts',
    emoji: '🌠',
    difficulty: 3,
    questions: [
      {
        id: 'q5-1',
        text: 'What is a black hole?',
        answers: [
          {key: 'A', label: 'A planet', correct: false},
          {key: 'B', label: 'A region with strong gravity', correct: true},
          {key: 'C', label: 'A star', correct: false},
        ],
      },
      {
        id: 'q5-2',
        text: 'What is the Sun?',
        answers: [
          {key: 'A', label: 'A planet', correct: false},
          {key: 'B', label: 'A star', correct: true},
          {key: 'C', label: 'A comet', correct: false},
        ],
      },
      {
        id: 'q5-3',
        text: 'What are shooting stars actually?',
        answers: [
          {key: 'A', label: 'Stars moving', correct: false},
          {key: 'B', label: 'Meteors burning in the atmosphere', correct: true},
          {key: 'C', label: 'Satellites', correct: false},
        ],
      },
      {
        id: 'q5-4',
        text: 'What is the closest star to Earth?',
        answers: [
          {key: 'A', label: 'Alpha Centauri', correct: false},
          {key: 'B', label: 'The Sun', correct: true},
          {key: 'C', label: 'Sirius', correct: false},
        ],
      },
      {
        id: 'q5-5',
        text: 'What galaxy do we live in?',
        answers: [
          {key: 'A', label: 'Andromeda', correct: false},
          {key: 'B', label: 'Milky Way', correct: true},
          {key: 'C', label: 'Pegasus', correct: false},
        ],
      },
    ],
  },
];

export const getQuizById = (id: string) => quizzes.find(q => q.id === id);
