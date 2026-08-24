import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginAdmin } from "../../services/auth.service";
import { loginSuccess, setLoading } from "../../redux/auth/authSlice";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Email and Password are required.");
    }

    try {
      dispatch(setLoading(true));

      const { data } = await loginAdmin(formData);

      localStorage.setItem("adminToken", data.token);

      dispatch(loginSuccess(data.admin));

      toast.success(data.message);

      navigate("/admin/dashboard");
    } catch (error) {
      dispatch(setLoading(false));

      toast.error(error?.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FAF8F5]">
      {/* Left Section */}
      <div className="relative hidden overflow-hidden lg:flex lg:w-1/2">
        <img
          src="/admin/auth/logo-bg.png"
          alt="His Masterpiece"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute bottom-20 left-16 max-w-lg text-white">
          <h1 className="text-6xl font-serif leading-tight">His Masterpiece</h1>

          <p className="mt-5 text-xl text-white/90">
            Luxury Textile Administration Portal
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full items-center justify-center bg-[#FAF8F5] px-5 py-10 lg:w-1/2">
        <div className="w-full max-w-[460px] rounded-[30px] border border-[#ECE7DF] bg-white p-8 shadow-2xl sm:p-10">
          {/* Logo */}
          <img
            src="/admin/logo/logo.jpeg"
            alt="Logo"
            className="mx-auto h-20 w-auto object-contain"
          />

          {/* Heading */}
          <h2 className="mt-8 text-center text-5xl font-serif text-[#1F1F1F]">
            Welcome Back
          </h2>

          <p className="mt-3 text-center text-base text-gray-500">
            Sign in to continue
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#222]">
                Email Address
              </label>

              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="h-14 w-full rounded-xl border border-[#DDD] px-4 outline-none transition-all duration-300 focus:border-[#B68C2F] focus:ring-2 focus:ring-[#B68C2F]/20"
              />
            </div>

            {/* Password */}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#222]">
                Password
              </label>

              <div className="relative">
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-14 w-full rounded-xl border border-[#DDD] px-4 pr-12 outline-none transition-all duration-300 focus:border-[#B68C2F] focus:ring-2 focus:ring-[#B68C2F]/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#B68C2F]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/admin/forgot-password")}
                className="text-sm font-medium text-[#B68C2F] transition hover:text-[#8F6A20]"
              >
                Forgot Password?
              </button>
            </div>

            {/* Button */}

            <button
              type="submit"
              className="h-14 w-full rounded-xl bg-[#B68C2F] text-lg font-semibold text-white transition-all duration-300 hover:bg-[#A67D28] hover:shadow-lg"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} His Masterpiece. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
