export const ZONES = ['head', 'body', 'legs'];
const BASE = import.meta.env.BASE_URL;
export const ZONE_LABELS = {
  head: 'Head',
  body: 'Body',
  legs: 'Legs',
};

// Player fixed combat profile (per task spec: 1 attack zone, 2 defend zones)
export const PLAYER_PROFILE = {
  attackCount: 1,
  defendCount: 2,
  baseDamage: 15,
  critChance: 0.2,
  critMultiplier: 1.5,
  maxHp: 60, // >= 3 * baseDamage (45)
};

// Opponent pool - at least 2 different profiles (we have 3)
export const OPPONENTS = [
  {
    id: 'spider',
    name: 'Spider',
    avatar: `${BASE}avatars/spider.svg`,
    attackCount: 2,
    defendCount: 1,
    baseDamage: 10,
    critChance: 0.15,
    critMultiplier: 1.5,
    maxHp: 40, // >= 3 * 10 = 30
  },
  {
    id: 'troll',
    name: 'Troll',
    avatar: `${BASE}avatars/troll.svg`,
    attackCount: 1,
    defendCount: 3,
    baseDamage: 14,
    critChance: 0.1,
    critMultiplier: 1.5,
    maxHp: 50, // >= 3 * 14 = 42
  },
  {
    id: 'goblin',
    name: 'Goblin',
    avatar: `${BASE}avatars/goblin.svg`,
    attackCount: 1,
    defendCount: 2,
    baseDamage: 18,
    critChance: 0.2,
    critMultiplier: 1.5,
    maxHp: 60, // >= 3 * 18 = 54
  },
];

// Selectable player avatars — original SVG portraits, served from /avatars/
// BASE_URL is prepended so paths resolve correctly under a GitHub Pages subpath
// (e.g. /not-fight-club/) as well as locally (where BASE_URL is just '/').

export const AVATARS = [
  `${BASE}avatars/warrior.svg`,
  `${BASE}avatars/mage.svg`,
  `${BASE}avatars/archer.svg`,
  `${BASE}avatars/rogue.svg`,
  `${BASE}avatars/knight.svg`,
  `${BASE}avatars/monk.svg`,
  `${BASE}avatars/ranger.svg`,
  `${BASE}avatars/paladin.svg`,
];

export function pickRandomOpponent() {
  const opponent = OPPONENTS[Math.floor(Math.random() * OPPONENTS.length)];
  return { ...opponent };
}

// Pick `count` unique random zones (no repeats within the same selection)
export function pickRandomZones(count) {
  const pool = [...ZONES];
  const picked = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }
  return picked;
}
