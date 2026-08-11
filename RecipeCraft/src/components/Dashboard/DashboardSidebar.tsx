import { NavLink, useNavigate } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  ChefHat,
  CircleUserRound,
  FilePlus2,
  LogOut,
  Settings,
  LayoutDashboard,
  X,
} from "lucide-react";

interface DashboardSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

const navigationItems = [
  {
    label: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "My Recipes",
    path: "/dashboard/recipes",
    icon: BookOpen,
  },
  {
    label: "Add Recipe",
    path: "/dashboard/recipes/new",
    icon: FilePlus2,
  },
  {
    label: "Analytics",
    path: "/dashboard/analytics",
    icon: BarChart3,
  },
];

const accountItems = [
  {
    label: "Profile",
    path: "/dashboard/profile",
    icon: CircleUserRound,
  },
  {
    label: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar({
  mobileOpen = false,
  onClose,
}: DashboardSidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Replace this later with your actual authentication logout logic.
    localStorage.removeItem("accessToken");

    navigate("/login");
  };

  const handleNavigation = () => {
    onClose?.();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-[270px]
          flex-col
          border-r border-[#E8E1D8]
          bg-[#1F2D27]
          text-white
          transition-transform duration-300
          lg:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Logo */}
        <div className="flex h-[82px] items-center justify-between border-b border-white/10 px-6">
          <NavLink
            to="/dashboard"
            onClick={handleNavigation}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C8501A]">
              <ChefHat size={22} strokeWidth={2.2} />
            </div>

            <div>
              <h1 className="font-serif text-xl font-bold tracking-tight">
                RecipeCraft
              </h1>

              <p className="text-[11px] uppercase tracking-[0.16em] text-white/50">
                Creator Studio
              </p>
            </div>
          </NavLink>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close dashboard menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-7">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
            Main
          </p>

          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={handleNavigation}
                  className={({ isActive }) =>
                    `
                    group flex items-center gap-3 rounded-xl px-3.5 py-3
                    text-sm font-medium
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#C8501A] text-white shadow-lg shadow-black/10"
                        : "text-white/65 hover:bg-white/8 hover:text-white"
                    }
                    `
                  }
                >
                  <Icon size={19} strokeWidth={1.9} />

                  <span>{item.label}</span>

                  {item.label === "Add Recipe" && (
                    <span className="ml-auto rounded-md bg-white/10 px-1.5 py-0.5 text-[10px]">
                      +
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="my-7 h-px bg-white/10" />

          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
            Account
          </p>

          <nav className="space-y-1">
            {accountItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleNavigation}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3 rounded-xl px-3.5 py-3
                    text-sm font-medium
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/65 hover:bg-white/8 hover:text-white"
                    }
                    `
                  }
                >
                  <Icon size={19} strokeWidth={1.9} />

                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User + Logout */}
        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DDAA3F] text-sm font-semibold text-[#1F2D27]">
              AP
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                Anya Patel
              </p>

              <p className="truncate text-xs text-white/45">
                Home Cook
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="
              flex w-full items-center gap-3 rounded-xl
              px-3.5 py-3
              text-sm font-medium text-white/60
              transition
              hover:bg-red-500/10
              hover:text-red-300
            "
          >
            <LogOut size={19} strokeWidth={1.9} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}