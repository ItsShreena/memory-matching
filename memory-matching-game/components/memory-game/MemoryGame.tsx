'use client';

import { useState, useEffect } from 'react';
import { Difficulty, Theme, GameStats } from '@/lib/types';
import { useMemoryGame } from '@/hooks/useMemoryGame';
import { useTimer } from '@/hooks/useTimer';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useAchievements } from '@/hooks/useAchievements';
import { DifficultySelector } from './DifficultySelector';
import { GameBoard } from './GameBoard';
import { GameStats as GameStatsComponent } from './GameStats';
import { WinModal } from './WinModal';
import { StatsDashboard } from './StatsDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function MemoryGame() {
  const { gameState, startGame, flipCard, restartGame, resetGame } = useMemoryGame();
  const elapsedSeconds = useTimer(gameState.gameActive, gameState.startTime);
  const { checkAchievements, getUnlockedAchievementDetails } = useAchievements();
  const [stats, setStats] = useLocalStorage<GameStats>('memoryGame_stats', {
    gamesPlayed: 0,
    gamesWon: 0,
    totalMoves: 0,
    fastestTime: 0,
    currentStreak: 0,
    achievements: [],
  });
  const [newAchievements, setNewAchievements] = useState<any[]>([]);
  const [lastDifficulty, setLastDifficulty] = useLocalStorage<Difficulty>(
    'memoryGame_lastDifficulty',
    'easy'
  );
  const [selectedTheme, setSelectedTheme] = useLocalStorage<Theme>(
    'memoryGame_selectedTheme',
    'emojis'
  );
  const [showStats, setShowStats] = useState(false);

  // Handle game start
  const handleStartGame = (difficulty: Difficulty) => {
    setLastDifficulty(difficulty);
    startGame(difficulty, selectedTheme);
    setShowStats(false);
  };

  // Handle theme change
  const handleThemeChange = (theme: Theme) => {
    setSelectedTheme(theme);
    // Restart with new theme
    startGame(gameState.difficulty, theme);
  };

  // Handle game win
  useEffect(() => {
    if (gameState.gameWon && gameState.gameActive) {
      const updatedStats: GameStats = {
        ...stats,
        gamesPlayed: stats.gamesPlayed + 1,
        gamesWon: stats.gamesWon + 1,
        totalMoves: stats.totalMoves + gameState.moves,
        fastestTime:
          stats.fastestTime === 0 || elapsedSeconds < stats.fastestTime
            ? elapsedSeconds
            : stats.fastestTime,
        currentStreak: stats.currentStreak + 1,
        achievements: stats.achievements,
      };

      const achievements = checkAchievements(updatedStats, elapsedSeconds, gameState.difficulty);
      const newAchievementDetails = getUnlockedAchievementDetails();
      
      setNewAchievements(achievements);
      updatedStats.achievements = newAchievementDetails;
      setStats(updatedStats);

      // Stop game after win
      setTimeout(() => {
        // Game won state is already set
      }, 100);
    }
  }, [gameState.gameWon]);

  // Show difficulty selector if no game is active
  if (!gameState.gameActive) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-900 to-black">
        {showStats ? (
          <div className="max-w-4xl mx-auto p-6 py-12">
            <button
              onClick={() => setShowStats(false)}
              className="mb-6 text-slate-400 hover:text-white transition-colors text-sm"
            >
              ← Back to Menu
            </button>
            <StatsDashboard
              stats={stats}
              onClearStats={() => {
                setStats({
                  gamesPlayed: 0,
                  gamesWon: 0,
                  totalMoves: 0,
                  fastestTime: 0,
                  currentStreak: 0,
                  achievements: [],
                });
              }}
            />
          </div>
        ) : (
          <>
            <DifficultySelector onSelectDifficulty={handleStartGame} />
            <div className="fixed bottom-6 left-6">
              <button
                onClick={() => setShowStats(true)}
                className="px-4 py-2 bg-slate-700/40 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-slate-600/40 transition-colors text-sm"
              >
                View Stats
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // Game is active - show game board
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-900 to-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
            Memory Game
          </h1>
          <p className="text-slate-400">Difficulty: {gameState.difficulty.toUpperCase()}</p>
        </div>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Board */}
          <div className="lg:col-span-2 bg-slate-800/40 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <GameBoard gameState={gameState} onCardClick={flipCard} />
          </div>

          {/* Sidebar */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <GameStatsComponent
              gameState={gameState}
              elapsedSeconds={elapsedSeconds}
              onRestart={restartGame}
              onNewGame={resetGame}
              onThemeChange={handleThemeChange}
            />
          </div>
        </div>
      </div>

      {/* Win Modal */}
      {gameState.gameWon && (
        <WinModal
          gameState={gameState}
          elapsedSeconds={elapsedSeconds}
          newAchievements={newAchievements}
          onRestart={restartGame}
          onNewGame={resetGame}
        />
      )}
    </div>
  );
}
