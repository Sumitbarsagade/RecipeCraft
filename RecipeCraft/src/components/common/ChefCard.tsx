import { Users } from "lucide-react";

interface ChefCardProps {
  name: string;
  avatar: string;
  speciality: string;
  followers: string;
}

export default function ChefCard({
  name,
  avatar,
  speciality,
  followers,
}: ChefCardProps) {
  return (
    <div className="group rounded-3xl bg-white p-6 text-center shadow transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <img
        src={avatar}
        alt={name}
        className="mx-auto h-28 w-28 rounded-full object-cover ring-4 ring-orange-100"
      />

      <h3 className="mt-5 text-xl font-bold">{name}</h3>

      <p className="mt-1 text-gray-500">{speciality}</p>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
        <Users size={16} />
        {followers} Followers
      </div>

      <button className="mt-6 rounded-full bg-[#C8501A] px-6 py-2 text-white transition hover:bg-[#a63f13]">
        Follow
      </button>
    </div>
  );
}