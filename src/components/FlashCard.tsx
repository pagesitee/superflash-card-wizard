
import { FlashCardData } from '@/types/flashcard';
import { cn } from '@/lib/utils';

interface FlashCardProps {
  card: FlashCardData;
  cardNumber: number;
  totalCards: number;
  isFlipped: boolean;
  selectedAnswer: number | null;
  showResult: boolean;
  onFlip: () => void;
  onAnswerSelect: (index: number) => void;
  className?: string;
}

export const FlashCard = ({
  card,
  cardNumber,
  totalCards,
  isFlipped,
  selectedAnswer,
  showResult,
  onFlip,
  onAnswerSelect,
  className
}: FlashCardProps) => {
  const hasAlternatives = card.alternativas && card.alternativas.length > 0;

  const handleAnswerClick = (index: number) => {
    if (showResult) return; // Prevent multiple clicks
    onAnswerSelect(index);
  };

  const getAlternativeClass = (index: number, alternative: any) => {
    if (!showResult) {
      return "bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-primary/30 text-slate-700 hover:text-primary transition-all duration-200 cursor-pointer";
    }

    if (alternative.correto) {
      return "bg-success/10 border-success text-success-foreground";
    }

    if (selectedAnswer === index && !alternative.correto) {
      return "bg-error/10 border-error text-error";
    }

    return "bg-slate-50 border-slate-200 text-slate-500";
  };

  const getAlternativeIcon = (index: number, alternative: any) => {
    if (!showResult) return null;

    if (alternative.correto) {
      return <i className="fas fa-check text-success ml-auto flex-shrink-0"></i>;
    }

    if (selectedAnswer === index && !alternative.correto) {
      return <i className="fas fa-times text-error ml-auto flex-shrink-0"></i>;
    }

    return null;
  };

  return (
    <div className={cn("flip-card", isFlipped && "flipped", className)}>
      <div className="flip-card-inner h-full">
        {/* Front of card */}
        <div className="flip-card-front p-4 sm:p-6 md:p-8 flex flex-col min-h-full">
          {/* Card header */}
          <div className="flex justify-between items-center mb-4 sm:mb-6 flex-shrink-0">
            <div className="text-xs sm:text-sm font-medium text-muted-foreground">
              Cartão {cardNumber} de {totalCards}
            </div>
            {!hasAlternatives && (
              <button
                onClick={onFlip}
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex-shrink-0"
                title="Virar cartão (Espaço/Enter)"
              >
                <i className="fas fa-sync-alt text-sm"></i>
              </button>
            )}
          </div>

          {/* Question */}
          <div className="flex-1 flex flex-col justify-center min-h-0">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-4 sm:mb-6 md:mb-8 leading-relaxed break-words">
              {card.pergunta}
            </h2>

            {/* Alternatives */}
            {hasAlternatives && (
              <div className="space-y-2 sm:space-y-3 max-w-full mx-auto w-full overflow-y-auto max-h-96">
                {card.alternativas!.map((alternative, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={showResult}
                    className={cn(
                      "w-full p-3 sm:p-4 rounded-xl border-2 text-left flex items-start sm:items-center gap-3 min-h-[60px] transition-all duration-200",
                      getAlternativeClass(index, alternative),
                      showResult && "cursor-default"
                    )}
                  >
                    <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center text-xs sm:text-sm flex-shrink-0 mt-1 sm:mt-0">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1 font-medium text-sm sm:text-base break-words leading-relaxed">
                      {alternative.texto}
                    </span>
                    {getAlternativeIcon(index, alternative)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-4 sm:mt-6 text-center flex-shrink-0">
            <p className="text-xs sm:text-sm text-muted-foreground">
              {hasAlternatives ? "Selecione uma alternativa" : "Clique para ver a resposta"} 
              {!hasAlternatives && (
                <span className="ml-2">ou pressione <kbd className="px-2 py-1 bg-slate-100 rounded text-xs">Espaço</kbd></span>
              )}
            </p>
          </div>
        </div>

        {/* Back of card */}
        <div className="flip-card-back p-4 sm:p-6 md:p-8 flex flex-col justify-center items-center text-center min-h-full">
          <div className="mb-4 flex-shrink-0">
            <div className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">
              Cartão {cardNumber} de {totalCards}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-primary mb-4 sm:mb-6">Resposta Correta</h3>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-full w-full overflow-y-auto">
            <div className="bg-success/10 border border-success/20 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-success mb-2 break-words leading-relaxed">
                {card.resposta}
              </h4>
            </div>

            {card.explicacao && (
              <div className="bg-slate-50 rounded-xl p-4 sm:p-6">
                <h5 className="font-semibold text-slate-700 mb-3 text-sm sm:text-base">Explicação:</h5>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base break-words">{card.explicacao}</p>
              </div>
            )}
          </div>

          <button
            onClick={onFlip}
            className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-medium text-sm sm:text-base flex-shrink-0"
          >
            <i className="fas fa-sync-alt mr-2"></i>
            Ver pergunta novamente
          </button>
        </div>
      </div>
    </div>
  );
};
