import { Star } from "lucide-react";

interface Props {
  value: number;
}

export default function Rating({ value }: Props) {
  return (
    <div className="flex items-center gap-1">
      <Star
        size={16}
        className="fill-yellow-400 text-yellow-400"
      />

      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}