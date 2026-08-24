export default function Newsletter() {
  return (
    <section className="bg-[#183425] py-14 sm:py-16 lg:py-18">
      <div className="mx-auto max-w-3xl px-6 text-center">

        {/* Label */}
        <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#B48A2C]">
          Newsletter
        </p>

        {/* Heading */}
        <h2 className="mt-3 font-cormorant text-[32px] leading-[1.1] text-white sm:text-[36px] lg:text-[42px]">
          Subscribe to the{" "}
          <span className="italic text-[#B48A2C]">
            Trade Newsletter
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-xl text-[14px] leading-7 text-[#D7DDD9]">
          Seasonal look books, new collections, wholesale offers and trade
          event invitations delivered directly to your inbox.
        </p>

        {/* Form */}
        <form className="mx-auto mt-7 flex w-full max-w-2xl flex-col gap-3 sm:flex-row">

          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className="h-12 w-full border border-white/15 bg-white/10 px-5 text-[14px] text-white placeholder:text-white/50 outline-none transition focus:border-[#B48A2C] focus:bg-white/[0.12]"
          />

          <button
            type="submit"
            className="h-12 shrink-0 bg-[#B48A2C] px-7 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#9B7523] sm:px-8"
          >
            Subscribe
          </button>

        </form>

      </div>
    </section>
  );
}