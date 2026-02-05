import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className={isMobile ? "pl-0" : "pl-60 transition-all duration-300"}>
        <TopBar />
        <main className="p-2 md:p-2 pt-20  md:pt-2">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
