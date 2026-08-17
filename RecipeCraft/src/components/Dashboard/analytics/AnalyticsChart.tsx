import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "May 18", views: 1200 },
  { month: "May 25", views: 1800 },
  { month: "Jun 01", views: 1500 },
  { month: "Jun 08", views: 2400 },
  { month: "Jun 15", views: 2900 },
  { month: "Jun 22", views: 2600 },
  { month: "Jun 29", views: 3400 },
  { month: "Jul 06", views: 3900 },
  { month: "Jul 13", views: 4200 },
];

export default function AnalyticsChart() {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h2 className="font-serif text-xl font-bold text-[#1F2D27]">
          Recipe Performance
        </h2>

        <p className="mt-1 text-sm text-[#737D77]">
          Recipe views over the selected period.
        </p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: -20,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient
                id="viewsGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#C8501A"
                  stopOpacity={0.25}
                />

                <stop
                  offset="100%"
                  stopColor="#C8501A"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#EEE8E0"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#8B948E",
                fontSize: 11,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#8B948E",
                fontSize: 11,
              }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #E8E1D8",
                boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
              }}
            />

            <Area
              type="monotone"
              dataKey="views"
              stroke="#C8501A"
              strokeWidth={3}
              fill="url(#viewsGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}