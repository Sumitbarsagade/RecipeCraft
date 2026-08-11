import { Menu, ChefHat } from "lucide-react";

interface DashboardMobileHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardMobileHeader({
  onMenuClick,
}: DashboardMobileHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-[#E8E1D8] bg-[#FAF8F4]/95 px-5 backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl p-2 text-[#1F2D27] transition hover:bg-[#EDE7DE]"
          aria-label="Open dashboard menu"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C8501A] text-white">
            <ChefHat size={17} />
          </div>

          <span className="font-serif text-lg font-bold text-[#1F2D27]">
            RecipeCraft
          </span>
        </div>
      </div>

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DDAA3F] text-xs font-semibold text-[#1F2D27]">
        AP
      </div>
    </header>
  );
}