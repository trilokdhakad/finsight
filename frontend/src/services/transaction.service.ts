import { apiFetch } from "../lib/api";

export async function getTransactions() {
  return apiFetch("/transactions");
}

export async function getCategories() {
  return apiFetch("/categories");
}

export async function createTransaction(
  data: {
    amount: number;
    type: "INCOME" | "EXPENSE";
    categoryId: string;
    transactionDate: string;
    description?: string;
    paymentMethod?: string;
  }
) {
  return apiFetch("/transactions", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteTransaction(
  id: string
) {
  return apiFetch(
    `/transactions/${id}`,
    {
      method: "DELETE",
    }
  );
}