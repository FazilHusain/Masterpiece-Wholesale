import {
  MessageCircle,
  Mail,
  Clock3,
  MapPin,
} from "lucide-react";

const ContactHero = () => {
  return (
    <section className="bg-[#183425] text-white">
      {/* ================= HERO ================= */}
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="py-14 text-center md:py-16">
          <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#c8a045]">
            Get In Touch
          </p>

          <h1
            className="mt-4 text-[34px] font-light leading-[1.1] text-white sm:text-[38px] md:text-[42px]"
            style={{
              fontFamily: "Cormorant Garamond, serif",
            }}
          >
            Contact{" "}
            <span className="italic text-[#c8a045]">
              His Masterpiece
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-[12px] leading-6 text-white/70">
            Reach our trade team directly. We respond within 24 hours —
            WhatsApp is fastest.
          </p>
        </div>
      </div>

      {/* ================= CONTACT STRIP ================= */}
      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <ContactItem
            icon={<MessageCircle size={19} strokeWidth={1.6} />}
            title="WHATSAPP (FASTEST)"
            value="+91 98765 43210"
          />

          <ContactItem
            icon={<Mail size={19} strokeWidth={1.6} />}
            title="TRADE EMAIL"
            value="trade@hismasterpiece.in"
          />

          <ContactItem
            icon={<Clock3 size={19} strokeWidth={1.6} />}
            title="RESPONSE TIME"
            value="Within 24 Hours"
          />

          <ContactItem
            icon={<MapPin size={19} strokeWidth={1.6} />}
            title="DESIGN STUDIO"
            value="Delhi NCR, India"
          />
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({ icon, title, value }) => {
  return (
    <div className="flex min-h-[86px] items-center gap-4 border-b border-white/10 px-5 py-5 sm:px-6 lg:min-h-[82px] lg:border-b-0 lg:border-r lg:last:border-r-0">
      <div className="shrink-0 text-[#c8a045]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-white/45">
          {title}
        </p>

        <p className="mt-1.5 truncate text-[13px] font-normal text-white">
          {value}
        </p>
      </div>
    </div>
  );
};

export default ContactHero;