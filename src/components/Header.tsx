
interface HeaderProps {
  onToggleFullscreen: () => void;
  accuracy: number;
  totalAnswered: number;
}

export const Header = ({ onToggleFullscreen, accuracy, totalAnswered }: HeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
            <i className="fas fa-brain text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              SuperFlashCards
            </h1>
            <p className="text-sm text-muted-foreground">Estude de forma inteligente</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {totalAnswered > 0 && (
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{accuracy}%</div>
              <div className="text-xs text-muted-foreground">Precisão</div>
            </div>
          )}
          
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-700">{totalAnswered}</div>
            <div className="text-xs text-muted-foreground">Respondidas</div>
          </div>

          <button
            onClick={onToggleFullscreen}
            className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            title="Modo tela cheia"
          >
            <i className="fas fa-expand"></i>
          </button>
        </div>
      </div>
    </header>
  );
};
