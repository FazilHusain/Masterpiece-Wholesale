export default function TradeHero() {
  return (
    <section className="bg-[#183425] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10 text-center lg:px-8 lg:py-12">

        {/* Label */}

        <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-[#B68C2F]">
          Trade Portal
        </p>

        {/* Heading */}

        <h1
          className="mt-3 text-[38px] font-medium leading-[1.05] sm:text-[44px] lg:text-[50px]"
          style={{
            fontFamily: "Cormorant Garamond, serif",
          }}
        >
          Trade{" "}
          <span className="italic font-normal text-[#B48A2C]">
            Login
          </span>
        </h1>

        {/* Description */}

        <p className="mx-auto mt-3 max-w-xl text-[12px] leading-6 text-white/65">
          Access exclusive wholesale pricing, pre-order windows, and trade
          resources.
        </p>

      </div>
    </section>
  );
}