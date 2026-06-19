import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useAuth();

  const initials =
    user?.firstName?.charAt(0).toUpperCase() || "U";

  return (
    <header className="h-20 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-8">
      <div>
        <h1 className="text-xl font-semibold text-white">
          Financial Overview
        </h1>

        <p className="text-sm text-zinc-400">
          Track your money with confidence
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-white font-medium">
            {user?.firstName}
          </p>

          <p className="text-zinc-400 text-sm">
            {user?.email}
          </p>
        </div>

        <div className="h-11 w-11 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold">
          {initials}
        </div>
      </div>
    </header>
  );
}