import { Heart } from "lucide-react";

export default function FavoriteButton() {
  return (
    <button className="rounded-full bg-white p-2 shadow transition hover:scale-110">
      <Heart
        size={18}
        className="text-gray-500 hover:text-red-500"
      />
    </button>
  );
}