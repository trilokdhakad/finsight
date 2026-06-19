import {
  LayoutDashboard,
  Receipt,
  Tags,
  BarChart3,
  LogOut,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

import { Button } from "../ui/button";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-72 border-r border-zinc-800 bg-zinc-950 flex flex-col">

      <div className="p-6 border-b border-zinc-800">

        <h1 className="text-3xl font-bold text-white">
          FinSight
        </h1>

        <p className="text-zinc-400 text-sm mt-1">
          Personal Finance Tracker
        </p>

      </div>

      <nav className="flex-1 p-4 space-y-2">

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
            location.pathname ===
            "/dashboard"
              ? "bg-zinc-800 text-white"
              : "text-zinc-400 hover:bg-zinc-900"
          }`}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button
          onClick={() =>
            navigate("/transactions")
          }
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
            location.pathname ===
            "/transactions"
              ? "bg-zinc-800 text-white"
              : "text-zinc-400 hover:bg-zinc-900"
          }`}
        >
          <Receipt size={20} />
          Transactions
        </button>

        <button
          onClick={() =>
            navigate("/categories")
          }
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
            location.pathname ===
            "/categories"
              ? "bg-zinc-800 text-white"
              : "text-zinc-400 hover:bg-zinc-900"
          }`}
        >
          <Tags size={20} />
          Categories
        </button>

        <button
          onClick={() =>
            navigate("/analytics")
          }
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
            location.pathname ===
            "/analytics"
              ? "bg-zinc-800 text-white"
              : "text-zinc-400 hover:bg-zinc-900"
          }`}
        >
          <BarChart3 size={20} />
          Analytics
        </button>

      </nav>

      <div className="p-4 border-t border-zinc-800">

        <Button
          variant="destructive"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut />
          Logout
        </Button>

      </div>

    </aside>
  );
}