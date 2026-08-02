import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  buttonText,
}: SectionHeaderProps) {
  return (
    <div className="mb-10 flex items-end justify-between">
      <div>
        <h2 className="font-serif text-4xl font-bold text-gray-900">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-2 text-gray-500">{subtitle}</p>
        )}
      </div>

      {buttonText && (
        <button className="flex items-center gap-2 font-semibold text-[#C8501A] transition hover:gap-3">
          {buttonText}
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
}