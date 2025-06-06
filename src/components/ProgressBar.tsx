
interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full bg-white/50 backdrop-blur-sm border-b border-white/20 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">
            Progresso do Estudo
          </span>
          <span className="text-sm font-semibold text-primary">
            {current} de {total} ({percentage}%)
          </span>
        </div>
        
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          >
            <div className="h-full bg-white/20 animate-pulse-gentle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
