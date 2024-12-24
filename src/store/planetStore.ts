import { create } from 'zustand'
import {
  WiSolarEclipse,  // Sun
  WiMoonAltNew,    // Moon
} from 'react-icons/wi'
import {
  GiPlanetCore,        // Mercury, Uranus
  GiVenusOfWillendorf, // Venus
  GiEarthAmerica,      // Earth
  GiJupiter,           // Jupiter
  GiRingedPlanet,      // Saturn
} from 'react-icons/gi'

import { FaMars } from 'react-icons/fa'; // Mars
import {
  IoIosPlanet,
} from 'react-icons/io' // Neptune
import {
  FaCircle,
} from 'react-icons/fa' //pluto
import { IconType } from 'react-icons'

// Interfaces
export interface Stats {
  temperature: string
  mass: string
  diameter: string
  dayLength: string
  gravity?: string
  distanceFromSun?: string
  atmosphere?: string[]
}

export interface CelestialBody {
  id: string
  name: string
  icon: IconType
  gradient: string
  size: number
  orbitRadius: number
  rotationSpeed: number
  description: string
  facts: string[]
  stats: Stats
  funFact?: string
  explorationStatus?: string
}

export interface Planet extends CelestialBody {
  color: string
}

export interface Moon extends CelestialBody {
  parentPlanetId?: string
}

export interface Sun extends Omit<CelestialBody, 'orbitRadius' | 'rotationSpeed'> {
  volumeComparedToEarth: number
}

interface PlanetStore {
  selectedPlanet: (Planet | Moon | Sun) | null
  sun: Sun
  planets: Planet[]
  moons: Moon[]
  updateOrbitRadius: (id: string, newRadius: number) => void
  updatePlanetSize: (id: string, newSize: number) => void
  setSelectedPlanet: (planet: (Planet | Moon | Sun) | null) => void
  clearSelectedPlanet: () => void
}

