import { z } from "zod";

export const createTransactionSchema = z.object({

    body: z.object({

        amount: z.number().positive(),

        type: z.enum([
            "INCOME",
            "EXPENSE"
        ]),

        categoryId: z.uuid(),

        transactionDate: z.iso.datetime(),

        description: z.string().optional(),

        paymentMethod: z.enum([
            "CASH",
            "CARD",
            "BANK_TRANSFER",
            "UPI",
            "WALLET",
            "OTHER"
        ]).optional()

    })

});