import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MessageCircle, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import { tradeLogin } from "../../../services/trade.service";

export default function TradeLoginSection() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!formData.password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await tradeLogin(formData);

      const response = data?.data;

      if (!response?.token) {
        throw new Error("Invalid login response.");
      }

      localStorage.setItem("tradeToken", response.token);
      localStorage.setItem("tradeUser", JSON.stringify(response));

      toast.success("Welcome to the Trade Portal.");

      if (response.mustChangePassword) {
        navigate("/trade/set-password", {
          replace: true,
        });
      } else {
        navigate("/trade/dashboard", {
          replace: true,
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#FAF8F5] py-12 lg:py-16">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        {/* ================= LEFT ================= */}

        <div className="border border-[#E7E1D7] bg-white p-6 sm:p-7 lg:p-8">
          <h2
            className="text-[30px] leading-tight text-[#173724]"
            style={{
              fontFamily: "Cormorant Garamond, serif",
            }}
          >
            Trade Account Login
          </h2>

          <p className="mt-2 max-w-md text-[12px] leading-5 text-[#77706A]">
            Sign in to your approved trade account to view wholesale pricing and
            place orders.
          </p>

          <form onSubmit={handleLogin} className="mt-7 space-y-5">
            {/* EMAIL */}

            <div>
              <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.22em] text-[#173724]">
                Username or Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@business.com"
                autoComplete="email"
                className="h-11 w-full border border-[#DDD7CE] bg-[#FCFBF8] px-4 text-[12px] text-[#173724] outline-none transition placeholder:text-[#AAA39A] focus:border-[#173724]"
              />
            </div>

            {/* PASSWORD */}

            <div>
              <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.22em] text-[#173724]">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="h-11 w-full border border-[#DDD7CE] bg-[#FCFBF8] px-4 pr-11 text-[12px] text-[#173724] outline-none transition placeholder:text-[#AAA39A] focus:border-[#173724]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A837A] transition hover:text-[#173724]"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* FORGOT */}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/trade/forgot-password")}
                className="text-xs text-[#B68C2F] transition hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* ERROR */}

            {error && (
              <p className="border border-red-100 bg-red-50 px-3 py-2 text-[11px] text-red-600">
                {error}
              </p>
            )}

            {/* LOGIN */}

            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center bg-[#173724] px-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#20492F] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Sign In To Trade Portal"}
            </button>
          </form>

          {/* APPLY */}

          <div className="mt-6 text-center text-[11px] text-[#77706A]">
            Don't have a trade account?{" "}
            <button
              type="button"
              onClick={() => navigate("/wholesale")}
              className="inline-flex items-center gap-2 font-medium text-[#B48A2C] hover:underline"
            >
              Apply Here
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* ================= RIGHT ================= */}

        <div className="pt-1">
          <span className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#B48A2C]">
            Trade Portal Features
          </span>

          <h2
            className="mt-3 text-[38px] leading-[1.05] text-[#173724] lg:text-[44px]"
            style={{
              fontFamily: "Cormorant Garamond, serif",
            }}
          >
            What You Get <span className="italic">Inside</span>
          </h2>

          <ul className="mt-6 space-y-3 text-[12px] leading-5 text-[#68625B]">
            <li>✓ Full product range with USD wholesale pricing</li>
            <li>✓ Seasonal pre-order windows and new collections</li>
            <li>✓ Order tracking and complete order history</li>
            <li>✓ Downloadable look books & style guides</li>
            <li>✓ Exclusive territory management</li>
            <li>✓ Direct WhatsApp support from your account manager</li>
          </ul>

          {/* HELP */}

          <div className="mt-7 flex items-center gap-4 bg-[#173724] px-5 py-4 text-white">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
              <MessageCircle size={18} />
            </div>

            <div>
              <p className="text-[10px] text-white/60">
                Need help accessing your account?
              </p>

              <a
                href="tel:+919876543210"
                className="mt-1 block text-[17px] font-semibold tracking-wide text-[#B48A2C]"
              >
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
