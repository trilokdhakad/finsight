import { useState } from "react";
import { X } from "lucide-react";

import * as Dialog from "@radix-ui/react-dialog";

import { Button } from "../ui/button";

import {
  createCategory,
} from "../../services/category.service";

import { toast } from "sonner";

export default function CreateCategoryDialog({
  onCreated,
}: {
  onCreated: () => void;
}) {

  const [open, setOpen] =
    useState(false);

  const [name, setName] =
    useState("");

  const [type, setType] =
    useState<"INCOME" | "EXPENSE">(
      "EXPENSE"
    );

  const handleSubmit = async () => {

    try {

      await createCategory({
        name,
        type,
      });

      toast.success(
        "Category created"
      );

      setOpen(false);

      setName("");

      onCreated();

    } catch (error) {

      toast.error(
        error instanceof Error
          ? error.message
          : "Creation failed"
      );
    }
  };

  return (

    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
    >

      <Dialog.Trigger asChild>

        <Button>
          + Add Category
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
          max-w-md
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-950
          p-8
          "
        >

          <button
            onClick={() => setOpen(false)}
            className="
            absolute
            top-4
            right-4
            text-zinc-400
            hover:text-white
            "
          >
            <X size={20} />
          </button>

          <h2 className="text-3xl font-bold text-white mb-6">
            Add Category
          </h2>

          <div className="space-y-4">

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Category Name"
              className="
              w-full
              rounded-xl
              bg-zinc-900
              border
              border-zinc-800
              p-4
              text-white
              placeholder:text-zinc-500
              "
            />

            <select
              value={type}
              onChange={(e) =>
                setType(
                  e.target.value as
                  "INCOME" | "EXPENSE"
                )
              }
              className="
              w-full
              rounded-xl
              bg-zinc-900
              border
              border-zinc-800
              p-4
              text-white
              "
            >
              <option value="EXPENSE">
                Expense
              </option>

              <option value="INCOME">
                Income
              </option>

            </select>

            <Button
              className="
              w-full
              bg-emerald-500
              hover:bg-emerald-600
              text-white
              "
              onClick={handleSubmit}
            >
              Create Category
            </Button>

            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

          </div>

        </Dialog.Content>

      </Dialog.Portal>

    </Dialog.Root>
  );
}