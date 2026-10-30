
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  RefreshCw,
  UserRound,
  BriefcaseBusiness,
} from "lucide-react";
import { toast } from "sonner";

import api from "../api/client";
import { useAuth } from "../context/AuthContext";
import RequestCard from "../components/RequestCard";

export default function Dashboard() {
  const { user } = useAuth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Safely handle user information
  const userName = user?.name || user?.fullName || "User";
  const firstName = userName.split(" ")[0];
  const userRole = user?.role || "customer";

  // Load dashboard requests
  const load = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const endpoint =
        userRole === "provider"
          ? "/requests/provider"
          : "/requests/mine";

      const response = await api.get(endpoint);

      setItems(response.data?.requests || []);
    } catch (error) {
      console.error("Dashboard loading error:", error);

      toast.error(
        error.response?.data?.message ||
          "Could not load dashboard."
      );

      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [user, userRole]);

  useEffect(() => {
    load();
  }, [load]);

  if (!user) {
    return (
      <section className="container-shell py-20 text-center">
        <p className="text-slate-500">
          Loading user information...
        </p>
      </section>
    );
  }

  return (
    <section className="container-shell py-10 sm:py-14">

      {/* Dashboard Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#16836e]">
            YOUR HELPCIRCLE
          </p>

          <h1 className="mt-2 font-display text-3xl font-extrabold text-[#12312b]">
            Welcome, {firstName}.
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {userRole === "provider"
              ? "Manage requests matched with your services."
              : "Keep track of the help requests you have posted."}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={load}
            disabled={loading}
            className="rounded-full border border-slate-200 bg-white p-3 disabled:opacity-50"
            title="Refresh dashboard"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
          </button>

          {userRole === "customer" && (
            <Link
              to="/create-request"
              className="inline-flex items-center gap-2 rounded-full bg-[#0b2825] px-5 py-3 text-sm font-bold text-white"
            >
              <Plus size={16} />
              New request
            </Link>
          )}
        </div>
      </div>

      {/* Dashboard Statistics */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">

        <div className="surface rounded-2xl p-5">
          <UserRound className="text-emerald-700" />

          <p className="mt-3 text-2xl font-extrabold">
            {items.length}
          </p>

          <p className="text-xs text-slate-500">
            {userRole === "provider"
              ? "Matched requests"
              : "Your requests"}
          </p>
        </div>

        <div className="surface rounded-2xl p-5">
          <BriefcaseBusiness className="text-emerald-700" />

          <p className="mt-3 text-2xl font-extrabold">
            {items.filter(
              (item) => item.status?.toLowerCase() === "open"
            ).length}
          </p>

          <p className="text-xs text-slate-500">
            Open requests
          </p>
        </div>

        <div className="surface rounded-2xl p-5">
          <RefreshCw className="text-emerald-700" />

          <p className="mt-3 text-2xl font-extrabold">
            {items.filter(
              (item) => item.status?.toLowerCase() === "completed"
            ).length}
          </p>

          <p className="text-xs text-slate-500">
            Completed
          </p>
        </div>

      </div>

      {/* Provider Profile */}
      {userRole === "provider" && (
        <div className="mt-6 rounded-2xl bg-[#e5f6ec] p-5">
          <h2 className="font-bold text-[#0b2825]">
            Provider profile
          </h2>

          <p className="mt-1 text-sm text-[#42665a]">
            Add your services and current location to receive
            relevant nearby requests.
          </p>

          <Link
            to="/provider-profile"
            className="mt-3 inline-block text-sm font-bold text-emerald-800"
          >
            Set up provider profile →
          </Link>
        </div>
      )}

      {/* Requests Section */}
      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-display text-2xl font-extrabold text-[#12312b]">
          {userRole === "provider"
            ? "Matched requests"
            : "Your requests"}
        </h2>

        <Link
          to="/explore"
          className="text-sm font-bold text-emerald-800"
        >
          Explore community →
        </Link>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="py-12 text-center text-slate-500">
          Loading requests...
        </p>
      ) : items.length > 0 ? (

        /* Request Cards */
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <RequestCard
              key={item._id}
              request={item}
            />
          ))}
        </div>

      ) : (

        /* Empty State */
        <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h3 className="font-display text-xl font-bold">
            Nothing here yet
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {userRole === "provider"
              ? "When a nearby request matches your services, it will appear here."
              : "Your published requests will appear here."}
          </p>

          {userRole === "customer" && (
            <Link
              to="/create-request"
              className="mt-4 inline-block rounded-full bg-[#0b2825] px-5 py-3 text-sm font-bold text-white"
            >
              Create your first request
            </Link>
          )}
        </div>
      )}

    </section>
  );
}
