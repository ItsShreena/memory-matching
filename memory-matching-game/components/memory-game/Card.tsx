'use client';

import { Card as CardType } from '@/lib/types';
import { FLIP_CARD_ANIMATION_DURATION } from '@/lib/constants';
import { useEffect, useState } from 'react';

interface CardProps {
  card: CardType;
  onClick: () => void;
  disabled: boolean;
}

export function Card({ card, onClick, disabled }: CardProps) {
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (!card.isFlipped && card.isMatched) {
      setIsFlipping(false);
    }
  }, [card]);

  const handleClick = () => {
    if (!disabled && !card.isMatched) {
      onClick();
      setIsFlipping(true);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || card.isMatched}
      className="relative w-full h-full perspective transition-transform duration-100 hover:scale-105 disabled:cursor-not-allowed"
      style={{
        transformStyle: 'preserve-3d',
        transform: card.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        transitionDuration: isFlipping ? `${FLIP_CARD_ANIMATION_DURATION}ms` : '100ms',
      } as any}
      aria-label={`Card ${card.id}`}
    >
      {/* Back of card */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center border border-white/20 shadow-lg"
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        } as any}
      >
        <div className="text-2xl">?</div>
      </div>

      {/* Front of card */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center border border-white/20 shadow-lg"
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        } as any}
      >
        <div className="text-3xl">{card.content}</div>
      </div>
    </button>
  );
}
