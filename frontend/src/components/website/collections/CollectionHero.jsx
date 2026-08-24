import { Link } from "react-router-dom";

const CollectionHero = () => {
  return (
    <section className="bg-[#183425] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8 lg:py-12">

        {/* Breadcrumb */}

        <nav className="mb-4 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] text-white/65">
          <Link
            to="/"
            className="transition hover:text-[#B68C2F]"
          >
            Home
          </Link>

          <span>/</span>

          <span className="text-[#B68C2F]">
            Collections
          </span>
        </nav>

        {/* Heading */}

        <h1
          className="text-[38px] font-medium leading-[1.05] sm:text-[44px] lg:text-[50px]"
          style={{
            fontFamily: "Cormorant Garamond, serif",
          }}
        >
          Timeless Collections
        </h1>

        {/* Description */}

        <p className="mt-3 max-w-2xl text-[12px] leading-6 text-white/70">
          Discover handcrafted luxury pieces designed for premium interiors
          across hotels, villas, residences and commercial projects worldwide.
        </p>

      </div>
    </section>
  );
};

export default CollectionHero;