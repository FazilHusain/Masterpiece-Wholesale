import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";

import { createContact } from "../../../redux/contact";

const ContactForm = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.error("Please enter your name.");
    }

    if (!formData.email.trim()) {
      return toast.error("Please enter your email.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      return toast.error("Please enter a valid email.");
    }

    if (!formData.phone.trim()) {
      return toast.error("Please enter your phone number.");
    }

    if (!formData.subject.trim()) {
      return toast.error("Please select a subject.");
    }

    if (!formData.message.trim()) {
      return toast.error("Please enter your message.");
    }

    const result = await dispatch(createContact(formData));

    if (createContact.fulfilled.match(result)) {
      toast.success(result.payload.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } else {
      toast.error(result.payload || "Something went wrong.");
    }
  };

  const whatsappMessage = encodeURIComponent(
    "Hi His Masterpiece Team, I would like to know more about your products."
  );

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/919876543210?text=${whatsappMessage}`,
      "_blank"
    );
  };

  return (
    <section className="bg-[#faf8f5] py-14 md:py-16">
      <div className="mx-auto max-w-[1140px] px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">

          {/* =====================================================
              LEFT — CONTACT FORM
          ===================================================== */}

          <div>
            {/* Section Heading */}
            <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-[#b38b59]">
              Send A Message
            </p>

            <h2
              className="mt-3 text-[34px] font-light leading-[1.05] text-[#111] md:text-[38px]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
              }}
            >
              Write to{" "}
              <span className="italic text-[#111]">
                Us
              </span>
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-7">

              {/* Name + Email */}
              <div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2">

                <FormField label="Your Name *">
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Arjun Sharma"
                    className="h-[42px] w-full border border-[#ddd9d1] bg-transparent px-3 text-[12px] text-[#333] outline-none transition placeholder:text-[#9a9a9a] focus:border-[#183824]"
                  />
                </FormField>

                <FormField label="Email *">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@business.com"
                    className="h-[42px] w-full border border-[#ddd9d1] bg-transparent px-3 text-[12px] text-[#333] outline-none transition placeholder:text-[#9a9a9a] focus:border-[#183824]"
                  />
                </FormField>

              </div>

              {/* Phone + Subject */}
              <div className="mt-5 grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2">

                <FormField label="Phone / Whatsapp">
                  <input
                    type="text"
                    name="phone"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="h-[42px] w-full border border-[#ddd9d1] bg-transparent px-3 text-[12px] text-[#333] outline-none transition placeholder:text-[#9a9a9a] focus:border-[#183824]"
                  />
                </FormField>

                <FormField label="Subject">
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="h-[42px] w-full cursor-pointer border border-[#ddd9d1] bg-transparent px-3 text-[12px] text-[#333] outline-none transition focus:border-[#183824]"
                  >
                    <option value="">
                      Select Subject
                    </option>

                    <option value="General Inquiry">
                      General Inquiry
                    </option>

                    <option value="Wholesale Partnership">
                      Wholesale Partnership
                    </option>

                    <option value="Sample Order">
                      Sample Order
                    </option>

                    <option value="Product Inquiry">
                      Product Inquiry
                    </option>

                    <option value="Support">
                      Support
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </FormField>

              </div>

              {/* Message */}
              <div className="mt-5">
                <FormField label="Message *">
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your business and how we can help..."
                    className="min-h-[138px] w-full resize-none border border-[#ddd9d1] bg-transparent p-3 text-[12px] leading-[1.6] text-[#333] outline-none transition placeholder:text-[#9a9a9a] focus:border-[#183824]"
                  />
                </FormField>
              </div>

              {/* Buttons */}
              <div className="mt-5 flex flex-wrap gap-3">

                <button
                  type="submit"
                  disabled={loading}
                  className={`flex h-[43px] items-center justify-center px-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition ${
                    loading
                      ? "cursor-not-allowed bg-[#183824]/60"
                      : "bg-[#183824] hover:bg-[#102418]"
                  }`}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                <button
                  type="button"
                  onClick={openWhatsApp}
                  disabled={loading}
                  className={`flex h-[43px] items-center justify-center gap-2 px-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition ${
                    loading
                      ? "cursor-not-allowed bg-[#25D366]/60"
                      : "bg-[#25D366] hover:bg-[#1ebe5d]"
                  }`}
                >
                  <FaWhatsapp size={14} />
                  WhatsApp Instead
                </button>

              </div>
            </form>
          </div>

          {/* =====================================================
              RIGHT — OTHER WAYS TO REACH US
          ===================================================== */}

          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-[#b38b59]">
              Connect With Us
            </p>

            <h2
              className="mt-3 text-[34px] font-light leading-[1.05] text-[#111] md:text-[38px]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
              }}
            >
              Other{" "}
              <span className="italic">
                Ways to Reach Us
              </span>
            </h2>

            {/* Contact Options */}
            <div className="mt-6 space-y-5">

              {/* WhatsApp */}
              <ContactItem
                icon={<FaWhatsapp size={16} />}
                title="WHATSAPP TRADE LINE"
                value="+91 98765 43210"
                extra="Mon-Sat 9:00 AM - 7:00 PM IST"
              />

              {/* Email */}
              <ContactItem
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="1"
                    />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                }
                title="TRADE EMAIL"
                value="trade@hismasterpiece.in"
              />

              {/* Studio */}
              <ContactItem
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                }
                title="DESIGN STUDIO"
                value="Design Studio, Delhi NCR, India"
              />

            </div>

            {/* Wholesale CTA */}
            <div className="mt-7 bg-[#183824] px-7 py-7">

              <h3
                className="text-[24px] font-normal leading-tight text-white"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                }}
              >
                Apply for Wholesale Access
              </h3>

              <p className="mt-3 max-w-md text-[11px] leading-6 text-white/70">
                Ready to stock His Masterpiece? Complete our trade
                application.
              </p>

              <a
                href="/wholesale"
                className="mt-5 inline-flex h-[42px] items-center bg-[#b38b59] px-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#9d7748]"
              >
                Apply Now
                <span className="ml-2">→</span>
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

/* ============================================================
   FORM FIELD
============================================================ */

const FormField = ({ label, children }) => {
  return (
    <div className="w-full">
      <label className="mb-2 block text-[9px] font-medium uppercase tracking-[0.18em] text-[#111]">
        {label}
      </label>

      {children}
    </div>
  );
};

/* ============================================================
   CONTACT ITEM
============================================================ */

const ContactItem = ({
  icon,
  title,
  value,
  extra,
}) => {
  return (
    <div className="flex items-start gap-3">

      <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center bg-[#183824] text-white">
        {icon}
      </div>

      <div className="pt-[1px]">

        <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#111]">
          {title}
        </p>

        <p className="mt-1 text-[12px] leading-5 text-[#53606a]">
          {value}
        </p>

        {extra && (
          <p className="mt-0.5 text-[9px] leading-4 text-[#7d7d7d]">
            {extra}
          </p>
        )}

      </div>

    </div>
  );
};

export default ContactForm;