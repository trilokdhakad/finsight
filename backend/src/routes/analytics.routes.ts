import { Router } from "express";
import {
    getSummary,
    getCategoryBreakdown,
    getMonthlyTrend
} from "../controllers/analytics.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get(
    "/summary",
    authenticate,
    getSummary
);

router.get(
    "/category-breakdown",
    authenticate,
    getCategoryBreakdown
);

router.get(
    "/monthly-trend",
    authenticate,
    getMonthlyTrend
);

export default router;