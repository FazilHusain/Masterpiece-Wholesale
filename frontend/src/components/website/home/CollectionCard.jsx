import { Link } from "react-router-dom";

export default function CollectionCard({ collection }) {
  return (
    <Link
      to={`/collections/${collection.slug}`}
      className="group relative overflow-hidden rounded-3xl"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={collection.image}
          alt={collection.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 w-full p-8 text-white">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#d4af37]">
          Collection
        </p>

        <h3
          className="text-3xl font-semibold"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          {collection.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm text-gray-200">
          {collection.description}
        </p>

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-[#d4af37]">
          Explore Collection →
        </span>
      </div>
    </Link>
  );
}