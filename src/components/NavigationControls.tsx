
import { cn } from '@/lib/utils';

interface NavigationControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onFlip: () => void;
  onToggleFullscreen: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  isFullscreen: boolean;
}

export const NavigationControls = ({
  onPrev,
  onNext,
  onFlip,
  onToggleFullscreen,
  canGoPrev,
  canGoNext,
  isFullscreen
}: NavigationControlsProps) => {
  return (
    <div className={cn(
      "flex justify-center items-center space-x-4 mt-8",
      isFullscreen && "fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40"
    )}>
      <div className={cn(
        "flex items-center space-x-4 p-4 rounded-2xl",
        isFullscreen ? "glass-effect" : "bg-white/80 backdrop-blur-sm border border-white/20"
      )}>
        <button
          onClick={onPrev}
          disabled={!canGoPrev}
          className={cn(
            "p-3 rounded-xl font-medium transition-all duration-200",
            canGoPrev
              ? "bg-slate-100 hover:bg-slate-200 text-slate-700 hover:scale-105"
              : "bg-slate-50 text-slate-400 cursor-not-allowed"
          )}
          title="Cartão anterior (←)"
        >
          <i className="fas fa-chevron-left mr-2"></i>
          Anterior
        </button>

        <button
          onClick={onFlip}
          className="p-3 rounded-xl bg-primary text-white hover:bg-primary-dark transition-all duration-200 hover:scale-105 font-medium"
          title="Virar cartão (Espaço/Enter)"
        >
          <i className="fas fa-sync-alt"></i>
        </button>

        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={cn(
            "p-3 rounded-xl font-medium transition-all duration-200",
            canGoNext
              ? "bg-slate-100 hover:bg-slate-200 text-slate-700 hover:scale-105"
              : "bg-slate-50 text-slate-400 cursor-not-allowed"
          )}
          title="Próximo cartão (→)"
        >
          Próximo
          <i className="fas fa-chevron-right ml-2"></i>
        </button>

        {!isFullscreen && (
          <div className="w-px h-8 bg-slate-300 mx-2"></div>
        )}

        <button
          onClick={onToggleFullscreen}
          className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200 hover:scale-105"
          title={isFullscreen ? "Sair da tela cheia (ESC)" : "Modo tela cheia"}
        >
          <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
        </button>
      </div>
    </div>
  );
};
