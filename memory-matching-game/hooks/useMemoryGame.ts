import { useState, useCallback, useEffect } from 'react';
import { Card, Difficulty, Theme, GameState } from '@/lib/types';
import { DIFFICULTY_CONFIG, CARD_THEMES, NON_MATCH_FLIP_DELAY, FLIP_CARD_ANIMATION_DURATION } from '@/lib/constants';
import { createCards, shuffleCards } from '@/lib/shuffleCards';

export function useMemoryGame() {
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    gameActive: false,
    gameWon: false,
    difficulty: 'easy',
    theme: 'emojis',
    startTime: null,
    elapsedSeconds: 0,
  });

  const [autoFlipTimeout, setAutoFlipTimeout] = useState<NodeJS.Timeout | null>(null);

  // Initialize game
  const startGame = useCallback((difficulty: Difficulty, theme: Theme) => {
    const themeItems = (CARD_THEMES[theme] as any).items || CARD_THEMES.emojis.items;
    const config = DIFFICULTY_CONFIG[difficulty];
    const pairsNeeded = (config.rows * config.cols) / 2;
    const selectedItems = themeItems.slice(0, pairsNeeded);
    const newCards = createCards(selectedItems);

    setGameState({
      cards: newCards,
      flippedCards: [],
      matchedPairs: 0,
      moves: 0,
      gameActive: true,
      gameWon: false,
      difficulty,
      theme,
      startTime: Date.now(),
      elapsedSeconds: 0,
    });
  }, []);

  // Handle card flip
  const flipCard = useCallback((cardId: string) => {
    if (!gameState.gameActive || gameState.flippedCards.length >= 2) return;

    const card = gameState.cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newFlippedCards = [...gameState.flippedCards, cardId];
    const newCards = gameState.cards.map((c) =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );

    setGameState((prev) => ({
      ...prev,
      cards: newCards,
      flippedCards: newFlippedCards,
    }));

    // Check for match after both cards are flipped
    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards;
      const firstCard = newCards.find((c) => c.id === first)!;
      const secondCard = newCards.find((c) => c.id === second)!;

      if (firstCard.content === secondCard.content) {
        // Match found
        const updatedCards = newCards.map((c) =>
          c.id === first || c.id === second ? { ...c, isMatched: true } : c
        );
        const newMatchedPairs = gameState.matchedPairs + 1;
        const totalPairs = gameState.cards.length / 2;

        setGameState((prev) => ({
          ...prev,
          cards: updatedCards,
          flippedCards: [],
          matchedPairs: newMatchedPairs,
          moves: prev.moves + 1,
          gameWon: newMatchedPairs === totalPairs,
        }));
      } else {
        // No match - flip back after delay
        if (autoFlipTimeout) clearTimeout(autoFlipTimeout);

        const timeout = setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            cards: prev.cards.map((c) =>
              c.id === first || c.id === second ? { ...c, isFlipped: false } : c
            ),
            flippedCards: [],
            moves: prev.moves + 1,
          }));
        }, NON_MATCH_FLIP_DELAY);

        setAutoFlipTimeout(timeout);
      }
    }
  }, [gameState, autoFlipTimeout]);

  // Restart game with same settings
  const restartGame = useCallback(() => {
    startGame(gameState.difficulty, gameState.theme);
  }, [gameState.difficulty, gameState.theme, startGame]);

  // Reset game state
  const resetGame = useCallback(() => {
    if (autoFlipTimeout) clearTimeout(autoFlipTimeout);
    setGameState({
      cards: [],
      flippedCards: [],
      matchedPairs: 0,
      moves: 0,
      gameActive: false,
      gameWon: false,
      difficulty: 'easy',
      theme: 'emojis',
      startTime: null,
      elapsedSeconds: 0,
    });
  }, [autoFlipTimeout]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoFlipTimeout) clearTimeout(autoFlipTimeout);
    };
  }, [autoFlipTimeout]);

  return {
    gameState,
    startGame,
    flipCard,
    restartGame,
    resetGame,
  };
}
