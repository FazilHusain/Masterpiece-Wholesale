import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function EmptyJournal() {
  return (
    <section className="py-24">

      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">

        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#ECE7DE] bg-[#FAF8F5]">

          <BookOpen
            size={34}
            className="text-[#B68C2F]"
          />

        </div>

        <h2 className="mt-8 font-cormorant text-5xl font-semibold text-[#183425]">
          Stories Coming Soon
        </h2>

        <p className="mt-5 max-w-lg text-[15px] leading-8 text-[#666]">
          Our journal is being carefully curated with stories of
          craftsmanship, timeless interiors and the inspiration behind
          every His Masterpiece collection.
        </p>

        <Link
          to="/collections"
          className="mt-10 rounded-full border border-[#183425] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#183425] transition hover:bg-[#183425] hover:text-white"
        >
          Explore Collections
        </Link>

      </div>

    </section>
  );
}