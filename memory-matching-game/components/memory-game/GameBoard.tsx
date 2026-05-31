'use client';

import { GameState } from '@/lib/types';
import { DIFFICULTY_CONFIG } from '@/lib/constants';
import { Card } from './Card';

interface GameBoardProps {
  gameState: GameState;
  onCardClick: (cardId: string) => void;
}

export function GameBoard({ gameState, onCardClick }: GameBoardProps) {
  const config = DIFFICULTY_CONFIG[gameState.difficulty];
  const totalPairs = gameState.cards.length / 2;
  const completionPercentage = (gameState.matchedPairs / totalPairs) * 100;
  const isDisabled = gameState.flippedCards.length >= 2;

  return (
    <div className="w-full space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400">Progress</span>
          <span className="text-white font-semibold">
            {gameState.matchedPairs}/{totalPairs} pairs
          </span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Game Grid */}
      <div
        className="gap-3 auto-rows-fr"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${config.cols}, 1fr)`,
        }}
      >
        {gameState.cards.map((card) => (
          <div key={card.id} className="aspect-square">
            <Card
              card={card}
              onClick={() => onCardClick(card.id)}
              disabled={isDisabled}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
