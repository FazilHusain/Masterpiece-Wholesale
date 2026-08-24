import { Link } from "react-router-dom";
import {
  Check,
  ArrowRight,
} from "lucide-react";

export default function WholesaleSection() {
  return (
    <section className="bg-[#f7f5f0] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5">

        <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr]">

          {/* LEFT */}

          <div className="flex flex-col justify-center">

            <p className="text-[10px] uppercase tracking-[0.35em] text-[#b8862b]">
              WHOLESALE
            </p>

            <h2
              className="mt-4 text-[38px] leading-[1.1] text-[#1b1b1b] lg:text-[52px]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
              }}
            >
              Become Our
              <br />
              Wholesale Partner
            </h2>

            <p className="mt-6 max-w-lg text-[16px] leading-8 text-gray-600">
              Partner with His Masterpiece for handcrafted home textiles,
              premium collections and reliable worldwide export solutions.
            </p>

            {/* Benefits */}

            <div className="mt-10 space-y-5">

              {[
                "Premium handcrafted collections",
                "Worldwide shipping support",
                "Low MOQ & private labeling",
                "Dedicated export assistance",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b8862b]/10">
                    <Check
                      size={18}
                      className="text-[#b8862b]"
                    />
                  </div>

                  <span className="text-[15px] text-gray-700">
                    {item}
                  </span>
                </div>
              ))}

            </div>

            {/* CTA */}

            <Link
              to="/wholesale"
              className="mt-10 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1b1b1b] hover:text-[#b8862b]"
            >
              Learn More

              <ArrowRight size={16} />

            </Link>

          </div>

          {/* RIGHT */}

          <div className="bg-white p-8 shadow-sm lg:p-10">

            <h3
              className="text-[34px] text-[#1b1b1b]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
              }}
            >
              Request Wholesale Catalogue
            </h3>

            <p className="mt-2 text-gray-500">
              Fill in your details and our export team will contact you shortly.
            </p>

            <form className="mt-8 space-y-5">

              <div className="grid gap-5 md:grid-cols-2">

                <input
                  type="text"
                  placeholder="First Name"
                  className="h-14 border border-gray-200 px-5 outline-none focus:border-[#b8862b]"
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  className="h-14 border border-gray-200 px-5 outline-none focus:border-[#b8862b]"
                />

              </div>

              <input
                type="text"
                placeholder="Company Name"
                className="h-14 w-full border border-gray-200 px-5 outline-none focus:border-[#b8862b]"
              />

              <div className="grid gap-5 md:grid-cols-2">

                <input
                  type="email"
                  placeholder="Business Email"
                  className="h-14 border border-gray-200 px-5 outline-none focus:border-[#b8862b]"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="h-14 border border-gray-200 px-5 outline-none focus:border-[#b8862b]"
                />

              </div>

              <input
                type="text"
                placeholder="Country"
                className="h-14 w-full border border-gray-200 px-5 outline-none focus:border-[#b8862b]"
              />

              <select className="h-14 w-full border border-gray-200 px-5 outline-none focus:border-[#b8862b]">

                <option>Business Type</option>
                <option>Retailer</option>
                <option>Wholesaler</option>
                <option>Importer</option>
                <option>Distributor</option>
                <option>Interior Designer</option>
                <option>Hotel</option>

              </select>

              <textarea
                rows="5"
                placeholder="Tell us about your requirements..."
                className="w-full border border-gray-200 p-5 outline-none focus:border-[#b8862b]"
              />

              <button
                type="submit"
                className="flex h-14 w-full items-center justify-center bg-[#1b3528] text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#b8862b]"
              >
                Request Catalogue
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}