import { Sparkles, ChevronRight } from 'lucide-react';
import { getAISummary } from '@/react-app/data/mockData';

export default function AISummary() {
  const summary = getAISummary();

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border border-primary/20 p-4">
      {/* Subtle animated glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 animate-pulse" />
      
      <div className="relative flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              AI Summary
            </span>
            <span className="text-xs text-muted-foreground">
              Updated just now
            </span>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            {summary}
          </p>
        </div>

        <button className="flex-shrink-0 p-2 rounded-lg hover:bg-primary/10 transition-colors group">
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
      </div>
    </div>
  );
}
