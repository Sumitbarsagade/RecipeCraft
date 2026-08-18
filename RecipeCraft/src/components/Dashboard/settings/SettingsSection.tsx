import { motion } from "framer-motion";

interface SettingsSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function SettingsSection({
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-2xl w-full border border-[#E8E1D8] bg-white shadow-sm"
    >
      <div className="border-b border-[#EEE8E0] w-full px-5 py-5 sm:px-6">
        <h2 className="font-serif text-xl font-bold text-[#1F2D27]">
          {title}
        </h2>

        <p className="mt-1 text-sm text-[#737D77]">
          {description}
        </p>
      </div>

      <div className="divide-y divide-[#EEE8E0]">
        {children}
      </div>
    </motion.section>
  );
}