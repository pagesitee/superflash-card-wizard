
import { useState, useEffect, useCallback } from 'react';
import { FlashCardContainer } from '@/components/FlashCardContainer';
import { ProgressBar } from '@/components/ProgressBar';
import { NavigationControls } from '@/components/NavigationControls';
import { Header } from '@/components/Header';
import { StatsPanel } from '@/components/StatsPanel';
import { flashcardsData } from '@/data/flashcards';
import { useFlashCardNavigation } from '@/hooks/useFlashCardNavigation';
import { useFullscreen } from '@/hooks/useFullscreen';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useSwipeGestures } from '@/hooks/useSwipeGestures';

const Index = () => {
  const [stats, setStats] = useLocalStorage('superflashcards-stats', {
    totalAnswered: 0,
    correctAnswers: 0,
    cardStats: {} as Record<number, { correct: number; total: number }>
  });

  const {
    currentCardIndex,
    isFlipped,
    selectedAnswer,
    showResult,
    nextCard,
    prevCard,
    flipCard,
    selectAnswer,
    resetCard
  } = useFlashCardNavigation(flashcardsData.length);

  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const updateStats = useCallback((cardIndex: number, isCorrect: boolean) => {
    setStats(prev => ({
      ...prev,
      totalAnswered: prev.totalAnswered + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      cardStats: {
        ...prev.cardStats,
        [cardIndex]: {
          correct: (prev.cardStats[cardIndex]?.correct || 0) + (isCorrect ? 1 : 0),
          total: (prev.cardStats[cardIndex]?.total || 0) + 1
        }
      }
    }));
  }, [setStats]);

  const handleAnswerSelect = useCallback((answerIndex: number) => {
    const isCorrect = selectAnswer(answerIndex, flashcardsData[currentCardIndex]);
    if (showResult) {
      updateStats(currentCardIndex, isCorrect);
    }
  }, [selectAnswer, currentCardIndex, showResult, updateStats]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevCard();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextCard();
          break;
        case ' ':
        case 'Enter':
          e.preventDefault();
          flipCard();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextCard, prevCard, flipCard]);

  // Swipe gestures
  useSwipeGestures({
    onSwipeLeft: nextCard,
    onSwipeRight: prevCard
  });

  const currentCard = flashcardsData[currentCardIndex];
  const accuracy = stats.totalAnswered > 0 ? Math.round((stats.correctAnswers / stats.totalAnswered) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 font-poppins">
      {!isFullscreen && (
        <>
          <Header 
            onToggleFullscreen={toggleFullscreen}
            accuracy={accuracy}
            totalAnswered={stats.totalAnswered}
          />
          <ProgressBar 
            current={currentCardIndex + 1} 
            total={flashcardsData.length} 
          />
        </>
      )}

      <main className={`${isFullscreen ? 'h-screen' : 'min-h-[calc(100vh-200px)]'} flex items-center justify-center p-4`}>
        <div className="w-full max-w-4xl mx-auto">
          <FlashCardContainer
            card={currentCard}
            cardNumber={currentCardIndex + 1}
            totalCards={flashcardsData.length}
            isFlipped={isFlipped}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            onFlip={flipCard}
            onAnswerSelect={handleAnswerSelect}
            isFullscreen={isFullscreen}
          />

          <NavigationControls
            onPrev={prevCard}
            onNext={nextCard}
            onFlip={flipCard}
            onToggleFullscreen={toggleFullscreen}
            canGoPrev={currentCardIndex > 0}
            canGoNext={currentCardIndex < flashcardsData.length - 1}
            isFullscreen={isFullscreen}
          />
        </div>
      </main>

      {!isFullscreen && (
        <StatsPanel
          stats={stats}
          currentCardStats={stats.cardStats[currentCardIndex]}
          onReset={() => setStats({
            totalAnswered: 0,
            correctAnswers: 0,
            cardStats: {}
          })}
        />
      )}

      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="fixed top-4 right-4 z-50 bg-black/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/30 transition-colors"
          title="Sair da tela cheia (ESC)"
        >
          <i className="fas fa-compress text-lg"></i>
        </button>
      )}
    </div>
  );
};

export default Index;
