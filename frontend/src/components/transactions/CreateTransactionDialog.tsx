import { useEffect, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";

import { Button } from "../ui/button";

import {
  createTransaction,
  getCategories,
} from "../../services/transaction.service";

import { toast } from "sonner";

type Category = {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
};

type Props = {
  onCreated: () => void;
};

export default function CreateTransactionDialog({
  onCreated,
}: Props) {

  const [open, setOpen] =
    useState(false);

  const [categories,
    setCategories] =
    useState<Category[]>([]);

  const [amount,
    setAmount] =
    useState("");

  const [type,
    setType] =
    useState<"INCOME" | "EXPENSE">(
      "EXPENSE"
    );

  const [categoryId,
    setCategoryId] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [paymentMethod,
    setPaymentMethod] =
    useState("UPI");

  const [transactionDate,
    setTransactionDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  useEffect(() => {

    const loadCategories =
      async () => {

        try {

          const response =
            await getCategories();

          setCategories(
            response.data
          );

        } catch (error) {

          console.error(error);

        }
      };

    if (open) {
      loadCategories();
    }

  }, [open]);

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        await createTransaction({

          amount:
            Number(amount),

          type,

          categoryId,

          description,

          paymentMethod,

          transactionDate:
            `${transactionDate}T00:00:00.000Z`,
        });

        toast.success(
          "Transaction created"
        );

        setOpen(false);

        onCreated();

        setAmount("");
        setDescription("");

      } catch (error) {

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed"
        );
      }
    };

  const filteredCategories =
    categories.filter(
      (category) =>
        category.type === type
    );

  return (

    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
    >

      <Dialog.Trigger asChild>

        <Button>
          + Add Transaction
        </Button>

      </Dialog.Trigger>

      <Dialog.Portal>

        <Dialog.Overlay
          className="
          fixed inset-0
          bg-black/60
          "
        />

        <Dialog.Content
          className="
          fixed
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-full
          max-w-lg
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-950
          p-6
          text-white
          "
        >

          <Dialog.Title
            className="
            text-2xl
            font-bold
            mb-6
            "
          >
            Add Transaction
          </Dialog.Title>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              className="
              w-full
              rounded-lg
              bg-zinc-900
              border
              border-zinc-700
              px-4
              py-3
              "
            />

            <select
              value={type}
              onChange={(e) =>
                setType(
                  e.target
                    .value as
                    "INCOME" |
                    "EXPENSE"
                )
              }
              className="
              w-full
              rounded-lg
              bg-zinc-900
              border
              border-zinc-700
              px-4
              py-3
              "
            >
              <option value="EXPENSE">
                Expense
              </option>

              <option value="INCOME">
                Income
              </option>
            </select>

            <select
              value={categoryId}
              onChange={(e) =>
                setCategoryId(
                  e.target.value
                )
              }
              className="
              w-full
              rounded-lg
              bg-zinc-900
              border
              border-zinc-700
              px-4
              py-3
              "
            >
              <option value="">
                Select Category
              </option>

              {filteredCategories.map(
                (category) => (

                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                )
              )}
            </select>

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="
              w-full
              rounded-lg
              bg-zinc-900
              border
              border-zinc-700
              px-4
              py-3
              "
            />

            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
              className="
              w-full
              rounded-lg
              bg-zinc-900
              border
              border-zinc-700
              px-4
              py-3
              "
            >
              <option>
                UPI
              </option>

              <option>
                CASH
              </option>

              <option>
                CARD
              </option>

              <option>
                BANK_TRANSFER
              </option>

              <option>
                WALLET
              </option>

              <option>
                OTHER
              </option>
            </select>

            <input
              type="date"
              value={transactionDate}
              onChange={(e) =>
                setTransactionDate(
                  e.target.value
                )
              }
              className="
              w-full
              rounded-lg
              bg-zinc-900
              border
              border-zinc-700
              px-4
              py-3
              "
            />

            <Button
              type="submit"
              className="w-full"
            >
              Create Transaction
            </Button>

          </form>

        </Dialog.Content>

      </Dialog.Portal>

    </Dialog.Root>
  );
}