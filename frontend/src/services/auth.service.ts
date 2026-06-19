import { apiFetch } from "../lib/api";

export async function login(
  email: string,
  password: string
) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  });
}