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
export interface PlanetStats {
  mass: string
  diameter: string
  gravity: string
  dayLength: string
  distanceFromSun: string
  temperature: string
  atmosphere?: string[]
}

export interface Planet {
  id: string
  name: string
  color: string
  size: number
  orbitRadius: number
  rotationSpeed: number
  description: string
  facts: string[]
  icon: IconType
  gradient: string
  stats: PlanetStats
  funFact: string
  explorationStatus: string
}

export interface Moon {
  id: string
  name: string
  icon: IconType
  gradient: string
  size: number
  orbitRadius: number
  rotationSpeed: number
  description: string
  facts: string[]
  stats?: PlanetStats
  funFact?: string
  explorationStatus?: string
}

export interface Sun {
  id: string
  name: string
  icon: IconType
  gradient: string
  size: number
  description: string
  facts: string[]
  stats: {
    temperature: string
    mass: string
    diameter: string
    dayLength: string
    gravity?: string
    distanceFromSun?: string
  }
  funFact: string
  explorationStatus: string
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
    gradient: 'linear-gradient(to bottom right, #FDB813, #FF8C42)',
    size: 60,
    description: 'The star at the center of our Solar System, a massive sphere of hot plasma sustained by nuclear fusion.',
    facts: [
      '🌟 Contains 99.86% of all mass in our Solar System',
      '🔥 Core temperature reaches 15 million°C',
      '⚡ Light takes 8 minutes 20 seconds on average to reach Earth',
      '📏 Diameter is 109 times wider than Earth',
      '⏳ About halfway through its 10-billion-year lifespan'
    ],
    stats: {
      temperature: '5,500°C (surface) / 15 million°C (core)',
      mass: '1.989 × 10^30 kg (333,000 × Earth)',
      diameter: '1,392,700 km (109 × Earth)',
      dayLength: '27 Earth days (at equator)',
    },
    volumeComparedToEarth: 960000,
    funFact: 'About 960,000 Earths could fit inside the Sun when accounting for the spacing between spheres. The Sun is so massive it contains 99.86% of all mass in our Solar System!',
    explorationStatus: 'Currently studied by missions like Parker Solar Probe and Solar Orbiter, helping us understand solar dynamics and space weather.'
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
        '🌊 Has more water than any other rocky planet',
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
      orbitRadius: 200,
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
      orbitRadius: 250,
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
      orbitRadius: 300,
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
      orbitRadius: 350,
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
      orbitRadius: 400,
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
      orbitRadius: 450,
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