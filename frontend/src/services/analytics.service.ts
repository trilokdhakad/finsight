import { apiFetch } from "../lib/api";

export async function getSummary() {
  return apiFetch("/analytics/summary");
}

export async function getMonthlyTrend() {
  return apiFetch(
    "/analytics/monthly-trend"
  );
}

export async function getCategoryBreakdown() {
  return apiFetch(
    "/analytics/category-breakdown"
  );
}