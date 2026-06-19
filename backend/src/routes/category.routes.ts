import { Router } from "express";

import {
    createCategory,
    getCategories
} from "../controllers/category.controller";

import { validate } from "../middlewares/validate";

import {
    createCategorySchema
} from "../validators/category.schema";

import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post(
    "/",
    authenticate,
    validate(createCategorySchema),
    createCategory
);

router.get(
    "/",
    authenticate,
    getCategories
);

export default router;