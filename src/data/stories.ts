import {SpaceStory} from '../types';

export const stories: SpaceStory[] = [
  {
    id: 'first-human-space',
    title: 'The First Human in Space',
    date: 'April 12, 1961',
    readTime: '5 min read',
    featured: false,
    image: require('../assets/stories/first_human_space.png'),
    summary:
      'Yuri Gagarin became the first human to orbit the Earth aboard Vostok 1, opening the era of crewed spaceflight.',
    paragraphs: [
      'On April 12, 1961, Soviet cosmonaut Yuri Gagarin became the first human in history to travel into space. Launched aboard the Vostok 1 spacecraft, he completed a full orbit around Earth in 108 minutes, reaching speeds of over 27,000 kilometers per hour.',
      'During the flight, Gagarin experienced weightlessness for the first time, a condition never before tested on humans in orbit. Despite the unknown risks, the mission proceeded successfully, proving that humans could survive and function in space.',
      'As he looked down at Earth, he described it as breathtakingly beautiful — a fragile blue sphere surrounded by darkness. His mission marked the beginning of human space exploration and ignited the global space race, forever changing science, technology, and humanity’s view of its place in the universe.',
    ],
  },
  {
    id: 'apollo-eleven',
    title: 'The Eagle Has Landed',
    date: 'July 20, 1969',
    readTime: '4 min read',
    featured: true,
    image: require('../assets/stories/apollo_eleven.png'),
    summary:
      "NASA's Apollo 11 mission achieved the first crewed Moon landing, a defining moment for human exploration.",
    paragraphs: [
      'On July 20, 1969, at 20:17 UTC, the Apollo Lunar Module Eagle landed on the lunar surface. Astronaut Neil Armstrong became the first human to step onto the Moon, uttering the iconic words: "That’s one small step for man, one giant leap for mankind."',
      'The Apollo 11 mission was the culmination of the Space Race between the United States and Soviet Union. It required over 400,000 engineers, scientists, and technicians who worked tirelessly for nearly a decade.',
      'Armstrong and Buzz Aldrin spent 2 hours and 31 minutes on the lunar surface, collecting 21.5 kg of lunar material while Michael Collins orbited above. The mission proved that humans could travel to another world and return safely.',
    ],
  },
  {
    id: 'voyager-record',
    title: "Voyager's Last Frontier",
    date: 'September 5, 1977',
    readTime: '5 min read',
    featured: false,
    image: require('../assets/stories/voyager_record.png'),
    summary:
      'Launched in 1977, Voyager 1 is now the most distant human-made object, carrying a Golden Record to the stars.',
    paragraphs: [
      'On September 5, 1977, NASA launched the Voyager 1 spacecraft on a mission to explore the outer planets. On board was something extraordinary — the Golden Record, a message intended for any intelligent life that might encounter it in deep space.',
      'The record contains a collection of sounds and images representing life on Earth. It includes greetings in 55 languages, music from different cultures, natural sounds like wind and ocean waves, and even the sound of a human heartbeat. Instructions for playing the record were engraved on its surface.',
      'Voyager 1 has since traveled beyond the boundaries of our Solar System, becoming the most distant human-made object. The Golden Record remains a symbolic attempt to communicate humanity’s existence across the vastness of space.',
    ],
  },
  {
    id: 'hubble-repair',
    title: "Hubble's Eye on the Universe",
    date: 'December 2, 1993',
    readTime: '5 min read',
    featured: false,
    image: require('../assets/stories/hubble_repair.png'),
    summary:
      'A flawed mirror, a daring repair mission, and the most iconic images of deep space ever captured.',
    paragraphs: [
      'When the Hubble Space Telescope was launched in 1990, it was expected to revolutionize astronomy. However, scientists soon discovered a serious flaw in its primary mirror, causing blurry images and widespread disappointment.',
      'In December 1993, NASA launched a daring repair mission. Astronauts aboard the Space Shuttle Endeavour performed multiple spacewalks to install corrective optics and upgrade instruments. Working in the harsh environment of space, they successfully fixed the telescope.',
      'After the repair, Hubble began delivering stunning, crystal-clear images of distant galaxies, nebulae, and stars. It transformed our understanding of the universe and remains one of the most important scientific instruments ever created.',
    ],
  },
  {
    id: 'curiosity-rover',
    title: 'The Race to Mars',
    date: 'August 6, 2012',
    readTime: '6 min read',
    featured: false,
    image: require('../assets/stories/curiosity_rover.png'),
    summary:
      'Red dust, frozen poles, and the dream of humans becoming a multi-planetary species.',
    paragraphs: [
      'On August 6, 2012, NASA successfully landed the Curiosity rover on Mars using one of the most complex landing systems ever designed. Known as the "sky crane," this method involved lowering the rover from a hovering spacecraft using cables.',
      'The entire landing sequence was automated and took just seven minutes, often called the "seven minutes of terror." Engineers on Earth could only wait for signals to confirm success.',
      'Curiosity has since explored the Martian surface, discovering evidence that Mars once had conditions suitable for microbial life. Its mission continues to provide valuable insights into the planet’s geology and climate.',
    ],
  },
  {
    id: 'first-black-hole',
    title: 'Space Tourism: The New Frontier',
    date: 'April 10, 2019',
    readTime: '5 min read',
    featured: false,
    image: require('../assets/stories/first_black_hole.png'),
    summary:
      'The first direct image of a black hole confirmed Einstein’s predictions and changed astrophysics forever.',
    paragraphs: [
      'On April 10, 2019, scientists unveiled the first-ever image of a black hole, captured by the Event Horizon Telescope. This achievement was the result of years of collaboration between observatories around the world.',
      'By linking radio telescopes across multiple continents, researchers created a virtual Earth-sized telescope capable of observing incredibly distant objects. The image revealed a glowing ring of superheated gas surrounding a dark center — the black hole’s shadow.',
      'This discovery confirmed key predictions of Einstein’s theory of relativity and marked a major breakthrough in astrophysics, giving humanity its first visual evidence of one of the universe’s most mysterious phenomena.',
    ],
  },
];

export const getStoryById = (id: string) => stories.find(s => s.id === id);
