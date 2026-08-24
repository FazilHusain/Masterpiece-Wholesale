import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

import { tradeSetPassword } from "../../../services/trade.service";

export default function SetPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = formData;

    if (!currentPassword.trim()) {
      setError("Please enter your current password.");
      return;
    }

    if (!newPassword.trim()) {
      setError("Please enter your new password.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setError(
        "New password must be different from your current password."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await tradeSetPassword({
        currentPassword,
        newPassword,
      });

      toast.success(
        data?.message || "Password updated successfully."
      );

      // Update stored trade user
      const storedUser = localStorage.getItem("tradeUser");

      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);

          localStorage.setItem(
            "tradeUser",
            JSON.stringify({
              ...user,
              mustChangePassword: false,
            })
          );
        } catch {
          // Ignore invalid local storage data
        }
      }

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      navigate("/trade/dashboard", { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Unable to update password. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] bg-[#FAF8F5] px-6 py-14 md:py-20">
      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1fr_0.8fr]">

        {/* ================= LEFT ================= */}

        <div className="rounded-sm border border-[#E7E2D8] bg-white p-7 shadow-sm md:p-10">

          <div className="mb-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-[#B68C2F]">
              Trade Portal
            </p>

            <h1 className="mt-3 font-cormorant text-[38px] leading-[1.05] text-[#183425] md:text-[44px]">
              Set Your{" "}
              <span className="italic text-[#B68C2F]">
                Password
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-[13px] leading-6 text-[#6B6259]">
              For security, please create a new password before
              continuing to your trade account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Current Password */}

            <PasswordField
              label="Current Password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              show={showCurrent}
              setShow={setShowCurrent}
            />

            {/* New Password */}

            <PasswordField
              label="New Password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              show={showNew}
              setShow={setShowNew}
            />

            {/* Confirm Password */}

            <PasswordField
              label="Confirm New Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter new password"
              show={showConfirm}
              setShow={setShowConfirm}
            />

            {/* Password hint */}

            <p className="text-[11px] leading-5 text-[#8B8175]">
              Your password must contain at least 8 characters.
            </p>

            {/* Error */}

            {error && (
              <div className="border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-[12px] leading-5 text-red-600">
                  {error}
                </p>
              </div>
            )}

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 bg-[#183425] text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#10281B] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                "Updating Password..."
              ) : (
                <>
                  Update Password
                  <ArrowRight size={15} />
                </>
              )}
            </button>

          </form>
        </div>

        {/* ================= RIGHT ================= */}

        <div className="hidden lg:block">

          <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-full bg-[#183425] text-[#B68C2F]">
            <LockKeyhole size={23} strokeWidth={1.5} />
          </div>

          <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-[#B68C2F]">
            Account Security
          </p>

          <h2 className="mt-3 font-cormorant text-[38px] leading-[1.08] text-[#183425]">
            One More Step
          </h2>

          <p className="mt-5 text-[13px] leading-7 text-[#6B6259]">
            Your trade account requires a password update before
            you can access wholesale pricing, orders and other
            trade portal features.
          </p>

          <div className="mt-8 space-y-4">

            <SecurityItem text="Keep your password private." />

            <SecurityItem text="Use at least 8 characters." />

            <SecurityItem text="Choose a password you have not used before." />

          </div>

          <div className="mt-9 border-l-2 border-[#B68C2F] bg-[#F5F1E8] px-5 py-4">
            <p className="text-[11px] leading-5 text-[#6B6259]">
              Once your password is updated, you'll be taken
              directly to your trade dashboard.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

/* =====================================================
   PASSWORD FIELD
===================================================== */

const PasswordField = ({
  label,
  name,
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
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="new-password"
          className="h-12 w-full border border-[#DED8CF] bg-white px-4 pr-12 text-[13px] text-[#183425] outline-none transition placeholder:text-[#AAA298] focus:border-[#B68C2F]"
        />

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-[#8A8175] transition hover:text-[#183425]"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? (
            <EyeOff size={17} strokeWidth={1.7} />
          ) : (
            <Eye size={17} strokeWidth={1.7} />
          )}
        </button>
      </div>
    </div>
  );
};

/* =====================================================
   SECURITY ITEM
===================================================== */

const SecurityItem = ({ text }) => {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#183425] text-[9px] text-white">
        ✓
      </span>

      <p className="text-[12px] leading-5 text-[#6B6259]">
        {text}
      </p>
    </div>
  );
};