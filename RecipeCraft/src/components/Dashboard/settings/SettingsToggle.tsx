interface SettingsToggleProps {
  title: string;
  description?: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}

export default function SettingsToggle({
  title,
  description,
  enabled,
  onChange,
}: SettingsToggleProps) {
  return (
    <div className="flex items-center justify-between gap-5 px-5 py-5 sm:px-6">
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-[#354139]">
          {title}
        </h3>

        {description && (
          <p className="mt-1 max-w-xl text-xs leading-5 text-[#8A938D]">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-[#C8501A]" : "bg-[#D9D4CD]"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}