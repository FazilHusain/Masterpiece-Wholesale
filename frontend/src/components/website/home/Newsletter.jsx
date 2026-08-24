import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="bg-[#1f3529] py-20">
      <div className="mx-auto max-w-5xl px-5 text-center">

        <p className="text-[10px] uppercase tracking-[0.35em] text-[#d4b16a]">
          Stay Connected
        </p>

        <h2
          className="mt-4 text-[36px] leading-tight text-white lg:text-[48px]"
          style={{
            fontFamily: "Cormorant Garamond, serif",
          }}
        >
          Discover New Collections Before Everyone Else
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-8 text-white/75">
          Join our newsletter for product launches, design inspiration,
          wholesale updates and handcrafted collections delivered to your inbox.
        </p>

        {/* Form */}

        <form className="mx-auto mt-12 flex max-w-2xl flex-col gap-4 sm:flex-row">

          <input
            type="email"
            placeholder="Enter your email address"
            className="
              h-14
              flex-1
              border
              border-white/20
              bg-white/10
              px-6
              text-white
              placeholder:text-white/50
              outline-none
              transition
              focus:border-[#d4b16a]
            "
          />

          <button
            className="
              flex
              h-14
              items-center
              justify-center
              gap-2
              bg-[#d4b16a]
              px-8
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[#1f3529]
              transition
              hover:bg-[#e0bf82]
            "
          >
            Subscribe

            <ArrowRight size={16} />

          </button>

        </form>

      </div>
    </section>
  );
}