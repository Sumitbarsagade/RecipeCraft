interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-[#C8501A]">
      {children}
    </span>
  );
}