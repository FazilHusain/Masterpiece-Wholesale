import { ArrowLeft, Home, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F5F0] px-5 py-10">
      <div className="w-full max-w-2xl text-center">

        {/* Icon */}

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#B68C2F]/30 bg-white shadow-sm">
          <ShieldAlert
            size={34}
            strokeWidth={1.5}
            className="text-[#B68C2F]"
          />
        </div>

        {/* 404 */}

        <p className="mt-8 text-7xl font-semibold tracking-tight text-[#12312B]">
          404
        </p>

        <h1 className="mt-3 text-3xl font-serif font-semibold text-[#12312B]">
          Admin Page Not Found
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-500">
          The admin page you're trying to access doesn't exist
          or the URL may have been entered incorrectly.
        </p>

        {/* Buttons */}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#12312B] px-7 text-sm font-semibold text-white transition hover:bg-[#0D2822]"
          >
            <Home size={17} />
            Admin Dashboard
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/login")}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#D8D1C7] bg-white px-7 text-sm font-semibold text-[#12312B] transition hover:border-[#B68C2F] hover:text-[#B68C2F]"
          >
            Admin Login
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#D8D1C7] bg-white px-7 text-sm font-semibold text-gray-600 transition hover:border-[#12312B] hover:text-[#12312B]"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>

        </div>

        {/* Brand */}

        <p className="mt-12 text-xs uppercase tracking-[0.3em] text-[#B68C2F]">
          His Masterpiece • Admin Portal
        </p>

      </div>
    </div>
  );
}