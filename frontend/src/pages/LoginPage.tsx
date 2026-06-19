import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {

    const navigate = useNavigate();
    const { login: loginUser } = useAuth();

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

            const response =
                await login(
                    email,
                    password
                );

            /*
        // only for debugging
        console.log(
            "LOGIN RESPONSE",
            response
        );
        */

            loginUser(
                response.data.accessToken,
                response.data.user
            );

            navigate("/dashboard");

        } catch (error) {

            alert(
                error instanceof Error
                    ? error.message
                    : "Login failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">

            <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

                <h1 className="text-3xl font-bold mb-2">
                    Welcome Back
                </h1>

                <p className="text-zinc-400 mb-8">
                    Login to FinSight
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

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
                                ? "Logging in..."
                                : "Login"
                        }
                    </button>

                </form>

                <p className="text-zinc-400 mt-6 text-center">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="text-emerald-400"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}