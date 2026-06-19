import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CATEGORY_COLORS: Record<string, string> = {
  Rent: "#ef4444",
  Health: "#3b82f6",
  Food: "#8b5cf6",
  Shopping: "#f59e0b",
  Entertainment: "#ec4899",
  Transport: "#14b8a6",
  Salary: "#10b981",
  Freelance: "#06b6d4",
  Utilities: "#f97316",
  Insurance: "#a855f7",
  Education: "#6366f1",
  Miscellaneous: "#64748b",
};

type CategoryData = {
  category: string;
  amount: number;
};

export default function CategoryPieChart({
  data,
}: {
  data: CategoryData[];
}) {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="category"
          outerRadius={120}
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={
                CATEGORY_COLORS[
                  entry.category
                ] || "#64748b"
              }
            />
          ))}
        </Pie>

        <Tooltip
          formatter={(value) =>
            `₹${Number(
              value ?? 0
            ).toLocaleString()}`
          }
          contentStyle={{
            backgroundColor: "#18181b",
            border: "1px solid #27272a",
            borderRadius: "12px",
            color: "#ffffff",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}