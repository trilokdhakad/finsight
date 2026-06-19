import { z } from "zod";

export const createCategorySchema = z.object({

    body: z.object({

        name: z.string().min(1),

        type: z.enum([
            "INCOME",
            "EXPENSE"
        ]),

        color: z.string().optional(),

        icon: z.string().optional()

    })

});