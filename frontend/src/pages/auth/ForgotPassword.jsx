import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { forgotPassword } from "../../services/auth.service";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Email is required.");
    }

    try {
      setLoading(true);

      const { data } = await forgotPassword({
        email: email.trim(),
      });

      toast.success(
        data.message || "OTP sent successfully.",
      );

      navigate("/admin/reset-password", {
        state: {
          email: email.trim(),
        },
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to send OTP.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FAF8F5]">

      {/* =========================
          LEFT SECTION
      ========================= */}

      <div className="relative hidden overflow-hidden lg:flex lg:w-1/2">

        <img
          src="/admin/auth/logo-bg.png"
          alt="His Masterpiece"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute bottom-20 left-16 max-w-lg text-white">

          <h1 className="text-6xl font-serif leading-tight">
            His Masterpiece
          </h1>

          <p className="mt-5 text-xl text-white/90">
            Luxury Textile Administration Portal
          </p>

        </div>

      </div>

      {/* =========================
          RIGHT SECTION
      ========================= */}

      <div className="flex w-full items-center justify-center bg-[#FAF8F5] px-5 py-10 lg:w-1/2">

        <div className="w-full max-w-[460px] rounded-[30px] border border-[#ECE7DF] bg-white p-8 shadow-2xl sm:p-10">

          {/* Logo */}

          <img
            src="/admin/logo/logo.jpeg"
            alt="His Masterpiece"
            className="mx-auto h-20 w-auto object-contain"
          />

          {/* Heading */}

          <h2 className="mt-8 text-center text-5xl font-serif text-[#1F1F1F]">
            Forgot Password?
          </h2>

          <p className="mt-3 text-center text-base leading-6 text-gray-500">
            Enter your admin email address and we'll
            send you a verification OTP.
          </p>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >

            <div>

              <label className="mb-2 block text-sm font-medium text-[#222]">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="h-14 w-full rounded-xl border border-[#DDD] pl-12 pr-4 outline-none transition-all duration-300 focus:border-[#B68C2F] focus:ring-2 focus:ring-[#B68C2F]/20"
                />

              </div>

            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="h-14 w-full rounded-xl bg-[#B68C2F] text-lg font-semibold text-white transition-all duration-300 hover:bg-[#A67D28] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Sending OTP..."
                : "Send OTP"}
            </button>

          </form>

          {/* Back */}

          <button
            type="button"
            onClick={() => navigate("/admin/login")}
            className="mx-auto mt-7 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#B68C2F]"
          >
            <ArrowLeft size={17} />
            Back to Login
          </button>

          {/* Footer */}

          <p className="mt-8 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} His Masterpiece.
            All Rights Reserved.
          </p>

        </div>

      </div>

    </div>
  );
}