import {
  User,
  LayoutDashboard,
  PlusCircle,
  Bookmark,
  LogOut,
  Settings,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative flex items-center"
    >
      {/* =====================================================
          PROFILE BUTTON
      ====================================================== */}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open account menu"
        aria-expanded={isOpen}
        className={`
          flex h-11 w-11 items-center justify-center
          rounded-full
          border-2
          transition-all duration-200
          ${
            isOpen
              ? "border-[#C8501A] bg-[#C8501A] text-white"
              : "border-transparent bg-transparent text-[#18231F] hover:bg-[#FFF4EE] hover:text-[#C8501A]"
          }
        `}
      >
        <User
          size={22}
          strokeWidth={1.8}
        />
      </button>

      {/* =====================================================
          ACCOUNT DROPDOWN
      ====================================================== */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -8,
              scale: 0.96,
            }}
            transition={{
              duration: 0.18,
              ease: "easeOut",
            }}
            className="
              absolute
              right-0
              top-[calc(100%+12px)]
              z-[100]
              w-[280px]
              overflow-hidden
              rounded-2xl
              border
              border-[#E9E1D9]
              bg-white
              shadow-[0_18px_45px_rgba(27,39,33,0.14)]
            "
          >

            {/* =================================================
                PROFILE HEADER
            ================================================== */}

            <div className="border-b border-[#EEE8E2] p-4">
              <div className="flex items-center gap-3">

                {/* Avatar */}
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#F7D7C5]
                    text-[#C8501A]
                  "
                >
                  <User
                    size={22}
                    strokeWidth={1.8}
                  />
                </div>

                {/* User information */}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#26352E]">
                    UserName
                  </p>

                  <p className="mt-0.5 truncate text-xs text-[#8A938D]">
                    user@example.com
                  </p>
                </div>
              </div>

              {/* Profile link */}
              <Link
                to="/dashboard/profile"
                onClick={closeDropdown}
                className="
                  mt-3
                  flex
                  items-center
                  justify-between
                  rounded-lg
                  bg-[#FAF7F3]
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  text-[#536059]
                  transition
                  hover:bg-[#FFF0E8]
                  hover:text-[#C8501A]
                "
              >
                <span>View Profile</span>

                <ChevronRight size={14} />
              </Link>
            </div>

            {/* =================================================
                NAVIGATION
            ================================================== */}

            <div className="p-2">

              <DropdownItem
                to="/dashboard"
                icon={<LayoutDashboard size={18} />}
                label="Dashboard"
                description="Overview & activity"
                onClick={closeDropdown}
              />

              <DropdownItem
                to="/dashboard/recipes/new"
                icon={<PlusCircle size={18} />}
                label="Create Recipe"
                description="Share something delicious"
                onClick={closeDropdown}
              />

              <DropdownItem
                to="/saved-recipes"
                icon={<Bookmark size={18} />}
                label="Saved Recipes"
                description="Your favorite recipes"
                onClick={closeDropdown}
              />

              <DropdownItem
                to="/dashboard/settings"
                icon={<Settings size={18} />}
                label="Settings"
                description="Account preferences"
                onClick={closeDropdown}
              />

            </div>

            {/* =================================================
                LOGOUT
            ================================================== */}

            <div className="border-t border-[#EEE8E2] p-2">

              <button
                type="button"
                onClick={() => {
                  closeDropdown();

                  // Add logout logic here
                  console.log("Logout");
                }}
                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-3
                  text-left
                  transition-all
                  duration-150
                  hover:bg-[#FFF1EC]
                "
              >

                <span
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#FFF1EC]
                    text-[#C8501A]
                    transition
                    group-hover:bg-[#C8501A]
                    group-hover:text-white
                  "
                >
                  <LogOut size={17} />
                </span>

                <div>
                  <p className="text-sm font-semibold text-[#4A554F] group-hover:text-[#C8501A]">
                    Log out
                  </p>

                  <p className="text-[11px] text-[#9BA19D]">
                    Sign out of RecipeCraft
                  </p>
                </div>

              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


/* ============================================================
   DROPDOWN ITEM
============================================================ */

interface DropdownItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
}

const DropdownItem = ({
  to,
  icon,
  label,
  description,
  onClick,
}: DropdownItemProps) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="
        group
        flex
        items-center
        gap-3
        rounded-xl
        px-3
        py-3
        transition-all
        duration-150
        hover:bg-[#FFF5EF]
      "
    >

      {/* Icon */}
      <span
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-[#F8F5F1]
          text-[#66716A]
          transition-all
          duration-150
          group-hover:bg-[#F9D9C7]
          group-hover:text-[#C8501A]
        "
      >
        {icon}
      </span>

      {/* Text */}
      <div className="min-w-0 flex-1">

        <p
          className="
            text-sm
            font-semibold
            text-[#354139]
            transition-colors
            group-hover:text-[#C8501A]
          "
        >
          {label}
        </p>

        <p className="mt-0.5 truncate text-[11px] text-[#9BA19D]">
          {description}
        </p>

      </div>

      {/* Arrow */}
      <ChevronRight
        size={15}
        className="
          text-[#B7BDB9]
          transition-all
          group-hover:translate-x-0.5
          group-hover:text-[#C8501A]
        "
      />

    </Link>
  );
};

export default UserProfile;