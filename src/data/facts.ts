import {SpaceFact} from '../types';

export const facts: SpaceFact[] = [
  {
    id: 'fact-1',
    category: 'Our Solar System',
    text: 'The Sun makes up about 99.8% of the mass in our Solar System.',
  },
  {
    id: 'fact-2',
    category: 'Venus',
    text: 'One day on Venus is longer than a year on Venus.',
  },
  {
    id: 'fact-3',
    category: 'Deep Space',
    text: 'Space is completely silent because sound cannot travel in a vacuum.',
  },
  {
    id: 'fact-4',
    category: 'Stars',
    text: 'There are more stars in the universe than grains of sand on Earth.',
  },
  {
    id: 'fact-5',
    category: 'Neutron Stars',
    text: 'Neutron stars are so dense that a teaspoon would weigh billions of tons.',
  },
  {
    id: 'fact-6',
    category: 'Moon',
    text: 'The footprints left on the Moon by Apollo astronauts will last for 100 million years.',
  },
  {
    id: 'fact-7',
    category: 'Jupiter',
    text: 'Jupiter has the shortest day of all planets — about 10 hours.',
  },
  {
    id: 'fact-8',
    category: 'Mercury',
    text: 'A year on Mercury lasts only 88 Earth days.',
  },
  {
    id: 'fact-9',
    category: 'Black Holes',
    text: 'Black holes can bend light and distort time due to extreme gravity.',
  },
  {
    id: 'fact-10',
    category: 'ISS',
    text: 'The International Space Station is visible from Earth and orbits every ~90 minutes.',
  },
  {
    id: 'fact-11',
    category: 'Our Solar System',
    text: 'Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.',
  },
  {
    id: 'fact-12',
    category: 'Milky Way',
    text: 'The Milky Way galaxy contains an estimated 100 to 400 billion stars.',
  },
];

export const getFactById = (id: string) => facts.find(f => f.id === id);
