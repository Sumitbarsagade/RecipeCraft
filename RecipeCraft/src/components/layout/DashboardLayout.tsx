import { Outlet } from "react-router-dom";
import DashboardMobileHeader from "../dashboard/DashboardMobileHeader";
import DashboardSidebar from "../dashboard/DashboardSidebar";


export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#FAF8F4]">

      <DashboardSidebar />

      <DashboardMobileHeader />

      <main
        className="
          min-h-screen
          lg:ml-[260px]
        "
      >
        <Outlet />
      </main>

    </div>
  );
}