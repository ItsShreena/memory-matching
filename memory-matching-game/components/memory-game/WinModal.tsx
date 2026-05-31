'use client';

import { GameState, Achievement } from '@/lib/types';
import { formatTime } from '@/hooks/useTimer';
import { Button } from '@/components/ui/button';
import { useConfetti } from '@/hooks/useConfetti';
import { RotateCcw, RotateCw } from 'lucide-react';

interface WinModalProps {
  gameState: GameState;
  elapsedSeconds: number;
  newAchievements: Achievement[];
  onRestart: () => void;
  onNewGame: () => void;
}

export function WinModal({
  gameState,
  elapsedSeconds,
  newAchievements,
  onRestart,
  onNewGame,
}: WinModalProps) {
  const canvasRef = useConfetti(true);
  const score = Math.max(0, 1000 - gameState.moves * 5 - elapsedSeconds);

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      {/* Canvas for confetti */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
      />

      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative max-w-md w-full">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-white/20 p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold mb-2">🎉</h2>
            <h2 className="text-3xl font-bold text-white mb-1">You Won!</h2>
            <p className="text-slate-400">Congratulations on completing the game</p>
          </div>

          {/* Stats */}
          <div className="space-y-3 mb-6 p-4 bg-slate-700/30 rounded-lg border border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Time</span>
              <span className="text-lg font-bold text-white">
                {formatTime(elapsedSeconds)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Moves</span>
              <span className="text-lg font-bold text-white">{gameState.moves}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Score</span>
              <span className="text-lg font-bold text-white">{score}</span>
            </div>
          </div>

          {/* New Achievements */}
          {newAchievements.length > 0 && (
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-400/20">
              <p className="text-sm text-blue-300 font-semibold mb-2">
                ✨ New Achievements Unlocked!
              </p>
              <div className="space-y-1">
                {newAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-2">
                    <span className="text-lg">{achievement.icon}</span>
                    <div>
                      <p className="text-white text-sm font-semibold">
                        {achievement.name}
                      </p>
                      <p className="text-blue-200 text-xs">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2">
            <Button
              onClick={onRestart}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
            <Button
              onClick={onNewGame}
              variant="outline"
              className="w-full"
            >
              <RotateCw className="w-4 h-4 mr-2" />
              Change Difficulty
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
