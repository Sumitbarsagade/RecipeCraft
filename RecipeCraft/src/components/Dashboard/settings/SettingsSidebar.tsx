import {
  Bell,
  BookOpen,
  ChevronDown,
  Eye,
  KeyRound,
  Palette,
  Shield,
  UserRound,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface SettingsSection {
  id: string;
  label: string;
  icon: React.ElementType;
  group: string;
}

interface SettingsSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const settingsSections: SettingsSection[] = [
  {
    id: "account",
    label: "Account",
    icon: UserRound,
    group: "ACCOUNT",
  },
  {
    id: "password",
    label: "Password & Security",
    icon: KeyRound,
    group: "ACCOUNT",
  },
  {
    id: "connected",
    label: "Connected Accounts",
    icon: Users,
    group: "ACCOUNT",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    group: "PREFERENCES",
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
    group: "PREFERENCES",
  },
  {
    id: "recipe-preferences",
    label: "Recipe Preferences",
    icon: BookOpen,
    group: "RECIPE",
  },
  {
    id: "privacy",
    label: "Privacy",
    icon: Eye,
    group: "PRIVACY",
  },
];

export default function SettingsSidebar({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const groups = [...new Set(settingsSections.map((item) => item.group))];

  const activeItem =
    settingsSections.find((item) => item.id === activeSection) ??
    ({
      id: "danger",
      label: "Danger Zone",
      icon: Shield,
      group: "DANGER",
    } as SettingsSection);

  const ActiveIcon = activeItem.icon;

  /*
   * Close dropdown when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMobileOpen(false);
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

  /*
   * Close dropdown when pressing Escape
   */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  const handleMobileChange = (section: string) => {
    onSectionChange(section);
    setMobileOpen(false);
  };

  return (
    <>
      {/* =====================================================
          MOBILE SETTINGS NAVIGATION
      ====================================================== */}
      <div
        ref={dropdownRef}
        className="relative mb-5 w-full lg:hidden"
      >
        <p className="mb-2 px-1 text-[10px] font-bold tracking-[0.12em] text-[#8A938D]">
          SETTINGS SECTION
        </p>

        {/* Selected option */}
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-haspopup="listbox"
          onClick={() => setMobileOpen((prev) => !prev)}
          className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3 text-left transition-all duration-200 ${
            mobileOpen
              ? "border-[#C8501A] shadow-[0_0_0_3px_rgba(200,80,26,0.08)]"
              : "border-[#E3DDD5] hover:border-[#C8501A]/50"
          }`}
        >
          <span className="flex min-w-0 items-center gap-3">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                activeSection === "danger"
                  ? "bg-red-50 text-red-500"
                  : "bg-[#FCE8DD] text-[#C8501A]"
              }`}
            >
              <ActiveIcon size={16} />
            </span>

            <span className="truncate text-sm font-semibold text-[#354139]">
              {activeItem.label}
            </span>
          </span>

          <ChevronDown
            size={18}
            className={`shrink-0 text-[#68736C] transition-transform duration-200 ${
              mobileOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* =====================================================
            CUSTOM DROPDOWN
        ====================================================== */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -6,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 4,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -4,
                scale: 0.98,
              }}
              transition={{
                duration: 0.15,
              }}
              role="listbox"
              className="absolute left-0 right-0 z-50 overflow-hidden rounded-xl border border-[#E5DED5] bg-white shadow-[0_12px_35px_rgba(31,45,39,0.14)]"
            >
              {/* Account */}
              <div className="p-2">
                <p className="px-3 pb-1 pt-1 text-[9px] font-bold tracking-[0.14em] text-[#AAA39B]">
                  ACCOUNT
                </p>

                {settingsSections
                  .filter((item) => item.group === "ACCOUNT")
                  .map((item) => (
                    <MobileOption
                      key={item.id}
                      item={item}
                      activeSection={activeSection}
                      onClick={() =>
                        handleMobileChange(item.id)
                      }
                    />
                  ))}
              </div>

              {/* Preferences */}
              <div className="border-t border-[#F0EBE5] p-2">
                <p className="px-3 pb-1 pt-1 text-[9px] font-bold tracking-[0.14em] text-[#AAA39B]">
                  PREFERENCES
                </p>

                {settingsSections
                  .filter(
                    (item) => item.group === "PREFERENCES"
                  )
                  .map((item) => (
                    <MobileOption
                      key={item.id}
                      item={item}
                      activeSection={activeSection}
                      onClick={() =>
                        handleMobileChange(item.id)
                      }
                    />
                  ))}
              </div>

              {/* Recipe */}
              <div className="border-t border-[#F0EBE5] p-2">
                <p className="px-3 pb-1 pt-1 text-[9px] font-bold tracking-[0.14em] text-[#AAA39B]">
                  RECIPE
                </p>

                {settingsSections
                  .filter((item) => item.group === "RECIPE")
                  .map((item) => (
                    <MobileOption
                      key={item.id}
                      item={item}
                      activeSection={activeSection}
                      onClick={() =>
                        handleMobileChange(item.id)
                      }
                    />
                  ))}
              </div>

              {/* Privacy */}
              <div className="border-t border-[#F0EBE5] p-2">
                <p className="px-3 pb-1 pt-1 text-[9px] font-bold tracking-[0.14em] text-[#AAA39B]">
                  PRIVACY
                </p>

                {settingsSections
                  .filter(
                    (item) => item.group === "PRIVACY"
                  )
                  .map((item) => (
                    <MobileOption
                      key={item.id}
                      item={item}
                      activeSection={activeSection}
                      onClick={() =>
                        handleMobileChange(item.id)
                      }
                    />
                  ))}
              </div>

              {/* Danger Zone */}
              <div className="border-t border-[#F0EBE5] p-2">
                <button
                  type="button"
                  role="option"
                  aria-selected={activeSection === "danger"}
                  onClick={() =>
                    handleMobileChange("danger")
                  }
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    activeSection === "danger"
                      ? "bg-red-50 font-semibold text-red-600"
                      : "text-[#59645D] hover:bg-red-50 hover:text-red-600"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      activeSection === "danger"
                        ? "bg-red-100 text-red-500"
                        : "bg-[#F7F4F0] text-[#7B837E]"
                    }`}
                  >
                    <Shield size={15} />
                  </span>

                  <span className="flex-1">
                    Danger Zone
                  </span>

                  {activeSection === "danger" && (
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =====================================================
          DESKTOP SETTINGS SIDEBAR
      ====================================================== */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-6 rounded-2xl border border-[#E8E1D8] bg-white p-3 shadow-sm">
          <div className="mb-3 px-3 pt-2">
            <p className="text-xs font-bold tracking-wider text-[#A19A91]">
              SETTINGS
            </p>
          </div>

          {groups.map((group) => (
            <div key={group} className="mb-4">
              <p className="mb-1 px-3 text-[10px] font-bold tracking-wider text-[#B0A9A0]">
                {group}
              </p>

              <div className="space-y-1">
                {settingsSections
                  .filter((item) => item.group === group)
                  .map((item) => {
                    const Icon = item.icon;
                    const active =
                      activeSection === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          onSectionChange(item.id)
                        }
                        className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                          active
                            ? "bg-[#FCE8DD] text-[#C8501A]"
                            : "text-[#68736C] hover:bg-[#FAF7F3] hover:text-[#354139]"
                        }`}
                      >
                        {active && (
                          <motion.div
                            layoutId="settings-active"
                            className="absolute left-0 h-6 w-1 rounded-r-full bg-[#C8501A]"
                          />
                        )}

                        <Icon size={17} />

                        <span>{item.label}</span>
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}

          <div className="mt-2 border-t border-[#EEE8E0] pt-3">
            <button
              type="button"
              onClick={() =>
                onSectionChange("danger")
              }
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                activeSection === "danger"
                  ? "bg-red-50 text-red-600"
                  : "text-[#68736C] hover:bg-red-50 hover:text-red-500"
              }`}
            >
              <Shield size={17} />
              Danger Zone
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

/* =========================================================
   MOBILE OPTION COMPONENT
========================================================= */

interface MobileOptionProps {
  item: SettingsSection;
  activeSection: string;
  onClick: () => void;
}

function MobileOption({
  item,
  activeSection,
  onClick,
}: MobileOptionProps) {
  const Icon = item.icon;
  const active = activeSection === item.id;

  return (
    <button
      type="button"
      role="option"
      aria-selected={active}
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
        active
          ? "bg-[#FCE8DD] font-semibold text-[#C8501A]"
          : "text-[#59645D] hover:bg-[#FAF7F3]"
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          active
            ? "bg-[#F9D7C5] text-[#C8501A]"
            : "bg-[#F7F4F0] text-[#7B837E]"
        }`}
      >
        <Icon size={15} />
      </span>

      <span className="min-w-0 flex-1 truncate text-sm">
        {item.label}
      </span>

      {active && (
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C8501A]" />
      )}
    </button>
  );
}