export const usePlanetStore = create<PlanetStore>((set) => ({
  // Selected body (planet, moon, or Sun)
  selectedPlanet: null,

  // Sun details
  sun: {
    id: 'sun',
    name: 'Sun',
    icon: WiSolarEclipse,
    gradient: 'linear-gradient(45deg, #FFD700, #FFA500)',
    size: 80,
    description: 'The star at the center of our Solar System!',
    facts: [
      '☀️ Contains 99.86% of the Solar System\'s mass',
      '🔥 Surface temperature is about 5,500°C',
      '⚡ Produces enough energy in 1 second to power Earth for 500,000 years',
      '🌟 Is actually white, appears yellow through Earth\'s atmosphere',
      '🎯 Takes up 99.86% of our solar system\'s mass',
    ],
    stats: {
      temperature: '5,500°C (surface)',
      mass: '1.989 × 10^30 kg',
      diameter: '1.392 million km',
      dayLength: '27 Earth days',
      gravity: '274 m/s²'
    },
    volumeComparedToEarth: 1300000,
    funFact: 'The Sun is so big that about 1.3 million Earths could fit inside it!',
    explorationStatus: 'Studied by various space missions including Parker Solar Probe and Solar Orbiter.',
  },

  // Moon details
  moons: [
    {
      id: 'moon',
      name: 'Moon',
      icon: WiMoonAltNew,
      gradient: 'linear-gradient(45deg, #E8E8E8, #A9A9A9)',
      size: 14,
      orbitRadius: 35,
      rotationSpeed: 6,
      description: 'Earth\'s faithful companion! The only place beyond Earth that humans have walked on. Home to the most famous footprint in history! 👨‍🚀',
      facts: [
        '👣 First visited by humans in 1969',
        '🌊 Controls Earth\'s tides',
        '🎭 Always shows the same face to Earth',
        '🏃‍♂️ Slowly moving away from Earth at 3.8cm per year',
        '💫 Creates beautiful solar and lunar eclipses',
      ],
      stats: {
        temperature: '-233°C to 123°C',
        mass: '7.34767309 × 10^22 kg',
        diameter: '3,474 km',
        dayLength: '29.5 Earth days',
        distanceFromSun: '384,400 km from Earth',
        gravity: '1.62 m/s²',
        atmosphere: ['Extremely thin', 'Contains helium-3, hydrogen, neon']
      },
      funFact: 'The Moon is gradually moving away from Earth at a rate of about 3.8 centimeters per year!',
      explorationStatus: 'First visited by humans in 1969 with Apollo 11. Multiple missions since then, including recent robotic missions from various space agencies.',
    },
    {
      id: 'phobos',
      name: 'Phobos',
      icon: WiMoonAltNew,
      gradient: 'linear-gradient(45deg, #8B7355, #696969)',
      size: 8,
      orbitRadius: 25,
      rotationSpeed: 4,
      description: 'The larger and inner of Mars\' two moons, Phobos is getting closer to Mars each year!',
      facts: [
        '🏃‍♂️ Orbits Mars three times a day',
        '🌑 Getting closer to Mars by 1.8cm each year',
        '🗿 Heavily cratered surface',
        '🛸 May break apart in 30-50 million years',
        '📏 Only 22.2 km in diameter'
      ],
      stats: {
        temperature: '-40°C',
        mass: '1.06 × 10^16 kg',
        diameter: '22.2 km',
        dayLength: '7.7 hours',
        gravity: '0.0057 m/s²',
        atmosphere: ['None'],
        distanceFromSun: '9,377 km from Mars'
      },
      funFact: 'Phobos orbits so close to Mars that it appears to rise in the west and set in the east twice each Martian day!',
      explorationStatus: 'Observed by various Mars missions, including Mars Reconnaissance Orbiter and Mars Express.'
    },
    {
      id: 'deimos',
      name: 'Deimos',
      icon: WiMoonAltNew,
      gradient: 'linear-gradient(45deg, #696969, #4A4A4A)',
      size: 6,
      orbitRadius: 35,
      rotationSpeed: 7,
      description: 'The smaller and outer moon of Mars, Deimos is tiny but fascinating!',
      facts: [
        '🌘 Takes 30.3 hours to orbit Mars',
        '💫 Likely a captured asteroid',
        '🪨 Very irregular shape',
        '🔭 Discovered in 1877',
        '📏 Only 12.4 km in diameter'
      ],
      stats: {
        temperature: '-40°C',
        mass: '1.48 × 10^15 kg',
        diameter: '12.4 km',
        dayLength: '30.3 hours',
        gravity: '0.003 m/s²',
        atmosphere: ['None'],
        distanceFromSun: '23,460 km from Mars'
      },
      funFact: 'From Mars\' surface, Deimos would appear about as bright as Venus appears from Earth!',
      explorationStatus: 'Studied by various Mars missions, though no spacecraft has yet landed on its surface.'
    },
    {
      id: 'io',
      name: 'Io',
      icon: WiMoonAltNew,
      gradient: 'linear-gradient(45deg, #FFD700, #FF8C00)',
      size: 12,
      orbitRadius: 30,
      rotationSpeed: 4,
      description: 'The most volcanically active body in the Solar System!',
      facts: [
        '🌋 Has over 400 active volcanoes',
        '🔥 Surface constantly renewed by volcanic activity',
        '🌡️ Surface temperature averages -130°C',
        '⚡ Creates powerful electrical currents with Jupiter',
        '🎨 Yellow-orange color from sulfur deposits'
      ],
      stats: {
        temperature: '-130°C',
        mass: '8.93 × 10^22 kg',
        diameter: '3,642 km',
        dayLength: '1.77 Earth days',
        gravity: '1.796 m/s²',
        distanceFromSun: '421,700 km from Jupiter'
      }
    },
    {
      id: 'europa',
      name: 'Europa',
      icon: WiMoonAltNew,
      gradient: 'linear-gradient(45deg, #FFFFFF, #87CEEB)',
      size: 10,
      orbitRadius: 40,
      rotationSpeed: 5,
      description: 'An icy moon with a subsurface ocean that might harbor life!',
      facts: [
        '🌊 Has a global ocean under its icy surface',
        '🧊 Surface is the smoothest in the Solar System',
        '👽 Potential candidate for extraterrestrial life',
        '❄️ Ice shell estimated to be 10-30 km thick',
        '🌌 Has a very thin atmosphere of oxygen'
      ],
      stats: {
        temperature: '-160°C',
        mass: '4.8 × 10^22 kg',
        diameter: '3,122 km',
        dayLength: '3.55 Earth days',
        gravity: '1.315 m/s²',
        distanceFromSun: '671,100 km from Jupiter'
      }
    },
    {
      id: 'ganymede',
      name: 'Ganymede',
      icon: WiMoonAltNew,
      gradient: 'linear-gradient(45deg, #C0C0C0, #808080)',
      size: 14,
      orbitRadius: 50,
      rotationSpeed: 6,
      description: 'The largest moon in our Solar System, bigger than Mercury!',
      facts: [
        '🏆 Largest moon in the Solar System',
        '🧲 Only moon with its own magnetic field',
        '🌊 May have a subsurface ocean',
        '📏 Larger than planet Mercury',
        '🛡️ Has a thin oxygen atmosphere'
      ],
      stats: {
        temperature: '-163°C',
        mass: '1.48 × 10^23 kg',
        diameter: '5,268 km',
        dayLength: '7.15 Earth days',
        gravity: '1.428 m/s²',
        distanceFromSun: '1.07 million km from Jupiter'
      }
    },
    {
      id: 'callisto',
      name: 'Callisto',
      icon: WiMoonAltNew,
      gradient: 'linear-gradient(45deg, #696969, #2F4F4F)',
      size: 13,
      orbitRadius: 60,
      rotationSpeed: 7,
      description: 'The most heavily cratered object in the Solar System!',
      facts: [
        '🎯 Most heavily cratered object in Solar System',
        '🧊 May have a subsurface ocean',
        '🌍 Same size as Mercury but half the mass',
        '⚡ Has a thin atmosphere of carbon dioxide',
        '🏔️ Surface is ancient and unchanged'
      ],
      stats: {
        temperature: '-150°C',
        mass: '1.08 × 10^23 kg',
        diameter: '4,821 km',
        dayLength: '16.7 Earth days',
        gravity: '1.235 m/s²',
        distanceFromSun: '1.88 million km from Jupiter'
      }
    },
    {
      id: 'titan',
      name: 'Titan',
      icon: WiMoonAltNew,
      gradient: 'linear-gradient(45deg, #FFA500, #8B4513)',
      size: 16,
      orbitRadius: 50,
      rotationSpeed: 5,
      description: 'Saturn\'s largest moon and the only moon known to have a dense atmosphere!',
      facts: [
        '🌍 Larger than planet Mercury',
        '🌊 Only moon with liquid on its surface',
        '🌫️ Has a thick atmosphere like Earth',
        '🛸 Could potentially support life',
        '🌡️ Surface temperature around -179°C'
      ],
      stats: {
        temperature: '-179°C',
        mass: '1.345 × 10^23 kg',
        diameter: '5,150 km',
        dayLength: '15.9 Earth days',
        gravity: '1.352 m/s²',
        distanceFromSun: '1.2 million km from Saturn',
        atmosphere: ['Nitrogen', 'Methane']
      }
    },
    {
      id: 'enceladus',
      name: 'Enceladus',
      icon: WiMoonAltNew,
      gradient: 'linear-gradient(45deg, #F0FFFF, #E0FFFF)',
      size: 8,
      orbitRadius: 40,
      rotationSpeed: 3,
      description: 'An icy moon with spectacular water geysers erupting from its south pole!',
      facts: [
        '💦 Shoots water geysers into space',
        '❄️ Surface is pure white ice',
        '🌊 Has a subsurface ocean',
        '🔥 Has hydrothermal activity',
        '✨ Reflects almost 100% of sunlight'
      ],
      stats: {
        temperature: '-198°C',
        mass: '1.08 × 10^20 kg',
        diameter: '504 km',
        dayLength: '1.37 Earth days',
        gravity: '0.113 m/s²',
        distanceFromSun: '238,000 km from Saturn'
      }
    },
    {
      id: 'mimas',
      name: 'Mimas',
      icon: WiMoonAltNew,
      gradient: 'linear-gradient(45deg, #DCDCDC, #A9A9A9)',
      size: 7,
      orbitRadius: 30,
      rotationSpeed: 2,
      description: 'Known as the "Death Star" moon due to its large impact crater!',
      facts: [
        '🎯 Has a huge crater named Herschel',
        '🌡️ Temperature varies dramatically',
        '🪨 Mostly made of ice and rock',
        '🎮 Looks like the Death Star',
        '🌍 Smallest round object in the Solar System'
      ],
      stats: {
        temperature: '-209°C',
        mass: '3.7 × 10^19 kg',
        diameter: '396 km',
        dayLength: '0.9 Earth days',
        gravity: '0.064 m/s²',
        distanceFromSun: '185,520 km from Saturn'
      }
    },
    {
      id: 'titania',
      name: 'Titania',
      icon: WiMoonAltNew,
      gradient: 'linear-gradient(45deg, #D3D3D3, #A9A9A9)',
      size: 12,
      orbitRadius: 40,
      rotationSpeed: 5,
      description: 'The largest moon of Uranus, covered in ice and canyons!',
      facts: [
        '❄️ Surface is mostly water ice and rock',
        '🌋 Shows signs of past geological activity',
        '🏔️ Has huge canyons up to 100km deep',
        '📏 Largest of Uranus\' moons',
        '🌑 Takes 8.7 Earth days to orbit Uranus'
      ],
      stats: {
        temperature: '-203°C',
        mass: '3.4 × 10^21 kg',
        diameter: '1,578 km',
        dayLength: '8.7 Earth days',
        gravity: '0.367 m/s²',
        distanceFromSun: '436,300 km from Uranus'
      }
    },
    {
      id: 'oberon',
      name: 'Oberon',
      icon: WiMoonAltNew,
      gradient: 'linear-gradient(45deg, #8B8989, #696969)',
      size: 11,
      orbitRadius: 50,
      rotationSpeed: 6,
      description: 'The outermost major moon of Uranus, heavily cratered and mysterious!',
      facts: [
        '🎯 Most heavily cratered of Uranian moons',
        '🏔️ Has a mountain nearly 6km high',
        '❄️ Surface composed of ice and rock',
        '🌑 Second largest moon of Uranus',
        '🔭 Named after a character from Shakespeare'
      ],
      stats: {
        temperature: '-198°C',
        mass: '3.0 × 10^21 kg',
        diameter: '1,522 km',
        dayLength: '13.5 Earth days',
        gravity: '0.354 m/s²',
        distanceFromSun: '583,500 km from Uranus'
      }
    },
    {
      id: 'miranda',
      name: 'Miranda',
      icon: WiMoonAltNew,
      gradient: 'linear-gradient(45deg, #E8E8E8, #B8B8B8)',
      size: 8,
      orbitRadius: 30,
      rotationSpeed: 4,
      description: 'The smallest and innermost of Uranus\' major moons, with a unique, patchwork surface!',
      facts: [
        '🧩 Has a bizarre patchwork surface',
        '🏜️ Features cliffs up to 20km high',
        '❄️ Composed mainly of ice and rock',
        '🌋 Shows signs of past geological activity',
        '🎭 Named after character from Shakespeare'
      ],
      stats: {
        temperature: '-187°C',
        mass: '6.6 × 10^19 kg',
        diameter: '472 km',
        dayLength: '1.4 Earth days',
        gravity: '0.079 m/s²',
        distanceFromSun: '129,900 km from Uranus'
      }
    },
    {
      id: 'triton',
      name: 'Triton',
      icon: WiMoonAltNew,
      gradient: 'linear-gradient(45deg, #B0C4DE, #4682B4)',
      size: 13,
      orbitRadius: 40,
      rotationSpeed: 5,
      description: 'Neptune\'s largest moon, orbiting backwards and spewing nitrogen geysers!',
      facts: [
        '🔄 Only large moon that orbits backwards',
        '❄️ Coldest known object in solar system',
        '💨 Has active nitrogen geysers',
        '🌋 Surface is geologically young and active',
        '🛸 Likely a captured dwarf planet'
      ],
      stats: {
        temperature: '-235°C',
        mass: '2.14 × 10^22 kg',
        diameter: '2,707 km',
        dayLength: '5.9 Earth days',
        gravity: '0.779 m/s²',
        distanceFromSun: '354,800 km from Neptune'
      }
    },
    {
      id: 'naiad',
      name: 'Naiad',
      icon: WiMoonAltNew,
      gradient: 'linear-gradient(45deg, #778899, #2F4F4F)',
      size: 6,
      orbitRadius: 30,
      rotationSpeed: 3,
      description: 'One of Neptune\'s inner moons, dancing in a unique orbital pattern!',
      facts: [
        '💃 Performs a unique "dance" with Thalassa',
        '🔄 Orbits Neptune in less than a day',
        '🪨 Likely formed from debris of larger moons',
        '📏 One of Neptune\'s smallest moons',
        '🌑 Very dark surface reflecting only 6% of light'
      ],
      stats: {
        temperature: '-222°C',
        mass: '2 × 10^16 kg',
        diameter: '58 km',
        dayLength: '0.294 Earth days',
        gravity: '0.002 m/s²',
        distanceFromSun: '48,227 km from Neptune'
      }
    }
  ],

  // Planet details
  planets: [
    {
      id: 'mercury',
      name: 'Mercury',
      icon: GiPlanetCore,
      color: '#FFB6C1',
      gradient: 'linear-gradient(45deg, #FFB6C1, #FFA07A)',
      size: 20,
      orbitRadius: 80,
      rotationSpeed: 8,
      description: 'The speedster of our solar system! This tiny planet races around the Sun faster than any other.',
      facts: [
        '🏃‍♂️ Zooms around the Sun in just 88 Earth days!',
        '🌡️ Can be both super hot (800°F) and super cold (-290°F)',
        '🪨 Looks like our Moon\'s twin with all its craters',
        '🌍 Smallest planet in our solar system (sorry Pluto!)',
        '☀️ Has no atmosphere to protect it from the Sun',
      ],
      stats: {
        temperature: '-173°C to 427°C',
        mass: '3.30 × 10^23 kg',
        diameter: '4,879 km',
        dayLength: '58.65 Earth days',
        distanceFromSun: '57.9 million km',
        gravity: '3.7 m/s²'
      },
      funFact: 'Mercury is the smallest and innermost planet in our solar system!',
      explorationStatus: 'Mercury has been explored by several spacecraft, including Mariner 10 and MESSENGER.',
    },
    {
      id: 'venus',
      name: 'Venus',
      icon: GiVenusOfWillendorf,
      color: '#FFA500',
      gradient: 'linear-gradient(45deg, #FFD700, #FFA500)',
      size: 25,
      orbitRadius: 120,
      rotationSpeed: 10,
      description: 'The drama queen of planets! So hot and cloudy, it\'s like a cosmic sauna.',
      facts: [
        '🌪️ Has super strong winds and acid rain',
        '🔄 Spins backwards - what a rebel!',
        '✨ The brightest planet in Earth\'s night sky',
        '🌡️ Hot enough to melt lead (872°F/467°C)',
        '👯‍♀️ Often called Earth\'s evil twin',
      ],
      stats: {
        temperature: '462°C',
        mass: '4.87 × 10^24 kg',
        diameter: '12,104 km',
        dayLength: '243 Earth days',
        distanceFromSun: '108.2 million km',
        gravity: '8.87 m/s²'
      },
      funFact: 'Venus is the hottest planet in our solar system!',
      explorationStatus: 'Venus has been explored by several spacecraft, including Mariner 10 and Venus Express.',
    },
    // Earth
    {
      id: 'earth',
      name: 'Earth',
      icon: GiEarthAmerica,
      color: '#4169E1',
      gradient: 'linear-gradient(45deg, #4169E1, #3CB371)',
      size: 28,
      orbitRadius: 160,
      rotationSpeed: 12,
      description: 'Our cosmic home! The only planet where you can get pizza delivered (so far).',
      facts: [
        '🌍 Has more water than any other rocky planet',
        '🦕 Home to millions of different species',
        '🌈 The only planet not named after a god or goddess',
        '🌙 Has the perfect moon to create eclipses',
        '🧲 Has a magnetic field that protects us from solar radiation',
      ],
      stats: {
        temperature: '-88°C to 58°C',
        mass: '5.97 × 10^24 kg',
        diameter: '12,742 km',
        dayLength: '24 hours',
        distanceFromSun: '149.6 million km',
        gravity: '9.8 m/s²'
      },
      funFact: 'Earth is the only planet not named after a god or goddess!',
      explorationStatus: 'Our home planet is continuously monitored by thousands of satellites.',
    },
    {
      id: 'mars',
      name: 'Mars',
      icon:  FaMars,
      color: '#FF4500',
      gradient: 'linear-gradient(45deg, #FF4500, #8B0000)',
      size: 24,
      orbitRadius: 230,
      rotationSpeed: 14,
      description: 'The Red Planet! Home to the tallest mountain in our solar system and our robot friends!',
      facts: [
        '🏔️ Has a mountain 3 times taller than Everest',
        '🤖 Home to multiple robot explorers',
        '👻 Gets spooky dust storms that cover the whole planet',
        '❄️ Has ice caps made of frozen CO2 and water',
        '🏠 Best candidate for human colonization',
      ],
      stats: {
        temperature: '-87°C to -5°C',
        mass: '6.42 × 10^23 kg',
        diameter: '6,779 km',
        dayLength: '24.62 Earth hours',
        distanceFromSun: '227.9 million km',
        gravity: '3.71 m/s²'
      },
      funFact: 'Mars is the fourth planet from the Sun!',
      explorationStatus: 'Mars has been explored by several spacecraft, including Mars Reconnaissance Orbiter and Perseverance.',
    },
    {
      id: 'jupiter',
      name: 'Jupiter',
      icon: GiJupiter,
      color: '#DAA520',
      gradient: 'linear-gradient(45deg, #CD853F, #8B4513)',
      size: 45,
      orbitRadius: 330,
      rotationSpeed: 16,
      description: 'The Big Boss of the planets! So massive it could fit 1,300 Earths inside!',
      facts: [
        '🎨 Has a never-ending storm called the Great Red Spot',
        '👑 King of the planets - biggest in our solar system',
        '🌙 Has 95 moons! Talk about a big family!',
        '🛡️ Acts like a cosmic shield, protecting inner planets from asteroids',
        '💨 Fastest rotating planet despite its size',
      ],
      stats: {
        temperature: '-145°C to -110°C',
        mass: '1.898 × 10^27 kg',
        diameter: '139,822 km',
        dayLength: '9.93 Earth hours',
        distanceFromSun: '778.5 million km',
        gravity: '24.79 m/s²'
      },
      funFact: 'Jupiter is the largest planet in our solar system!',
      explorationStatus: 'Jupiter has been explored by several spacecraft, including Galileo and Juno.',
    },
    {
      id: 'saturn',
      name: 'Saturn',
      icon: GiRingedPlanet,
      color: '#F4A460',
      gradient: 'linear-gradient(45deg, #FFE4B5, #DEB887)',
      size: 40,
      orbitRadius: 450,
      rotationSpeed: 18,
      description: 'The Showoff! Strutting its fancy rings like a cosmic hula hoop champion!',
      facts: [
        '💍 Its rings are made of ice, dust, and rocks',
        '🪽 Could float in a giant bathtub (if one existed)',
        '🌪️ Has hexagon-shaped storms at its poles',
        '🌙 Has a moon (Titan) with lakes and seas',
        '🎭 Changes appearance as its rings tilt toward Earth',
      ],
      stats: {
        temperature: '-178°C to -184°C',
        mass: '5.683 × 10^26 kg',
        diameter: '116,460 km',
        dayLength: '10.7 Earth hours',
        distanceFromSun: '1.427 billion km',
        gravity: '10.44 m/s²'
      },
      funFact: 'Saturn is the second-largest planet in our solar system!',
      explorationStatus: 'Saturn has been explored by several spacecraft, including Cassini and Huygens.',
    },
    {
      id: 'uranus',
      name: 'Uranus',
      icon: IoIosPlanet,
      color: '#87CEEB',
      gradient: 'linear-gradient(45deg, #87CEEB, #4169E1)',
      size: 32,
      orbitRadius: 570,
      rotationSpeed: 20,
      description: 'The Sideways Spinner! This ice giant decided to roll around the Sun instead of spinning like others!',
      facts: [
        '🔄 Spins completely sideways like a rolling ball',
        '❄️ Made mostly of ice and freezing liquids',
        '💨 Has super fast winds up to 560 mph!',
        '💍 Has rings that are almost invisible from Earth',
        '🌡️ Coldest planet despite not being the farthest',
      ],
      stats: {
        temperature: '-220°C to -210°C',
        mass: '8.681 × 10^25 kg',
        diameter: '50,724 km',
        dayLength: '17.9 Earth hours',
        distanceFromSun: '2.871 billion km',
        gravity: '8.69 m/s²'
      },
      funFact: 'Uranus is the seventh planet from the Sun!',
      explorationStatus: 'Uranus has been explored by several spacecraft, including Voyager 2 and Hubble.',
    },
    {
      id: 'neptune',
      name: 'Neptune',
      icon: IoIosPlanet,
      color: '#1E90FF',
      gradient: 'linear-gradient(45deg, #00BFFF, #0000CD)',
      size: 30,
      orbitRadius: 670,
      rotationSpeed: 22,
      description: 'The Windy Wonder! This blue beauty has the fastest winds in the solar system!',
      facts: [
        '🌊 Named after the Roman god of the sea',
        '💨 Has winds up to 1,200 mph - fastest in the system!',
        '💎 Might have diamond rain in its atmosphere',
        '🔭 Found by math before it was seen through a telescope',
        '❄️ Has a giant dark spot that comes and goes',
      ],
      stats: {
        temperature: '-214°C to -200°C',
        mass: '1.024 × 10^26 kg',
        diameter: '49,528 km',
        dayLength: '16.1 Earth hours',
        distanceFromSun: '4.497 billion km',
        gravity: '11.15 m/s²'
      },
      funFact: 'Neptune is the eighth and farthest known planet in our solar system!',
      explorationStatus: 'Neptune has been explored by several spacecraft, including Voyager 2 and Hubble.',
    },
    {
      id: 'pluto',
      name: 'Pluto',
      icon: FaCircle,
      color: '#A0522D',
      gradient: 'linear-gradient(45deg, #8B4513, #A0522D)',
      size: 15,
      orbitRadius: 760,
      rotationSpeed: 24,
      description: 'The Little Planet That Could! Not officially a planet anymore, but still in our hearts!',
      facts: [
        '💔 Was a planet from 1930 to 2006',
        '❤️ Has a heart-shaped glacier on its surface',
        '🥶 Temperature is about -375°F (-225°C)',
        '🌓 Has 5 moons despite its tiny size',
        '🎢 Has a very tilted and elliptical orbit',
      ],
      stats: {
        temperature: '-223°C to -228°C',
        mass: '1.303 × 10^22 kg',
        diameter: '2,376 km',
        dayLength: '6.39 Earth days',
        distanceFromSun: '5.906 billion km',
        gravity: '0.62 m/s²'
      },
      funFact: 'Pluto is the smallest and farthest known planet in our solar system!',
      explorationStatus: 'Pluto has been explored by several spacecraft, including New Horizons.',
    },
  ],
  // Set the selected planet/moon/Sun
  setSelectedPlanet: (planet) =>
      set({ selectedPlanet: planet }),

  // Clear the selected planet/moon/Sun
  clearSelectedPlanet: () =>
      set({ selectedPlanet: null }),

  // Update the orbit radius of a planet (dynamic scaling)
  updateOrbitRadius: (id, newRadius) =>
      set((state) => {
        const planets = state.planets.map((planet) =>
            planet.id === id
                ? { ...planet, orbitRadius: newRadius }
                : planet
        )
        return { ...state, planets }
      }),

  // Update the size of a planet (dynamic scaling)
  updatePlanetSize: (id, newSize) =>
      set((state) => {
        const planets = state.planets.map((planet) =>
            planet.id === id
                ? { ...planet, size: newSize }
                : planet
        )
        return { ...state, planets }
      }),
}))