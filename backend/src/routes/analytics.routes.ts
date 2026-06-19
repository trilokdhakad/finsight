import { Router } from "express";
import { getSummary } from "../controllers/analytics.controller";

const router = Router();

router.get(
    "/summary",
    getSummary
);

export default router;