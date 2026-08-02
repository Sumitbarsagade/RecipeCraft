interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: Props) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow transition hover:-translate-y-2 hover:shadow-xl">
      <div className="mb-5 inline-flex rounded-2xl bg-orange-100 p-4 text-[#C8501A]">
        {icon}
      </div>

      <h3 className="text-2xl font-bold">{title}</h3>

      <p className="mt-4 leading-7 text-gray-500">
        {description}
      </p>
    </div>
  );
}