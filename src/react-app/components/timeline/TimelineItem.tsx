import { 
  MessageSquare, 
  CheckSquare, 
  Calendar, 
  Palmtree,
  ArrowRight,
  Clock,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/react-app/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/react-app/components/ui/avatar';
import { Badge } from '@/react-app/components/ui/badge';
import { TimelineEvent, getUserById } from '@/react-app/data/mockData';

interface TimelineItemProps {
  event: TimelineEvent;
}

const eventTypeConfig = {
  message: {
    icon: MessageSquare,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    label: 'Message',
  },
  task: {
    icon: CheckSquare,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    label: 'Task',
  },
  meeting: {
    icon: Calendar,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    label: 'Meeting',
  },
  leave: {
    icon: Palmtree,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    label: 'HR',
  },
};

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function TimelineItem({ event }: TimelineItemProps) {
  const config = eventTypeConfig[event.type];
  const Icon = config.icon;
  const user = getUserById(event.userId);

  return (
    <div 
      className={cn(
        'group relative flex gap-4 p-4 rounded-xl border transition-all duration-200',
        'hover:shadow-md hover:border-border/80',
        event.isRead 
          ? 'bg-card border-border/50' 
          : 'bg-card border-l-2 border-l-primary shadow-sm'
      )}
    >
      {/* Event Type Icon */}
      <div className={cn(
        'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center',
        config.bgColor
      )}>
        <Icon className={cn('h-5 w-5', config.color)} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge 
              variant="outline" 
              className={cn(
                'text-[10px] font-medium uppercase tracking-wider px-1.5 py-0',
                config.color,
                config.borderColor
              )}
            >
              {config.label}
            </Badge>
            <span className="text-sm font-medium text-foreground">
              {event.title}
            </span>
            {!event.isRead && (
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
            <Clock className="h-3 w-3" />
            {formatTime(event.timestamp)}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          {event.description}
        </p>

        {/* Metadata & Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {user && (
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-[10px]">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{user.name}</span>
              </div>
            )}
            
            {/* Additional metadata based on event type */}
            {event.type === 'task' && typeof event.metadata.priority === 'string' && (
              <Badge 
                variant="outline" 
                className={cn(
                  'text-[10px]',
                  event.metadata.priority === 'urgent' && 'border-red-500/50 text-red-500',
                  event.metadata.priority === 'high' && 'border-orange-500/50 text-orange-500',
                  event.metadata.priority === 'medium' && 'border-yellow-500/50 text-yellow-500',
                  event.metadata.priority === 'low' && 'border-green-500/50 text-green-500'
                )}
              >
                {event.metadata.priority}
              </Badge>
            )}
            
            {event.type === 'meeting' && typeof event.metadata.duration === 'number' && (
              <span className="text-xs text-muted-foreground">
                {event.metadata.duration} min
              </span>
            )}
          </div>

          {/* Action Button */}
          <button className="flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:underline">
            {event.type === 'message' && 'View conversation'}
            {event.type === 'task' && 'Open task'}
            {event.type === 'meeting' && (event.metadata.completed === true ? 'View notes' : 'Join meeting')}
            {event.type === 'leave' && 'View details'}
            {event.type === 'meeting' && event.metadata.completed !== true ? (
              <ExternalLink className="h-3 w-3" />
            ) : (
              <ArrowRight className="h-3 w-3" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
