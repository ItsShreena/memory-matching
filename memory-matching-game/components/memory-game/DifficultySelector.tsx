'use client';

import { Difficulty } from '@/lib/types';
import { DIFFICULTY_CONFIG } from '@/lib/constants';
import { Button } from '@/components/ui/button';

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

export function DifficultySelector({ onSelectDifficulty }: DifficultySelectorProps) {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Memory Game</h1>
          <p className="text-slate-400">Select a difficulty level to begin</p>
        </div>

        <div className="grid gap-4">
          {difficulties.map((difficulty) => {
            const config = DIFFICULTY_CONFIG[difficulty];
            return (
              <button
                key={difficulty}
                onClick={() => onSelectDifficulty(difficulty)}
                className="group relative overflow-hidden rounded-lg p-6 text-left transition-all hover:scale-105"
              >
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-white/10 group-hover:border-blue-400/30 transition-all" />

                {/* Content */}
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white mb-1 capitalize">
                    {difficulty}
                  </h2>
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                    {config.description}
                  </p>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-blue-500 to-purple-500 transition-opacity" />
              </button>
            );
          })}
        </div>

        {/* Info section */}
        <div className="mt-8 p-6 bg-slate-700/20 backdrop-blur-sm rounded-lg border border-white/10">
          <h3 className="text-white font-semibold mb-2">How to Play</h3>
          <ul className="space-y-1 text-sm text-slate-400">
            <li>• Click cards to reveal them</li>
            <li>• Match pairs of identical cards</li>
            <li>• Try to complete the game in the fewest moves</li>
            <li>• Unlock achievements and track your stats</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
