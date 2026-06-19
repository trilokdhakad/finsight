import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import {
  getSummary,
} from "../services/analytics.service";

import {
  getTransactions,
} from "../services/transaction.service";

import { getCategories } from "../services/category.service";

import { useAuth } from "../context/AuthContext";

type SummaryData = {
  income: number;
  expenses: number;
  balance: number;
};

type Transaction = {
  id: string;
  amount: string;
  type: "INCOME" | "EXPENSE";
  description?: string;
  transactionDate: string;
  category: {
    name: string;
  };
};

type Category = {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
};

export default function DashboardPage() {
  const { user } = useAuth();

  const [summary, setSummary] =
    useState<SummaryData>({
      income: 0,
      expenses: 0,
      balance: 0,
    });

  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );

  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [summaryResponse, transactionResponse, categoriesResponse] =
          await Promise.all([
            getSummary(),
            getTransactions(),
            getCategories(),
          ]);

        setSummary(summaryResponse.data);

        const allTransactions = transactionResponse.data;
        setRecentTransactions(allTransactions.slice(0, 5));

        setCategories(categoriesResponse.data);

        // Compute top expense from all transactions
        const topExpenseTransaction = allTransactions
          .filter((t: Transaction) => t.type === "EXPENSE")
          .sort(
            (a: Transaction, b: Transaction) =>
              Number(b.amount) - Number(a.amount)
          )[0];

        setTopExpense(
          topExpenseTransaction
            ? topExpenseTransaction.category.name
            : "None"
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // State for top expense
  const [topExpense, setTopExpense] = useState<string>("None");

  const savingsRate =
    summary.income > 0
      ? (
          ((summary.income - summary.expenses) / summary.income) *
          100
        ).toFixed(1)
      : "0";

  const totalCategories = categories.length;

  return (
    <DashboardLayout>
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-950 p-8 mb-8">
        <p className="text-zinc-400 text-sm mb-2">Welcome back</p>
        <h2 className="text-4xl font-bold">{user?.firstName}</h2>
        <p className="text-zinc-400 mt-3">Current balance</p>
        <h3 className="text-5xl font-bold text-emerald-400 mt-2">
          ₹{summary.balance.toLocaleString()}
        </h3>
        <p className="text-zinc-400 mt-4">
          You are saving {savingsRate}% of your income.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center justify-between">
            <p className="text-zinc-400 text-sm">Income</p>
            <TrendingUp className="text-emerald-400" size={20} />
          </div>
          <h3 className="text-4xl font-bold mt-4 text-emerald-400">
            {loading ? "..." : `₹${summary.income.toLocaleString()}`}
          </h3>
          <p className="text-zinc-500 text-sm mt-2">Total earnings</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center justify-between">
            <p className="text-zinc-400 text-sm">Expenses</p>
            <TrendingDown className="text-red-400" size={20} />
          </div>
          <h3 className="text-4xl font-bold mt-4 text-red-400">
            {loading ? "..." : `₹${summary.expenses.toLocaleString()}`}
          </h3>
          <p className="text-zinc-500 text-sm mt-2">Total spending</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center justify-between">
            <p className="text-zinc-400 text-sm">Balance</p>
            <Wallet className="text-sky-400" size={20} />
          </div>
          <h3 className="text-4xl font-bold mt-4 text-sky-400">
            {loading ? "..." : `₹${summary.balance.toLocaleString()}`}
          </h3>
          <p className="text-zinc-500 text-sm mt-2">Available funds</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center justify-between">
            <p className="text-zinc-400 text-sm">Savings Rate</p>
            <PiggyBank className="text-violet-400" size={20} />
          </div>
          <h3 className="text-4xl font-bold mt-4 text-violet-400">
            {loading ? "..." : `${savingsRate}%`}
          </h3>
          <p className="text-zinc-500 text-sm mt-2">Excellent financial health</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {recentTransactions.length === 0 ? (
            <p className="text-zinc-500">No transactions yet</p>
          ) : (
            recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between border-b border-zinc-800 pb-3 last:border-b-0"
              >
                <div>
                  <p className="font-medium">{transaction.description || "Untitled"}</p>
                  <p className="text-sm text-zinc-500">
                    {transaction.category.name}
                  </p>
                </div>
                <span
                  className={
                    transaction.type === "INCOME"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }
                >
                  {transaction.type === "INCOME" ? "+" : "-"}
                  ₹{Number(transaction.amount).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-400 text-sm">Total Transactions</p>
          <h4 className="text-3xl font-bold mt-2 text-white">
            {recentTransactions.length}
          </h4>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-400 text-sm">Categories</p>
          <h4 className="text-3xl font-bold mt-2 text-white">{totalCategories}</h4>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-400 text-sm">Top Expense</p>
          <h4 className="text-3xl font-bold mt-2 text-white">{topExpense}</h4>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h3 className="text-xl font-semibold mb-4">Financial Insight</h3>
        <p className="text-zinc-300">
          Your savings rate is currently
          <span className="text-emerald-400 font-semibold"> {savingsRate}%</span>
          . With expenses at ₹{summary.expenses.toLocaleString()}, you are
          maintaining a strong positive cash flow.
        </p>
      </div>
    </DashboardLayout>
  );
}