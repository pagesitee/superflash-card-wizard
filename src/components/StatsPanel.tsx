
interface StatsPanelProps {
  stats: {
    totalAnswered: number;
    correctAnswers: number;
    cardStats: Record<number, { correct: number; total: number }>;
  };
  currentCardStats?: { correct: number; total: number };
  onReset: () => void;
}

export const StatsPanel = ({ stats, currentCardStats, onReset }: StatsPanelProps) => {
  const accuracy = stats.totalAnswered > 0 ? Math.round((stats.correctAnswers / stats.totalAnswered) * 100) : 0;
  const currentCardAccuracy = currentCardStats && currentCardStats.total > 0 
    ? Math.round((currentCardStats.correct / currentCardStats.total) * 100) 
    : null;

  return (
    <div className="bg-white/80 backdrop-blur-sm border-t border-white/20 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="text-lg font-bold text-slate-700">{stats.totalAnswered}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-bold text-success">{stats.correctAnswers}</div>
              <div className="text-xs text-muted-foreground">Corretas</div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-bold text-error">{stats.totalAnswered - stats.correctAnswers}</div>
              <div className="text-xs text-muted-foreground">Erradas</div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{accuracy}%</div>
              <div className="text-xs text-muted-foreground">Precisão</div>
            </div>

            {currentCardAccuracy !== null && (
              <div className="text-center">
                <div className="text-lg font-bold text-primary-dark">{currentCardAccuracy}%</div>
                <div className="text-xs text-muted-foreground">Este cartão</div>
              </div>
            )}
          </div>

          <button
            onClick={onReset}
            className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
            title="Resetar estatísticas"
          >
            <i className="fas fa-refresh mr-2"></i>
            Resetar
          </button>
        </div>
      </div>
    </div>
  );
};
