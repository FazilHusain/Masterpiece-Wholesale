import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

import { createQuickOrder } from "../../../redux/websiteQuickOrder/tradeQuickOrderThunk";

const steps = [
  {
    no: "1",
    title: "Paste your SKUs",
    desc: "Enter your SKU codes and quantities in the box to the left — one item per line.",
  },
  {
    no: "2",
    title: "Send via WhatsApp",
    desc: 'Click "Send Order via WhatsApp" and your list will be formatted and sent to our trade team instantly.',
  },
  {
    no: "3",
    title: "Confirmation",
    desc: "Our team confirms availability, pricing and dispatch timeline within a few hours.",
  },
];

export default function QuickOrderSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading } = useSelector((state) => state.websiteQuickOrder);

  const [orderText, setOrderText] = useState("");
  const [notes, setNotes] = useState("");

  const isTrade = location.pathname.startsWith("/trade");

  /* ============================================================
     WHATSAPP
  ============================================================ */

  const handleWhatsApp = () => {
    const phone = "919876543210";

    const message = `Hello His Masterpiece Team,

I would like to place a bulk order.

Thank you.`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  /* ============================================================
     SUBMIT QUICK ORDER
  ============================================================ */

  const handleSubmit = async () => {
    if (!orderText.trim()) {
      toast.error("Please enter at least one SKU.");
      return;
    }

    const payload = {
      orderItems: orderText,
      notes,
    };

    const resultAction = await dispatch(createQuickOrder(payload));

    if (createQuickOrder.fulfilled.match(resultAction)) {
      toast.success("Quick Order submitted successfully.");

      setOrderText("");
      setNotes("");
    } else {
      toast.error(
        resultAction.payload?.message || "Failed to submit quick order.",
      );
    }
  };

  return (
    <section className="bg-[#FAF8F4] py-12 md:py-14">
      <div className="mx-auto max-w-[1180px] px-5 lg:px-7">
        {/* ======================================================
            BACK TO DASHBOARD
        ====================================================== */}

        {isTrade && (
          <button
            type="button"
            onClick={() => navigate("/trade/dashboard")}
            className="mb-7 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#183425] transition hover:text-[#B68C2F]"
          >
            <ArrowLeft size={14} />
            Back to Dashboard
          </button>
        )}

        {/* ======================================================
            MAIN GRID
        ====================================================== */}

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ====================================================
              LEFT — ORDER FORM
          ==================================================== */}

          <div>
            {/* Heading */}

            <span className="text-[9px] font-medium uppercase tracking-[0.38em] text-[#B68C2F]">
              BULK SKU ENTRY
            </span>

            <h2
              className="mt-3 text-[31px] leading-[1.05] text-[#183425] md:text-[35px]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
              }}
            >
              Paste Your <span className="italic">Order List</span>
            </h2>

            <p className="mt-3 max-w-[570px] text-[12px] leading-6 text-[#6B6259]">
              Enter one SKU per line with the quantity. Your order will be sent
              directly to our trade team via WhatsApp for fast processing.
            </p>

            {/* =================================================
                FORM BOX
            ================================================= */}

            <div className="mt-6 border border-[#E4DDD3] bg-white p-5 md:p-6">
              {/* SKU FORMAT */}

              <div className="mb-4 flex flex-wrap items-center gap-2">
                <p className="text-[10px] uppercase tracking-[0.12em] text-[#8B8174]">
                  Format
                </p>

                <span className="bg-[#F5F1E8] px-2.5 py-1 font-mono text-[10px] text-[#6B6259]">
                  SKU-CODE, Quantity
                </span>
              </div>

              {/* SKU TEXTAREA */}

              <textarea
                value={orderText}
                onChange={(e) => setOrderText(e.target.value)}
                rows={7}
                placeholder={`HM-TR-SPR-001, 24
HM-DC-GAR-001, 12
HM-CT-SMG-001, 6
HM-CS-EMB-001, 18`}
                className="h-[155px] w-full resize-none border border-[#DED8CF] bg-[#FEFDFB] px-3.5 py-3 text-[12px] leading-6 text-[#183425] outline-none transition placeholder:text-[#AAA197] focus:border-[#B68C2F]"
              />

              {/* NOTES */}

              <div className="mt-5">
                <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#183425]">
                  Additional Notes
                </label>

                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Delivery instructions, preferred shipping, special requests..."
                  className="h-[90px] w-full resize-none border border-[#DED8CF] bg-[#FEFDFB] px-3.5 py-3 text-[12px] leading-6 text-[#183425] outline-none transition placeholder:text-[#AAA197] focus:border-[#B68C2F]"
                />
              </div>

              {/* CATALOGUE LINK */}

              <p className="mt-4 text-[10px] text-[#8B8174]">
                Not sure of your SKUs?{" "}
                <Link
                  to="/collections"
                  className="font-medium text-[#183425] underline underline-offset-2 transition hover:text-[#B68C2F]"
                >
                  Browse the full catalogue →
                </Link>
              </p>

              {/* =================================================
                  ACTION BUTTONS
              ================================================= */}

              <div className="mt-6">
                {/* Submit */}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex h-11 w-full items-center justify-center bg-[#183425] px-6 text-[9px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#10271b] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "SUBMITTING..." : "SUBMIT QUICK ORDER"}
                </button>

                {/* Secondary */}

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="flex h-10 items-center justify-center gap-2 bg-[#25D366] px-5 text-[9px] font-semibold uppercase tracking-[0.17em] text-white transition hover:bg-[#1EBE5D]"
                  >
                    <FaWhatsapp className="text-[15px]" />
                    Chat on WhatsApp
                  </button>

                  <Link
                    to="/collections"
                    className="flex h-10 items-center justify-center border border-[#183425] px-5 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#183425] transition hover:bg-[#183425] hover:text-white"
                  >
                    Browse Catalogue
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ====================================================
              RIGHT — HOW IT WORKS
          ==================================================== */}

          <div className="lg:pt-0">
            <span className="text-[9px] font-medium uppercase tracking-[0.38em] text-[#B68C2F]">
              HOW IT WORKS
            </span>

            <h2
              className="mt-3 text-[29px] leading-[1.05] text-[#183425] md:text-[34px]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
              }}
            >
              Simple <span className="italic">3-Step</span> Process
            </h2>

            <div className="mt-6 space-y-5">
              {steps.map((step) => (
                <div key={step.no} className="flex items-start gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#183425] text-[9px] font-medium text-white">
                    {step.no}
                  </div>

                  <div>
                    <h3
                      className="text-[18px] leading-tight text-[#183425]"
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                      }}
                    >
                      {step.title}
                    </h3>

                    <p className="mt-1.5 max-w-[440px] text-[11px] leading-5 text-[#6B6259]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* HELP BOX */}

            <div className="mt-7 bg-[#183425] px-5 py-4.5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <FaWhatsapp className="text-[17px] text-white" />
                </div>

                <div>
                  <p className="text-[10px] text-white/70">
                    Need help placing your order?
                  </p>

                  <a
                    href="tel:+919876543210"
                    className="mt-0.5 block text-[19px] font-semibold tracking-wide text-[#B68C2F] transition hover:text-white"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>

            {/* SMALL INFO */}

            <div className="mt-5 border border-[#E4DDD3] bg-white px-5 py-4">
              <p className="text-[11px] leading-5 text-[#777]">
                For large wholesale requirements, our trade team can also help
                with availability, pricing and production timelines before
                confirming your order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
