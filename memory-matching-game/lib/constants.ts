import { DifficultyConfig, Theme } from './types';

export const DIFFICULTY_CONFIG: Record<string, DifficultyConfig> = {
  easy: {
    level: 'easy',
    rows: 4,
    cols: 4,
    description: '4x4 grid - 8 pairs - Perfect for beginners',
  },
  medium: {
    level: 'medium',
    rows: 6,
    cols: 6,
    description: '6x6 grid - 18 pairs - Challenge yourself',
  },
  hard: {
    level: 'hard',
    rows: 8,
    cols: 8,
    description: '8x8 grid - 32 pairs - Ultimate challenge',
  },
};

export const CARD_THEMES = {
  emojis: {
    name: 'Emojis',
    items: ['🎮', '🎨', '🎭', '🎪', '🎬', '🎤', '🎸', '🎹', '🎺', '🎻', '🥁', '🎷', '🎯', '🎲', '🎳', '🎮'],
  },
  animals: {
    name: 'Animals',
    items: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔'],
  },
  tech: {
    name: 'Technology',
    items: ['💻', '📱', '⌨️', '🖥️', '🖨️', '📷', '📹', '🎥', '📞', '☎️', '📠', '📺', '🎮', '🕹️', '⚙️', '🔧'],
  },
  space: {
    name: 'Space',
    items: ['🌑', '🌒', '🌓', '🌔', '🌕', '⭐', '✨', '💫', '🌠', '🌌', '🪐', '🚀', '🛸', '🛰️', '☄️', '🌟'],
  },
  programming: {
    name: 'Programming',
    items: ['📝', '💾', '🔐', '🔑', '⚡', '🔌', '💡', '🔍', '📊', '📈', '📉', '🎯', '🚀', '⚙️', '🛠️', '🔨'],
  },
};

export const ACHIEVEMENTS = [
  {
    id: 'speed-runner',
    name: 'Speed Runner',
    description: 'Complete a game in under 60 seconds',
    icon: '⚡',
  },
  {
    id: 'perfect-memory',
    name: 'Perfect Memory',
    description: 'Complete a game with minimal moves',
    icon: '🧠',
  },
  {
    id: 'master-easy',
    name: 'Easy Master',
    description: 'Win 5 games on Easy difficulty',
    icon: '⭐',
  },
  {
    id: 'master-medium',
    name: 'Medium Master',
    description: 'Win 5 games on Medium difficulty',
    icon: '💫',
  },
  {
    id: 'master-hard',
    name: 'Hard Master',
    description: 'Win 5 games on Hard difficulty',
    icon: '🌟',
  },
  {
    id: 'streak-5',
    name: 'On Fire',
    description: 'Win 5 games in a row',
    icon: '🔥',
  },
];

export const FLIP_CARD_ANIMATION_DURATION = 600; // ms
export const NON_MATCH_FLIP_DELAY = 1000; // ms
export const SCORE_BASE = 1000;
