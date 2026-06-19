import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../services/auth.service";

export default function RegisterPage() {

  const navigate = useNavigate();

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      await register(
        firstName,
        lastName,
        email,
        password
      );

      alert(
        "Account created successfully"
      );

      navigate("/");

    } catch (error) {

      alert(
        error instanceof Error
          ? error.message
          : "Registration failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">

      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

        <h1 className="text-3xl font-bold mb-2">
          Create Account
        </h1>

        <p className="text-zinc-400 mb-8">
          Join FinSight
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) =>
              setFirstName(e.target.value)
            }
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3"
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) =>
              setLastName(e.target.value)
            }
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 rounded-lg py-3 font-semibold"
          >
            {
              loading
                ? "Creating Account..."
                : "Register"
            }
          </button>

        </form>

        <p className="text-zinc-400 mt-6 text-center">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-emerald-400"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}