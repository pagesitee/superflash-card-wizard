
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
      return <i className="fas fa-check text-success ml-auto"></i>;
    }

    if (selectedAnswer === index && !alternative.correto) {
      return <i className="fas fa-times text-error ml-auto"></i>;
    }

    return null;
  };

  return (
    <div className={cn("flip-card", isFlipped && "flipped", className)}>
      <div className="flip-card-inner h-full">
        {/* Front of card */}
        <div className="flip-card-front p-8 flex flex-col">
          {/* Card header */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm font-medium text-muted-foreground">
              Cartão {cardNumber} de {totalCards}
            </div>
            <button
              onClick={onFlip}
              className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              title="Virar cartão (Espaço/Enter)"
            >
              <i className="fas fa-sync-alt text-sm"></i>
            </button>
          </div>

          {/* Question */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 leading-relaxed">
              {card.pergunta}
            </h2>

            {/* Alternatives */}
            {hasAlternatives && (
              <div className="space-y-3 max-w-2xl mx-auto w-full">
                {card.alternativas!.map((alternative, index) => (
                  <button
                    key={index}
                    onClick={() => !showResult && onAnswerSelect(index)}
                    disabled={showResult}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 text-left flex items-center",
                      getAlternativeClass(index, alternative)
                    )}
                  >
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center mr-3 text-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1 font-medium">{alternative.texto}</span>
                    {getAlternativeIcon(index, alternative)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {hasAlternatives ? "Selecione uma alternativa" : "Clique para ver a resposta"} 
              <span className="ml-2">ou pressione <kbd className="px-2 py-1 bg-slate-100 rounded text-xs">Espaço</kbd></span>
            </p>
          </div>
        </div>

        {/* Back of card */}
        <div className="flip-card-back p-8 flex flex-col justify-center items-center text-center">
          <div className="mb-4">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Cartão {cardNumber} de {totalCards}
            </div>
            <h3 className="text-xl font-semibold text-primary mb-6">Resposta Correta</h3>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-2xl">
            <div className="bg-success/10 border border-success/20 rounded-xl p-6 mb-6">
              <h4 className="text-2xl font-bold text-success mb-2">
                {card.resposta}
              </h4>
            </div>

            {card.explicacao && (
              <div className="bg-slate-50 rounded-xl p-6">
                <h5 className="font-semibold text-slate-700 mb-3">Explicação:</h5>
                <p className="text-slate-600 leading-relaxed">{card.explicacao}</p>
              </div>
            )}
          </div>

          <button
            onClick={onFlip}
            className="mt-6 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-medium"
          >
            <i className="fas fa-sync-alt mr-2"></i>
            Ver pergunta novamente
          </button>
        </div>
      </div>
    </div>
  );
};
