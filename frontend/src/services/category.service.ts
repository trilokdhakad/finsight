import { apiFetch } from "../lib/api";

export async function getCategories() {
  return apiFetch("/categories");
}

export async function createCategory(
  data: {
    name: string;
    type: "INCOME" | "EXPENSE";
  }
) {
  return apiFetch("/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });
}