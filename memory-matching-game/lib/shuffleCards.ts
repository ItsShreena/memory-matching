import { Card } from './types';

export function shuffleCards(cards: Card[]): Card[] {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function createCards(items: string[]): Card[] {
  const cards: Card[] = [];
  let cardId = 0;

  // Create pairs
  items.forEach((item) => {
    for (let i = 0; i < 2; i++) {
      cards.push({
        id: `card-${cardId}`,
        content: item,
        isFlipped: false,
        isMatched: false,
      });
      cardId++;
    }
  });

  return shuffleCards(cards);
}
