import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import DashboardMobileHeader from "../dashboard/DashboardMobileHeader";


export default function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1F2D27]">

      {/* Desktop + Mobile Sidebar */}
      <DashboardSidebar
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Header */}
      <DashboardMobileHeader
        onMenuClick={() => setMobileMenuOpen(true)}
      />

      {/* Dashboard Content */}
      <main className="min-h-screen lg:ml-[270px]">
        <Outlet />
      </main>

    </div>
  );
}