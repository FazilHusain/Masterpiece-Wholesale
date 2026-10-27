import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, SearchX } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <div className="flex min-h-screen items-center justify-center px-5 py-16">
        <div className="w-full max-w-2xl text-center">

          {/* Icon */}

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#D8B26A]/40 bg-white shadow-sm">
            <SearchX
              size={34}
              strokeWidth={1.5}
              className="text-[#B68C2F]"
            />
          </div>

          {/* 404 */}

          <p className="mt-8 text-7xl font-serif font-semibold tracking-tight text-[#12312B]">
            404
          </p>

          <h1 className="mt-3 text-3xl font-serif font-semibold text-[#12312B]">
            Page Not Found
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-500">
            Sorry, the page you're looking for doesn't exist,
            may have been moved, or the link may be incorrect.
          </p>

          {/* Buttons */}

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#12312B] px-7 text-sm font-semibold text-white transition hover:bg-[#0D2822]"
            >
              <Home size={17} />
              Back to Home
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#D8D1C7] bg-white px-7 text-sm font-semibold text-[#12312B] transition hover:border-[#B68C2F] hover:text-[#B68C2F]"
            >
              <ArrowLeft size={17} />
              Go Back
            </button>

          </div>

          {/* Brand */}

          <p className="mt-12 text-xs uppercase tracking-[0.3em] text-[#B68C2F]">
            His Masterpiece
          </p>

        </div>
      </div>
    </div>
  );
}