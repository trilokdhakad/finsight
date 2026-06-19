import { Router } from "express";

import {
    createCategory,
    getCategories
} from "../controllers/category.controller";

import { validate } from "../middlewares/validate";

import {
    createCategorySchema
} from "../validators/category.schema";

const router = Router();

router.post(
    "/",
    validate(createCategorySchema),
    createCategory
);

router.get(
    "/",
    getCategories
);

export default router;