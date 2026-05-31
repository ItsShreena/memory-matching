import { useState, useCallback } from 'react';
import { Achievement, GameStats, Difficulty } from '@/lib/types';
import { ACHIEVEMENTS } from '@/lib/constants';
import { useLocalStorage } from './useLocalStorage';

export function useAchievements() {
  const [unlockedAchievements, setUnlockedAchievements] = useLocalStorage<string[]>(
    'memoryGame_achievements',
    []
  );

  const checkAchievements = useCallback(
    (stats: GameStats, elapsedSeconds: number, difficulty: Difficulty) => {
      const newUnlocked: string[] = [];

      // Speed Runner: Complete game in under 60 seconds
      if (elapsedSeconds < 60) {
        const speedRunnerId = 'speed-runner';
        if (!unlockedAchievements.includes(speedRunnerId)) {
          newUnlocked.push(speedRunnerId);
        }
      }

      // Perfect Memory: Complete with minimal moves
      // For easy: max 16 moves (8 pairs + minimal wrong flips)
      // For medium: max 36 moves, hard: max 64 moves
      const maxMovesThreshold =
        difficulty === 'easy' ? 16 : difficulty === 'medium' ? 36 : 64;
      if (stats.totalMoves <= maxMovesThreshold) {
        const perfectMemoryId = 'perfect-memory';
        if (!unlockedAchievements.includes(perfectMemoryId)) {
          newUnlocked.push(perfectMemoryId);
        }
      }

      // Update localStorage if new achievements found
      if (newUnlocked.length > 0) {
        const updatedAchievements = [...unlockedAchievements, ...newUnlocked];
        setUnlockedAchievements(updatedAchievements);
      }

      return newUnlocked;
    },
    [unlockedAchievements, setUnlockedAchievements]
  );

  const isAchievementUnlocked = useCallback(
    (achievementId: string) => {
      return unlockedAchievements.includes(achievementId);
    },
    [unlockedAchievements]
  );

  const getUnlockedAchievementDetails = useCallback(() => {
    return ACHIEVEMENTS.filter((a) => unlockedAchievements.includes(a.id));
  }, [unlockedAchievements]);

  return {
    unlockedAchievements,
    checkAchievements,
    isAchievementUnlocked,
    getUnlockedAchievementDetails,
  };
}
