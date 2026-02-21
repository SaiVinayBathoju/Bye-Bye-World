import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import {
  Home,
  MessageSquare,
  CheckSquare,
  Users,
  Calendar,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Hash,
  Lock,
  Plus,
} from 'lucide-react';
import { cn } from '@/react-app/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/react-app/components/ui/avatar';
import { Badge } from '@/react-app/components/ui/badge';
import { Button } from '@/react-app/components/ui/button';
import { ScrollArea } from '@/react-app/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/react-app/components/ui/tooltip';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/react-app/components/ui/collapsible';
import { currentUser, channels, directMessages, getUserById } from '@/react-app/data/mockData';

const mainNavItems = [
  { icon: Home, label: 'Home', path: '/', badge: 0 },
  { icon: MessageSquare, label: 'Messages', path: '/messages', badge: 8 },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks', badge: 3 },
  { icon: Users, label: 'People', path: '/people', badge: 0 },
  { icon: Calendar, label: 'Calendar', path: '/calendar', badge: 1 },
];

export default function Sidebar() {
  const location = useLocation();
  const [channelsOpen, setChannelsOpen] = useState(true);
  const [dmsOpen, setDmsOpen] = useState(true);

  const totalNotifications = mainNavItems.reduce((acc, item) => acc + item.badge, 0);

  return (
    <TooltipProvider delayDuration={0}>
      <div className="w-64 h-screen bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-semibold text-sidebar-accent-foreground">Bye-bye World</span>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent relative">
                  <Bell className="h-4 w-4" />
                  {totalNotifications > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
                      {totalNotifications > 9 ? '9+' : totalNotifications}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Notifications</TooltipContent>
            </Tooltip>
          </div>

          {/* Search */}
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-sidebar-accent/50 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors text-sm">
            <Search className="h-4 w-4" />
            <span>Search everything...</span>
            <kbd className="ml-auto text-[10px] bg-sidebar-border px-1.5 py-0.5 rounded">⌘K</kbd>
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="p-2">
          {mainNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.badge > 0 && (
                  <Badge
                    variant={isActive ? 'secondary' : 'default'}
                    className={cn(
                      'ml-auto h-5 min-w-5 px-1.5 flex items-center justify-center text-[10px]',
                      isActive ? 'bg-white/20 text-white' : ''
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Scrollable Channels & DMs */}
        <ScrollArea className="flex-1 px-2">
          {/* Channels */}
          <Collapsible open={channelsOpen} onOpenChange={setChannelsOpen} className="mb-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider hover:text-sidebar-foreground transition-colors">
              <span>Channels</span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <ChevronDown className={cn('h-3 w-3 transition-transform', channelsOpen && 'rotate-180')} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {channels.map((channel) => (
                <Link
                  key={channel.id}
                  to={`/messages/channel/${channel.id}`}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                >
                  {channel.isPrivate ? (
                    <Lock className="h-3.5 w-3.5 text-sidebar-foreground/50" />
                  ) : (
                    <Hash className="h-3.5 w-3.5 text-sidebar-foreground/50" />
                  )}
                  <span className="truncate">{channel.name}</span>
                  {channel.unreadCount > 0 && (
                    <Badge variant="default" className="ml-auto h-5 min-w-5 px-1.5 text-[10px]">
                      {channel.unreadCount}
                    </Badge>
                  )}
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Direct Messages */}
          <Collapsible open={dmsOpen} onOpenChange={setDmsOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider hover:text-sidebar-foreground transition-colors">
              <span>Direct Messages</span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <ChevronDown className={cn('h-3 w-3 transition-transform', dmsOpen && 'rotate-180')} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {directMessages.map((dm) => {
                const user = getUserById(dm.userId);
                if (!user) return null;
                return (
                  <Link
                    key={dm.id}
                    to={`/messages/dm/${dm.userId}`}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                  >
                    <div className="relative">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-[10px]">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span
                        className={cn(
                          'absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-sidebar',
                          user.status === 'online' && 'bg-green-500',
                          user.status === 'away' && 'bg-yellow-500',
                          user.status === 'offline' && 'bg-gray-400'
                        )}
                      />
                    </div>
                    <span className="truncate">{user.name}</span>
                    {dm.unreadCount > 0 && (
                      <Badge variant="default" className="ml-auto h-5 min-w-5 px-1.5 text-[10px]">
                        {dm.unreadCount}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        </ScrollArea>

        {/* User Profile */}
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-9 w-9">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-accent-foreground truncate">
                {currentUser.name}
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                {currentUser.role}
              </p>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent">
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Settings</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
