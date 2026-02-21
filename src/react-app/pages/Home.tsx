import { useState, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import MainLayout from '@/react-app/components/layout/MainLayout';
import AISummary from '@/react-app/components/timeline/AISummary';
import TimelineItem from '@/react-app/components/timeline/TimelineItem';
import TimelineFilters, { FilterType } from '@/react-app/components/timeline/TimelineFilters';
import { Button } from '@/react-app/components/ui/button';
import { timelineEvents } from '@/react-app/data/mockData';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredEvents = useMemo(() => {
    if (activeFilter === 'all') return timelineEvents;
    return timelineEvents.filter(event => event.type === activeFilter);
  }, [activeFilter]);

  const counts = useMemo(() => ({
    all: timelineEvents.length,
    message: timelineEvents.filter(e => e.type === 'message').length,
    task: timelineEvents.filter(e => e.type === 'task').length,
    meeting: timelineEvents.filter(e => e.type === 'meeting').length,
    leave: timelineEvents.filter(e => e.type === 'leave').length,
  }), []);

  const unreadCount = filteredEvents.filter(e => !e.isRead).length;

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-semibold text-foreground">
              Good morning, Sarah
            </h1>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          <p className="text-muted-foreground">
            Here's what's happening across your workspace today.
          </p>
        </div>

        {/* AI Summary */}
        <div className="mb-8">
          <AISummary />
        </div>

        {/* Timeline Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-medium text-foreground">Timeline</h2>
              {unreadCount > 0 && (
                <span className="text-sm text-muted-foreground">
                  {unreadCount} new
                </span>
              )}
            </div>
            <TimelineFilters 
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              counts={counts}
            />
          </div>

          {/* Timeline Events */}
          <div className="space-y-3">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <TimelineItem key={event.id} event={event} />
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No events to show for this filter.</p>
              </div>
            )}
          </div>

          {/* Load More */}
          {filteredEvents.length > 0 && (
            <div className="mt-6 text-center">
              <Button variant="outline" size="sm">
                Load more activity
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
