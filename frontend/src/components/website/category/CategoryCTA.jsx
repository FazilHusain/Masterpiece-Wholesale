import { Link } from "react-router-dom";

const CategoryCTA = () => {
  return (
    <section className="bg-[#183425] py-14 sm:py-16 lg:py-18">
      <div className="mx-auto max-w-3xl px-6 text-center">

        {/* Label */}
        <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-[#B68C2F]">
          Wholesale
        </p>

        {/* Heading */}
        <h2 className="mt-3 font-cormorant text-[32px] leading-[1.1] text-white sm:text-[36px] lg:text-[42px]">
          Looking For Bulk Orders?
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-7 text-white/70">
          Partner with His Masterpiece for premium hospitality and luxury
          retail collections tailored to your business.
        </p>

        {/* CTA */}
        <Link
          to="/wholesale"
          className="mt-7 inline-flex border border-[#B68C2F] bg-[#B68C2F] px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-transparent hover:text-[#B68C2F]"
        >
          Become A Wholesale Partner
        </Link>

      </div>
    </section>
  );
};

export default CategoryCTA;