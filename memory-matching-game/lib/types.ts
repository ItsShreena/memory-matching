export type Difficulty = 'easy' | 'medium' | 'hard';
export type Theme = 'emojis' | 'animals' | 'tech' | 'space' | 'programming';

export interface Card {
  id: string;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  flippedCards: string[];
  matchedPairs: number;
  moves: number;
  gameActive: boolean;
  gameWon: boolean;
  difficulty: Difficulty;
  theme: Theme;
  startTime: number | null;
  elapsedSeconds: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  totalMoves: number;
  fastestTime: number;
  currentStreak: number;
  achievements: Achievement[];
}

export interface DifficultyConfig {
  level: Difficulty;
  rows: number;
  cols: number;
  description: string;
}
