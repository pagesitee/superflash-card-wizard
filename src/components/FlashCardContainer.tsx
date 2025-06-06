
import { FlashCard } from './FlashCard';
import { FlashCardData } from '@/types/flashcard';

interface FlashCardContainerProps {
  card: FlashCardData;
  cardNumber: number;
  totalCards: number;
  isFlipped: boolean;
  selectedAnswer: number | null;
  showResult: boolean;
  onFlip: () => void;
  onAnswerSelect: (index: number) => void;
  isFullscreen: boolean;
}

export const FlashCardContainer = ({
  card,
  cardNumber,
  totalCards,
  isFlipped,
  selectedAnswer,
  showResult,
  onFlip,
  onAnswerSelect,
  isFullscreen
}: FlashCardContainerProps) => {
  return (
    <div className="flex justify-center items-center">
      <div className={`${isFullscreen ? 'w-full max-w-6xl h-[90vh]' : 'w-full max-w-3xl h-[500px]'} transition-all duration-300`}>
        <FlashCard
          card={card}
          cardNumber={cardNumber}
          totalCards={totalCards}
          isFlipped={isFlipped}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          onFlip={onFlip}
          onAnswerSelect={onAnswerSelect}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};
