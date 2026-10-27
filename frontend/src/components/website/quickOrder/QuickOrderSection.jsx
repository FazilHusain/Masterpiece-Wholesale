import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { createQuickOrder } from "../../../redux/websiteQuickOrder/tradeQuickOrderThunk";

const steps = [
  {
    no: "01",
    title: "Paste your SKUs",
    desc: "Enter your SKU codes and quantities in the box to the left — one item per line.",
  },
  {
    no: "02",
    title: "Send via WhatsApp",
    desc: 'Click "Send Order via WhatsApp" and your list will be formatted and sent to our trade team instantly.',
  },
  {
    no: "03",
    title: "Confirmation",
    desc: "Our team confirms availability, pricing and dispatch timeline within a few hours.",
  },
];

export default function QuickOrderSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading } = useSelector(
    (state) => state.websiteQuickOrder,
  );

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

    const resultAction = await dispatch(
      createQuickOrder(payload),
    );

    if (createQuickOrder.fulfilled.match(resultAction)) {
      toast.success("Quick Order submitted successfully.");

      setOrderText("");
      setNotes("");
    } else {
      toast.error(
        resultAction.payload?.message ||
          "Failed to submit quick order.",
      );
    }
  };

  return (
    <section className="bg-[#FAF8F4] py-7 sm:py-9 lg:py-10">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-7">

        {/* ======================================================
            BACK TO DASHBOARD
        ====================================================== */}

        {isTrade && (
          <button
            type="button"
            onClick={() => navigate("/trade/dashboard")}
            className="
              mb-6
              inline-flex
              items-center
              gap-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#183425]
              transition
              hover:text-[#B68C2F]
            "
          >
            <ArrowLeft size={14} />
            Back to Dashboard
          </button>
        )}

        {/* ======================================================
            PAGE INTRO
        ====================================================== */}

        <div className="mb-7 max-w-[700px]">
          <span
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.4em]
              text-[#B68C2F]
            "
          >
            QUICK ORDER
          </span>

          <h1
            className="
              mt-2
              text-[30px]
              leading-[1.05]
              text-[#183425]
              sm:text-[34px]
              lg:text-[36px]
            "
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 400,
            }}
          >
            Place Your{" "}
            <span className="italic">Bulk Order</span>
          </h1>

          <p className="mt-2 max-w-[650px] text-[12px] leading-5 text-[#6B6259] sm:text-[13px]">
            Send us your SKU list and quantities. Our trade team will
            review availability, pricing and dispatch timelines with
            you.
          </p>
        </div>

        {/* ======================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="grid items-stretch gap-6 lg:grid-cols-[1.08fr_0.92fr]">

          {/* ====================================================
              LEFT — ORDER FORM
          ==================================================== */}

          <div
            className="
              border
              border-[#E1D9CE]
              bg-white
              p-4
              sm:p-5
              lg:p-6
            "
          >
            {/* FORM HEADER */}

            <div className="border-b border-[#E9E2D9] pb-4">
              <span
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.3em]
                  text-[#B68C2F]
                "
              >
                BULK SKU ENTRY
              </span>

              <h2
                className="
                  mt-1.5
                  text-[25px]
                  leading-tight
                  text-[#183425]
                  sm:text-[27px]
                "
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: 400,
                }}
              >
                Paste Your{" "}
                <span className="italic">Order List</span>
              </h2>

              <p className="mt-1.5 text-[12px] leading-5 text-[#6B6259]">
                Enter one SKU per line with the required quantity.
              </p>
            </div>

            {/* FORMAT */}

            <div className="mt-5">
              <div className="mb-2.5 flex items-center gap-3">
                <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#81786E]">
                  Format
                </span>

                <span className="bg-[#F5F1E8] px-2.5 py-1 font-mono text-[10px] text-[#6B6259]">
                  SKU-CODE, Quantity
                </span>
              </div>

              {/* SKU TEXTAREA */}

              <textarea
                value={orderText}
                onChange={(e) => setOrderText(e.target.value)}
                rows={6}
                placeholder={`HM-TR-SPR-001, 24
HM-DC-GAR-001, 12
HM-CT-SMG-001, 6
HM-CS-EMB-001, 18`}
                className="
                  h-[145px]
                  w-full
                  resize-none
                  border
                  border-[#DED8CF]
                  bg-[#FEFDFB]
                  px-3.5
                  py-3
                  text-[12px]
                  leading-5.5
                  text-[#183425]
                  outline-none
                  transition
                  placeholder:text-[#AAA197]
                  focus:border-[#B68C2F]
                "
              />
            </div>

            {/* NOTES */}

            <div className="mt-4">
              <label
                className="
                  mb-2
                  block
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#183425]
                "
              >
                Additional Notes
              </label>

              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Delivery instructions, preferred shipping, special requests..."
                className="
                  h-[78px]
                  w-full
                  resize-none
                  border
                  border-[#DED8CF]
                  bg-[#FEFDFB]
                  px-3.5
                  py-3
                  text-[12px]
                  leading-5.5
                  text-[#183425]
                  outline-none
                  transition
                  placeholder:text-[#AAA197]
                  focus:border-[#B68C2F]
                "
              />
            </div>

            {/* CATALOGUE */}

            <div className="mt-3">
              <p className="text-[10px] text-[#8B8174]">
                Not sure of your SKUs?{" "}
                <Link
                  to="/collections"
                  className="
                    font-medium
                    text-[#183425]
                    underline
                    underline-offset-2
                    transition
                    hover:text-[#B68C2F]
                  "
                >
                  Browse the full catalogue →
                </Link>
              </p>
            </div>

            {/* ACTIONS */}

            <div className="mt-5 border-t border-[#E9E2D9] pt-5">

              {/* SUBMIT */}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="
                  flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  bg-[#183425]
                  px-5
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-white
                  transition
                  hover:bg-[#10271b]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading
                  ? "SUBMITTING..."
                  : "SUBMIT QUICK ORDER"}
              </button>

              {/* SECONDARY */}

              <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="
                    flex
                    h-10
                    items-center
                    justify-center
                    gap-2
                    bg-[#25D366]
                    px-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-white
                    transition
                    hover:bg-[#1EBE5D]
                  "
                >
                  <FaWhatsapp className="text-[15px]" />
                  Chat on WhatsApp
                </button>

                <Link
                  to="/collections"
                  className="
                    flex
                    h-10
                    items-center
                    justify-center
                    gap-2
                    border
                    border-[#183425]
                    px-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-[#183425]
                    transition
                    hover:bg-[#183425]
                    hover:text-white
                  "
                >
                  Browse Catalogue
                  <ArrowRight size={13} />
                </Link>

              </div>
            </div>
          </div>

          {/* ====================================================
              RIGHT — HOW IT WORKS
          ==================================================== */}

          <div
            className="
              flex
              flex-col
              border
              border-[#E1D9CE]
              bg-[#F4F0E9]
              p-4
              sm:p-5
              lg:p-6
            "
          >
            {/* HEADER */}

            <div>
              <span
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.4em]
                  text-[#B68C2F]
                "
              >
                HOW IT WORKS
              </span>

              <h2
                className="
                  mt-2
                  text-[27px]
                  leading-[1.05]
                  text-[#183425]
                  sm:text-[30px]
                "
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: 400,
                }}
              >
                Simple{" "}
                <span className="italic">3-Step</span> Process
              </h2>

              <p className="mt-2 text-[12px] leading-5 text-[#6B6259]">
                A simple way to send your wholesale requirements
                directly to our trade team.
              </p>
            </div>

            {/* STEPS */}

            <div className="mt-6 space-y-5">
              {steps.map((step) => (
                <div
                  key={step.no}
                  className="flex items-start gap-3.5"
                >
                  {/* NUMBER */}

                  <div
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      bg-[#183425]
                      text-[9px]
                      font-medium
                      tracking-[0.08em]
                      text-white
                    "
                  >
                    {step.no}
                  </div>

                  {/* CONTENT */}

                  <div className="pt-0.5">
                    <h3
                      className="
                        text-[18px]
                        leading-tight
                        text-[#183425]
                      "
                      style={{
                        fontFamily:
                          "Cormorant Garamond, serif",
                        fontWeight: 400,
                      }}
                    >
                      {step.title}
                    </h3>

                    <p className="mt-1 max-w-[430px] text-[11px] leading-5 text-[#6B6259]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* SPACER */}

            <div className="flex-1" />

            {/* WHATSAPP HELP */}

            <div className="mt-6 bg-[#183425] px-4 py-4 sm:px-5">
              <div className="flex items-center gap-3.5">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/10
                  "
                >
                  <FaWhatsapp className="text-[18px] text-white" />
                </div>

                <div>
                  <p className="text-[10px] text-white/70">
                    Prefer to speak directly?
                  </p>

                  <p className="mt-0.5 text-[10px] text-white/80">
                    Reach our trade team on WhatsApp
                  </p>

                  <a
                    href="tel:+919876543210"
                    className="
                      mt-0.5
                      block
                      text-[18px]
                      font-semibold
                      tracking-wide
                      text-[#B68C2F]
                      transition
                      hover:text-white
                    "
                  >
                    +91 98765 43210
                  </a>
                </div>

              </div>
            </div>

            {/* INFO */}

            <div className="mt-3 border border-[#DDD5C9] bg-white px-4 py-3">
              <p
                className="text-[12px] italic leading-5.5 text-[#444]"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                }}
              >
                For larger wholesale requirements, our trade team can
                assist with availability, pricing and production
                timelines before confirming your order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}