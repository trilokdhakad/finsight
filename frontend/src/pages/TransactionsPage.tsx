import { useEffect, useState } from "react";

import DashboardLayout
  from "../components/layout/DashboardLayout";

import {
  getTransactions,
  deleteTransaction,
} from "../services/transaction.service";

import CreateTransactionDialog
  from "../components/transactions/CreateTransactionDialog";

import DeleteTransactionDialog
  from "../components/transactions/DeleteTransactionDialog";

import {
  Trash2,
} from "lucide-react";

import { toast } from "sonner";

type Transaction = {
  id: string;
  amount: string;
  type: "INCOME" | "EXPENSE";
  description?: string;
  transactionDate: string;
  paymentMethod?: string;

  category: {
    name: string;
  };
};

export default function TransactionsPage() {

  const [transactions,
    setTransactions] =
    useState<Transaction[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  const [deleteOpen,
    setDeleteOpen] =
    useState(false);

  const [selectedId,
    setSelectedId] =
    useState<string | null>(null);

  const loadTransactions =
    async () => {

      try {

        const response =
          await getTransactions();

        setTransactions(
          response.data
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {

    loadTransactions();

  }, []);

  const handleDelete = async () => {

    if (!selectedId) {
      return;
    }

    try {

      await deleteTransaction(
        selectedId
      );

      toast.success(
        "Transaction deleted"
      );

      setDeleteOpen(false);

      setSelectedId(null);

      await loadTransactions();

    } catch (error) {

      toast.error(
        error instanceof Error
          ? error.message
          : "Delete failed"
      );
    }
  };

  return (

    <DashboardLayout>

      <div className="flex items-start justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Transactions
          </h1>

          <p className="text-zinc-400 mt-2">
            Track all income and expenses
          </p>

        </div>

        <CreateTransactionDialog
          onCreated={loadTransactions}
        />

      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="border-b border-zinc-800">

              <th className="text-left p-4">
                Description
              </th>

              <th className="text-left p-4">
                Category
              </th>

              <th className="text-left p-4">
                Payment
              </th>

              <th className="text-left p-4">
                Type
              </th>

              <th className="text-left p-4">
                Amount
              </th>

              <th className="text-left p-4">
                Date
              </th>

              <th className="text-left p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan={7}
                  className="p-8 text-center"
                >
                  Loading...
                </td>

              </tr>

            ) : transactions.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="p-12 text-center"
                >

                  <h3 className="text-xl font-semibold mb-2">
                    No Transactions Yet
                  </h3>

                  <p className="text-zinc-400">
                    Create your first transaction
                    to start tracking finances.
                  </p>

                </td>

              </tr>

            ) : (

              transactions.map(
                (transaction) => (

                  <tr
                    key={transaction.id}
                    className="
                    border-b
                    border-zinc-800
                    hover:bg-zinc-800/30
                    transition
                    "
                  >

                    <td className="p-4">
                      {
                        transaction.description
                      }
                    </td>

                    <td className="p-4">

                      <span
                        className="
                        px-3
                        py-1
                        rounded-full
                        bg-zinc-800
                        text-sm
                        "
                      >
                        {transaction.category.name}
                      </span>

                    </td>

                    <td className="p-4">

                      <span
                        className="
                        px-3
                        py-1
                        rounded-full
                        bg-sky-500/10
                        text-sky-400
                        text-sm
                        "
                      >
                        {transaction.paymentMethod || "N/A"}
                      </span>

                    </td>

                    <td className="p-4">

                      <span
                        className={
                          transaction.type === "INCOME"

                            ? `
                            px-3
                            py-1
                            rounded-full
                            bg-emerald-500/10
                            text-emerald-400
                            text-sm
                            `

                            : `
                            px-3
                            py-1
                            rounded-full
                            bg-red-500/10
                            text-red-400
                            text-sm
                            `
                        }
                      >
                        {transaction.type}
                      </span>

                    </td>

                    <td className="p-4">

                      <span
                        className={
                          transaction.type ===
                          "INCOME"
                            ? "text-emerald-400"
                            : "text-red-400"
                        }
                      >
                        ₹
                        {Number(
                          transaction.amount
                        ).toLocaleString()}
                      </span>

                    </td>

                    <td className="p-4">
                      {new Date(
                        transaction.transactionDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">

                      <button
                        onClick={() => {

                          setSelectedId(
                            transaction.id
                          );

                          setDeleteOpen(true);

                        }}
                        className="
                        p-2
                        rounded-lg
                        hover:bg-red-500/10
                        text-red-400
                        transition
                        "
                      >
                        <Trash2 size={16} />
                      </button>

                    </td>

                  </tr>
                )
              )
            )}

          </tbody>

        </table>

      </div>

      <DeleteTransactionDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
      />

    </DashboardLayout>
  );
}