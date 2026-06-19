import { useEffect, useState } from "react";

import DashboardLayout
  from "../components/layout/DashboardLayout";

import {
  getSummary,
  getMonthlyTrend,
  getCategoryBreakdown,
} from "../services/analytics.service";

import MonthlyTrendChart
  from "../components/charts/MonthlyTrendChart";

import CategoryPieChart
  from "../components/charts/CategoryPieChart";

type SummaryData = {
  income: number;
  expenses: number;
  balance: number;
};

type TrendData = {
  month: string;
  income: number;
  expenses: number;
};

type CategoryData = {
  category: string;
  amount: number;
};

// Helper to format month string (e.g., "2026-06" -> "June 2026")
const formatMonth = (monthStr: string) => {
  const [year, month] = monthStr.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleString("en-IN", { month: "long", year: "numeric" });
};

export default function AnalyticsPage() {

  const [summary, setSummary] =
    useState<SummaryData>({
      income: 0,
      expenses: 0,
      balance: 0,
    });

  const [trendData, setTrendData] =
    useState<TrendData[]>([]);

  const [categoryData, setCategoryData] =
    useState<CategoryData[]>([]);

  useEffect(() => {

    const loadAnalytics =
      async () => {

        try {

          const [
            summaryResponse,
            trendResponse,
            categoryResponse,
          ] = await Promise.all([
            getSummary(),
            getMonthlyTrend(),
            getCategoryBreakdown(),
          ]);

          setSummary(
            summaryResponse.data
          );

          setTrendData(
            trendResponse.data
          );

          setCategoryData(
            categoryResponse.data
          );

        } catch (error) {

          console.error(error);

        }
      };

    loadAnalytics();

  }, []);

  const savingsRate =
    summary.income > 0
      ? (
          ((summary.income -
            summary.expenses) /
            summary.income) *
          100
        ).toFixed(1)
      : "0";

  const topCategories =
    [...categoryData]
      .sort(
        (a, b) =>
          b.amount - a.amount
      )
      .slice(0, 5);

  // --- Dynamic Insight ---
  const latestMonth =
    trendData[trendData.length - 1];

  let insightText =
    "No financial data available yet.";

  if (latestMonth) {
    const savings =
      latestMonth.income -
      latestMonth.expenses;

    const monthLabel =
      formatMonth(latestMonth.month);

    if (savings > 0) {
      insightText =
        `${monthLabel} generated net savings of ₹${savings.toLocaleString()}`;
    } else if (savings < 0) {
      insightText =
        `${monthLabel} expenses exceeded income by ₹${Math.abs(
          savings
        ).toLocaleString()}`;
    } else {
      insightText =
        `${monthLabel} income and expenses were perfectly balanced`;
    }
  }

  return (

    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Analytics
        </h1>

        <p className="text-zinc-400 mt-2">
          Detailed financial insights
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <p className="text-zinc-400">
            Income
          </p>

          <h3 className="text-4xl font-bold text-emerald-400 mt-3">
            ₹{summary.income.toLocaleString()}
          </h3>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <p className="text-zinc-400">
            Expenses
          </p>

          <h3 className="text-4xl font-bold text-red-400 mt-3">
            ₹{summary.expenses.toLocaleString()}
          </h3>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <p className="text-zinc-400">
            Savings Rate
          </p>

          <h3 className="text-4xl font-bold text-violet-400 mt-3">
            {savingsRate}%
          </h3>

        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 h-[450px]">

        <h3 className="text-xl font-semibold mb-6">
          Income vs Expenses
        </h3>

        <MonthlyTrendChart
          data={trendData}
        />

      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 mt-8">
        <h3 className="text-lg font-semibold mb-2">
          Key Insight
        </h3>

        <p className="text-zinc-300">
          {insightText}
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 h-[450px]">

          <h3 className="text-xl font-semibold mb-6">
            Category Breakdown
          </h3>

          <CategoryPieChart
            data={categoryData}
          />

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <h3 className="text-xl font-semibold mb-6">
            Top Spending Categories
          </h3>

          <div className="space-y-4">

            {topCategories.map(
              (category) => (

                <div
                  key={category.category}
                  className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-zinc-800
                  pb-3
                  "
                >

                  <span>
                    {category.category}
                  </span>

                  <span className="font-semibold">
                    ₹
                    {category.amount.toLocaleString()}
                  </span>

                </div>
              )
            )}

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}