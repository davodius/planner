import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { PlannerProvider } from '@/contexts/PlannerContext';
import DailyPlanner from './DailyPlanner';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <PlannerProvider>
        <main className="flex-1">
          <DailyPlanner />
        </main>
      </PlannerProvider>
    </div>
  );
};

export default AppLayout;
