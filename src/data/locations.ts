import {SpaceLocation} from '../types';

export const locations: SpaceLocation[] = [
  {
    id: 'kennedy-space-center',
    name: 'Kennedy Space Center',
    country: 'USA',
    latitude: 28.5729,
    longitude: -80.649,
    featured: true,
    emoji: '🚀',
    description:
      "NASA's Kennedy Space Center on Merritt Island, Florida, has been the launch site of every US human space flight since 1968. Home to the iconic Vehicle Assembly Building and Launch Complex 39.",
    image: require('../assets/locations/kennedy_space_center.png'),
  },
  {
    id: 'baikonur-cosmodrome',
    name: 'Baikonur Cosmodrome',
    country: 'Kazakhstan',
    latitude: 45.92,
    longitude: 63.342,
    featured: true,
    emoji: '🚀',
    description:
      "The world's first and largest operational spaceport. From here, Yuri Gagarin made the first human spaceflight. Today it hosts Soyuz launches and remains a historic symbol of early space exploration.",
    image: require('../assets/locations/baikonur_cosmodrome.png'),
  },
  {
    id: 'guiana-space-centre',
    name: 'Guiana Space Centre',
    country: 'French Guiana',
    latitude: 5.239,
    longitude: -52.768,
    featured: false,
    emoji: '🚀',
    description:
      "Europe's main spaceport located near the equator, ideal for efficient launches. Surrounded by tropical rainforest, it hosts Ariane rockets and offers guided tours of launch facilities and mission areas.",
    image: require('../assets/locations/guiana_space_centre.png'),
  },
  {
    id: 'space-center-houston',
    name: 'Space Center Houston',
    country: 'USA',
    latitude: 29.5502,
    longitude: -95.097,
    featured: true,
    emoji: '🛰️',
    description:
      "The official visitor center of NASA's Johnson Space Center. Explore real mission control rooms, astronaut training facilities, and massive rockets while learning how space missions are planned and executed.",
    image: require('../assets/locations/space_center_houston.png'),
  },
  {
    id: 'us-space-rocket-center',
    name: 'U.S. Space & Rocket Center',
    country: 'USA',
    latitude: 34.711,
    longitude: -86.65,
    featured: false,
    emoji: '🛰️',
    description:
      'A massive museum dedicated to rockets and space science. It features one of the largest collections of rockets in the world, including a full Saturn V, and offers hands-on exhibits and space camp experiences.',
    image: require('../assets/locations/us_space_rocket_center.png'),
  },
  {
    id: 'technik-museum-speyer',
    name: 'Technik Museum Speyer',
    country: 'Germany',
    latitude: 49.317,
    longitude: 8.431,
    featured: false,
    emoji: '🛰️',
    description:
      'A unique technology museum featuring aircraft, submarines, and space exhibits. The highlight is the Soviet Buran space shuttle, allowing visitors to explore one of the most ambitious space programs ever built.',
    image: require('../assets/locations/technik_museum_speyer.png'),
  },
  {
    id: 'griffith-observatory',
    name: 'Griffith Observatory',
    country: 'USA',
    latitude: 34.1184,
    longitude: -118.3004,
    featured: false,
    emoji: '🌌',
    description:
      'A famous observatory offering stunning views of Los Angeles and the night sky. Visitors can explore astronomy exhibits, use telescopes, and enjoy immersive planetarium shows under a massive dome.',
    image: require('../assets/locations/griffith_observatory.png'),
  },
  {
    id: 'alma-observatory',
    name: 'ALMA Observatory',
    country: 'Chile',
    latitude: -23.029,
    longitude: -67.755,
    featured: false,
    emoji: '🌌',
    description:
      'One of the most advanced astronomical observatories in the world. Located high in the Atacama Desert, its massive radio antennas study the origins of stars, galaxies, and the universe.',
    image: require('../assets/locations/alma_observatory.png'),
  },
  {
    id: 'vandenberg-space-force-base',
    name: 'Vandenberg Space Force Base',
    country: 'USA',
    latitude: 34.742,
    longitude: -120.572,
    featured: false,
    emoji: '🚀',
    description:
      'A key U.S. launch site on the west coast, known for polar orbit missions. Rockets launch over the Pacific Ocean, creating spectacular views. Some events and nearby areas are accessible to the public.',
    image: require('../assets/locations/vandenberg_space_force_base.png'),
  },
  {
    id: 'tanegashima-space-center',
    name: 'Tanegashima Space Center',
    country: 'Japan',
    latitude: 30.401,
    longitude: 130.976,
    featured: false,
    emoji: '🚀',
    description:
      "Japan's main launch facility operated by JAXA. Located on a scenic island, it combines advanced technology with natural beauty and offers guided tours and exhibits about Japanese space missions.",
    image: require('../assets/locations/tanegashima_space_center.png'),
  },
  {
    id: 'cite-de-lespace',
    name: 'Cité de l’Espace',
    country: 'France',
    latitude: 43.586,
    longitude: 1.493,
    featured: false,
    emoji: '🛰️',
    description:
      'A space-themed park and museum dedicated to astronomy and space exploration. Visitors can walk through full-scale rocket models, explore space stations, and enjoy interactive science exhibits.',
    image: require('../assets/locations/cite_de_lespace.png'),
  },
  {
    id: 'royal-observatory-greenwich',
    name: 'Royal Observatory Greenwich',
    country: 'United Kingdom',
    latitude: 51.4769,
    longitude: -0.0005,
    featured: false,
    emoji: '🌌',
    description:
      'A historic observatory known as the home of the Prime Meridian. It played a key role in navigation and astronomy and now offers exhibits, telescopes, and interactive displays about space and time.',
    image: require('../assets/locations/royal_observatory_greenwich.png'),
  },
];

export const getLocationById = (id: string) =>
  locations.find(location => location.id === id);
