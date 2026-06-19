import { z } from "zod";

export const registerSchema = z.object({

    body: z.object({

        email: z.email(),

        password: z.string().min(8),

        firstName: z.string().min(1),

        lastName: z.string().optional()

    })

});

export const loginSchema = z.object({

    body: z.object({

        email: z.email(),

        password: z.string()

    })

});