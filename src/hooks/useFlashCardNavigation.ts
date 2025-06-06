
import { useState, useCallback } from 'react';
import { FlashCardData } from '@/types/flashcard';

export const useFlashCardNavigation = (totalCards: number) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const nextCard = useCallback(() => {
    if (currentCardIndex < totalCards - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }, [currentCardIndex, totalCards]);

  const prevCard = useCallback(() => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setIsFlipped(false);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }, [currentCardIndex]);

  const flipCard = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const selectAnswer = useCallback((answerIndex: number, card: FlashCardData): boolean => {
    if (showResult) return false;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    // Auto-flip the card after selecting answer if it has alternatives
    if (card.alternativas && card.alternativas.length > 0) {
      setTimeout(() => {
        setIsFlipped(true);
      }, 800); // Small delay to show the result first
    }
    
    const isCorrect = card.alternativas?.[answerIndex]?.correto || false;
    return isCorrect;
  }, [showResult]);

  const resetCard = useCallback(() => {
    setIsFlipped(false);
    setSelectedAnswer(null);
    setShowResult(false);
  }, []);

  return {
    currentCardIndex,
    isFlipped,
    selectedAnswer,
    showResult,
    nextCard,
    prevCard,
    flipCard,
    selectAnswer,
    resetCard
  };
};
