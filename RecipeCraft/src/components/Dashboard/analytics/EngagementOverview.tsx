import {
  Bookmark,
  Heart,
  MessageCircle,
} from "lucide-react";

const engagement = [
  {
    label: "Saves",
    value: "1,284",
    percentage: "36%",
    icon: Bookmark,
  },
  {
    label: "Likes",
    value: "3,492",
    percentage: "49%",
    icon: Heart,
  },
  {
    label: "Comments",
    value: "482",
    percentage: "15%",
    icon: MessageCircle,
  },
];

export default function EngagementOverview() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h2 className="font-serif text-xl font-bold text-[#1F2D27]">
          Engagement
        </h2>

        <p className="mt-1 text-sm text-[#737D77]">
          How people interact with your recipes.
        </p>
      </div>

      <div className="space-y-6">
        {engagement.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FCE8DD] text-[#C8501A]">
                    <Icon size={17} />
                  </div>

                  <span className="text-sm font-medium text-[#536059]">
                    {item.label}
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-[#1F2D27]">
                    {item.value}
                  </p>

                  <p className="text-xs text-[#969E99]">
                    {item.percentage}
                  </p>
                </div>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#F0ECE6]">
                <div
                  className="h-full rounded-full bg-[#C8501A]"
                  style={{
                    width: item.percentage,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}