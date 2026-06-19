import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

type TrendData = {
  month: string;
  income: number;
  expenses: number;
};

// Custom tooltip component
const CustomTooltip = ({
  active,
  payload,
  label,
}: any) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  // Bars are rendered in order: income, expenses, savings
  const income = payload[0]?.value ?? 0;
  const expenses = payload[1]?.value ?? 0;
  const savings = payload[2]?.value ?? 0;

  return (
    <div
      className="
      rounded-xl
      border
      border-zinc-700
      bg-zinc-950
      p-4
      shadow-lg
      "
    >
      <p className="font-semibold mb-2">
        {label}
      </p>

      <p className="text-emerald-400">
        Income: ₹{Number(income).toLocaleString()}
      </p>

      <p className="text-red-500">
        Expenses: ₹{Number(expenses).toLocaleString()}
      </p>

      <p className="text-fuchsia-500">
        Net Savings: ₹{Number(savings).toLocaleString()}
      </p>
    </div>
  );
};

export default function MonthlyTrendChart({
  data,
}: {
  data: TrendData[];
}) {
  // Format month names and compute savings
  const chartData = data.map((item) => ({
    ...item,
    month: new Date(item.month + "-01").toLocaleString("en-IN", {
      month: "short",
    }),
    savings: item.income - item.expenses,
  }));

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <BarChart
        data={chartData}
        margin={{
          top: 10,
          right: 20,
          left: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#27272a"
        />

        <XAxis
          dataKey="month"
          tick={{ fill: "#a1a1aa" }}
        />

        <YAxis
          tick={{ fill: "#a1a1aa" }}
          tickFormatter={(value) =>
            `₹${(value / 1000).toFixed(0)}k`
          }
        />

        <Tooltip content={<CustomTooltip />} />

        <Legend verticalAlign="top" />

        <Bar
          dataKey="income"
          name="Income"
          fill="#10b981"
          radius={[6, 6, 0, 0]}
        />

        <Bar
          dataKey="expenses"
          name="Expenses"
          fill="#ef4444"
          radius={[6, 6, 0, 0]}
        />

        <Bar
          dataKey="savings"
          name="Net Savings"
          fill="#a855f7"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}