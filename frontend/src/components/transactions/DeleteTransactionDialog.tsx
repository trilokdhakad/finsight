import * as Dialog from "@radix-ui/react-dialog";

import { Button } from "../ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export default function DeleteTransactionDialog({
  open,
  onOpenChange,
  onConfirm,
}: Props) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
    >
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
          p-6
          text-white
          "
        >

          <Dialog.Title
            className="
            text-xl
            font-bold
            mb-2
            "
          >
            Delete Transaction
          </Dialog.Title>

          <p className="text-zinc-400 mb-6">
            This action cannot be undone.
          </p>

          <div className="flex gap-3 justify-end">

            <Button
              variant="outline"
              onClick={() =>
                onOpenChange(false)
              }
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={onConfirm}
            >
              Delete
            </Button>

          </div>

        </Dialog.Content>

      </Dialog.Portal>
    </Dialog.Root>
  );
}