import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
} from "lucide-react";
import toast from "react-hot-toast";

import { tradeResetPassword } from "../../../services/trade.service";

export default function TradeResetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("tradeResetEmail");

    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    if (!password) {
      setError("Please enter a new password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await tradeResetPassword({
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
        password,
      });

      toast.success(
        data?.message || "Password reset successfully."
      );

      sessionStorage.removeItem("tradeResetEmail");

      navigate("/trade-login", { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Unable to reset password. Please try again.";

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
                <KeyRound size={20} strokeWidth={1.6} />
              </div>

              <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-[#B68C2F]">
                Verify & Reset
              </p>

              <h1 className="mt-3 font-cormorant text-[40px] leading-[1.05] text-[#183425]">
                Create A New{" "}
                <span className="italic text-[#B68C2F]">
                  Password
                </span>
              </h1>

              <p className="mt-4 text-[13px] leading-6 text-[#6B6259]">
                Enter the OTP sent to your email and create
                a new password for your trade account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}

              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#183425]">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="you@business.com"
                  className="h-12 w-full border border-[#DED8CF] px-4 text-[13px] text-[#183425] outline-none transition placeholder:text-[#AAA298] focus:border-[#B68C2F]"
                />
              </div>

              {/* OTP */}

              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#183425]">
                  Verification Code
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    setOtp(
                      e.target.value.replace(/\D/g, "")
                    );
                    setError("");
                  }}
                  placeholder="Enter 6-digit OTP"
                  className="h-12 w-full border border-[#DED8CF] px-4 text-[13px] tracking-[0.3em] text-[#183425] outline-none transition placeholder:text-[#AAA298] focus:border-[#B68C2F]"
                />
              </div>

              {/* PASSWORD */}

              <PasswordInput
                label="New Password"
                value={password}
                onChange={(value) => {
                  setPassword(value);
                  setError("");
                }}
                placeholder="Minimum 8 characters"
                show={showPassword}
                setShow={setShowPassword}
              />

              {/* CONFIRM */}

              <PasswordInput
                label="Confirm New Password"
                value={confirmPassword}
                onChange={(value) => {
                  setConfirmPassword(value);
                  setError("");
                }}
                placeholder="Re-enter your password"
                show={showConfirm}
                setShow={setShowConfirm}
              />

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
                  "Resetting Password..."
                ) : (
                  <>
                    Reset Password
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
              Almost{" "}
              <span className="italic text-[#B68C2F]">
                There
              </span>
            </h2>

            <p className="mt-5 text-[13px] leading-7 text-white/65">
              Your OTP is valid for 10 minutes. Once
              verified, your new password will immediately
              replace the old one.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}

const PasswordInput = ({
  label,
  value,
  onChange,
  placeholder,
  show,
  setShow,
}) => {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#183425]">
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="new-password"
          className="h-12 w-full border border-[#DED8CF] px-4 pr-12 text-[13px] text-[#183425] outline-none transition placeholder:text-[#AAA298] focus:border-[#B68C2F]"
        />

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-[#8A8175] hover:text-[#183425]"
        >
          {show ? (
            <EyeOff size={17} />
          ) : (
            <Eye size={17} />
          )}
        </button>
      </div>
    </div>
  );
};