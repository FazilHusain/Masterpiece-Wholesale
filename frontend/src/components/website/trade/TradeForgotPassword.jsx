import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import toast from "react-hot-toast";

import { tradeForgotPassword } from "../../../services/trade.service";

export default function TradeForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await tradeForgotPassword(cleanEmail);

      toast.success(
        data?.message || "OTP sent successfully."
      );

      // Keep email for reset page
      sessionStorage.setItem("tradeResetEmail", cleanEmail);

      navigate("/trade/reset-password");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Unable to send OTP. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] bg-[#FAF8F5] px-6 py-14 md:py-20">
      <div className="mx-auto max-w-5xl">

        <Link
          to="/trade-login"
          className="mb-8 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#183425] transition hover:text-[#B68C2F]"
        >
          <ArrowLeft size={14} />
          Back To Login
        </Link>

        <div className="grid overflow-hidden border border-[#E7E2D8] bg-white lg:grid-cols-[1fr_0.75fr]">

          {/* FORM */}

          <div className="p-7 md:p-10 lg:p-12">

            <div className="mb-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#183425] text-[#B68C2F]">
                <Mail size={20} strokeWidth={1.6} />
              </div>

              <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-[#B68C2F]">
                Trade Portal
              </p>

              <h1 className="mt-3 font-cormorant text-[40px] leading-[1.05] text-[#183425]">
                Forgot Your{" "}
                <span className="italic text-[#B68C2F]">
                  Password?
                </span>
              </h1>

              <p className="mt-4 text-[13px] leading-6 text-[#6B6259]">
                Enter the email address associated with your
                approved trade account. We'll send you a
                verification code.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#183425]">
                  Trade Account Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="you@business.com"
                  autoComplete="email"
                  className="h-12 w-full border border-[#DED8CF] px-4 text-[13px] text-[#183425] outline-none transition placeholder:text-[#AAA298] focus:border-[#B68C2F]"
                />
              </div>

              {error && (
                <div className="border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-[12px] text-red-600">
                    {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 bg-[#183425] text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#10281B] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  "Sending OTP..."
                ) : (
                  <>
                    Send Verification Code
                    <ArrowRight size={15} />
                  </>
                )}
              </button>

            </form>

            <p className="mt-7 text-center text-[12px] text-[#6B6259]">
              Remember your password?{" "}
              <Link
                to="/trade-login"
                className="font-semibold text-[#B68C2F] hover:underline"
              >
                Sign In
              </Link>
            </p>

          </div>

          {/* RIGHT */}

          <div className="hidden bg-[#183425] p-10 text-white lg:flex lg:flex-col lg:justify-center">

            <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-[#B68C2F]">
              Secure Recovery
            </p>

            <h2 className="mt-4 font-cormorant text-[40px] leading-[1.08]">
              Get Back Into Your{" "}
              <span className="italic text-[#B68C2F]">
                Trade Account
              </span>
            </h2>

            <p className="mt-5 text-[13px] leading-7 text-white/65">
              We'll verify your trade account using a
              one-time password before allowing you to
              create a new password.
            </p>

            <div className="mt-8 border-l border-[#B68C2F] pl-5">
              <p className="text-[11px] leading-5 text-white/60">
                The verification code expires after 10
                minutes.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}