import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { ROUTES } from '@constants/route.constants';

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(ROUTES.DASHBOARD_LOGIN);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggle={() => setCollapsed(!collapsed)}
        onMobileClose={() => setMobileOpen(false)}
        onLogout={handleLogout}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader
          onMenuToggle={() => setMobileOpen(true)}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
