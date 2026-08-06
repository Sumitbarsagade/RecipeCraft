import FavoriteButton from "./FavoriteButton";
import Rating from "./Rating";
import Badge from "./Badge";
import { Clock3 } from "lucide-react";

interface Props {
  title: string;
  image: string;
  rating: number;
  time: string;
  likes?: number;
}

export default function RecipeCard({
  title,
  image,
  rating,
  time,
  likes,
}: Props) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <div className="relative">

        <img
          src={image}
          alt={title}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute right-4 top-4">
          <FavoriteButton />
        </div>

      </div>

      <div className="space-y-4 p-6">

        <Badge>Trending</Badge>

        <h3 className="text-xl font-bold">
          {title}
        </h3>

        <div className="flex items-center justify-between">

          <Rating value={rating} />

          <div className="flex items-center gap-1 text-gray-500">
            <Clock3 size={16} />
            {time}
          </div>

        </div>

        <div className="text-sm text-gray-500">
          ❤️ {likes} Likes
        </div>

      </div>
    </article>
  );
}