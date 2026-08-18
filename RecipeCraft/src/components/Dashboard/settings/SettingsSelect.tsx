import { ChevronDown } from "lucide-react";

interface SettingsSelectProps {
  title: string;
  description?: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function SettingsSelect({
  title,
  description,
  value,
  options,
  onChange,
}: SettingsSelectProps) {
  return (
    <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <h3 className="text-sm font-semibold text-[#354139]">
          {title}
        </h3>

        {description && (
          <p className="mt-1 max-w-xl text-xs leading-5 text-[#8A938D]">
            {description}
          </p>
        )}
      </div>

      <div className="relative w-full sm:w-52">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-[#E3DDD5] bg-[#FFFEFC] px-4 py-2.5 pr-10 text-sm font-medium text-[#455049] outline-none transition focus:border-[#C8501A] focus:ring-2 focus:ring-[#C8501A]/10"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#858E88]"
        />
      </div>
    </div>
  );
}