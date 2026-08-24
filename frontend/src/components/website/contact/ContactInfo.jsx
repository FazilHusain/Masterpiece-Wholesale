import {
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";

const ContactInfo = () => {
  return (
    <div>

      <p className="uppercase tracking-[4px] text-[#B58D2F] text-[11px] font-medium">
        CONNECT WITH US
      </p>

      <h2 className="mt-2 text-[42px] lg:text-[46px] leading-none font-light font-serif text-[#111]">

        Other Ways to{" "}

        <span className="italic">
          Reach Us
        </span>

      </h2>

      <div className="mt-7 space-y-6">

        {/* WhatsApp */}

        <div className="flex items-start gap-5">

          <div
            className="w-11 h-11
            bg-[#183824]
            text-white
            flex
            items-center
            justify-center"
          >
            <MessageCircle size={18} />
          </div>

          <div>

            <p className="uppercase tracking-[2px] text-[11px] font-semibold">

              WHATSAPP TRADE LINE

            </p>

            <p className="mt-2 text-[14px] text-[#555]">

              +91 98765 43210

            </p>

            <p className="mt-1 text-[14px] text-[#8d8d8d]">

              Mon-Sat 9:00 AM - 7:00 PM IST

            </p>

          </div>

        </div>

        {/* Email */}

        <div className="flex items-start gap-5">

          <div
            className="w-[42px] h-[42px]
            bg-[#183824]
            text-white
            flex
            items-center
            justify-center"
          >
            <Mail size={18} />
          </div>

          <div>

            <p className="uppercase tracking-[2px] text-[11px] font-semibold">

              TRADE EMAIL

            </p>

            <p className="mt-2 text-[14px] text-[#555]">

              trade@hismasterpiece.in

            </p>

          </div>

        </div>

        {/* Address */}

        <div className="flex items-start gap-5">

          <div
            className="w-[42px] h-[42px]
            bg-[#183824]
            text-white
            flex
            items-center
            justify-center"
          >
            <MapPin size={18} />
          </div>

          <div>

            <p className="uppercase tracking-[2px] text-[11px] font-semibold">

              DESIGN STUDIO

            </p>

            <p className="mt-2 text-[14px] text-[#555]">

              Design Studio, Delhi NCR, India

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ContactInfo;