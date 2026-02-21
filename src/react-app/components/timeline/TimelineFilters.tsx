import { MessageSquare, CheckSquare, Calendar, Palmtree } from 'lucide-react';
import { cn } from '@/react-app/lib/utils';
import { Button } from '@/react-app/components/ui/button';

export type FilterType = 'all' | 'message' | 'task' | 'meeting' | 'leave';

interface TimelineFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: Record<FilterType, number>;
}

const filters = [
  { id: 'all' as const, label: 'All', icon: null },
  { id: 'message' as const, label: 'Messages', icon: MessageSquare },
  { id: 'task' as const, label: 'Tasks', icon: CheckSquare },
  { id: 'meeting' as const, label: 'Meetings', icon: Calendar },
  { id: 'leave' as const, label: 'HR', icon: Palmtree },
];

export default function TimelineFilters({ activeFilter, onFilterChange, counts }: TimelineFiltersProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        const Icon = filter.icon;
        const count = counts[filter.id];
        
        return (
          <Button
            key={filter.id}
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange(filter.id)}
            className={cn(
              'h-8 px-3 text-sm font-medium transition-all',
              isActive 
                ? 'bg-background shadow-sm text-foreground' 
                : 'text-muted-foreground hover:text-foreground hover:bg-transparent'
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5 mr-1.5" />}
            {filter.label}
            {count > 0 && (
              <span className={cn(
                'ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full',
                isActive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
              )}>
                {count}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
}
