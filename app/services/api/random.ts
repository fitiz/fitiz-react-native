import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


const dota2Nouns = [
  'Invoker',
  'Anti-Mage',
  'Crystal Maiden',
  'Earthshaker',
  'Juggernaut',
  'Riki',
  'Dazzle',
  'Pudge',
  'Lina',
  'Windranger',
  'Tiny',
  'Zeus',
  'Terrorblade',
  'Mirana',
  'Phantom Assassin',
  'Sven',
  'Lich',
  'Witch Doctor',
  'Tidehunter',
  'Sniper',
  'Wraith King',
  'Faceless Void',
  'Rubick',
  'Templar Assassin',
  'Dragon Knight',
  'Ursa',
  'Razor',
  'Leshrac',
  'Naga Siren',
];

export const generateRandomUsername = (): string => {
  const randomNoun = dota2Nouns[Math.floor(Math.random() * dota2Nouns.length)];
  const alphanumericSuffix = Math.random().toString(36).substring(2, 6);

  return `${randomNoun}_${alphanumericSuffix}`;
};

export const generateRandomUserId = (): string => {
  return uuidv4();
};

export const LOCATION_ID = 85375
export const USER_ID = generateRandomUserId()
export const USERNAME = generateRandomUsername()