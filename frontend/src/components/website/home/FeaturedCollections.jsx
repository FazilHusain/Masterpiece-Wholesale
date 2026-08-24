import CollectionCard from "./CollectionCard";

const collections = [
  {
    id: 1,
    title: "Luxury Bedding",
    slug: "luxury-bedding",
    image: "/images/collections/bedding.jpg",
    description:
      "Premium bedsheets, duvet covers and comforters crafted for luxurious living.",
  },
  {
    id: 2,
    title: "Designer Cushions",
    slug: "designer-cushions",
    image: "/images/collections/cushions.jpg",
    description:
      "Elegant cushion covers and decorative accents for modern interiors.",
  },
  {
    id: 3,
    title: "Throws & Blankets",
    slug: "throws",
    image: "/images/collections/throws.jpg",
    description:
      "Soft textured throws and luxury blankets made from premium fabrics.",
  },
  {
    id: 4,
    title: "Table Linen",
    slug: "table-linen",
    image: "/images/collections/table-linen.jpg",
    description:
      "Luxury runners, placemats and table accessories for refined dining.",
  },
];

export default function FeaturedCollections() {
  return (
    <section className="bg-[#faf8f4] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <span className="text-xs uppercase tracking-[0.35em] text-[#b38b59]">
            Our Collections
          </span>

          <h2
            className="mt-4 text-5xl"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Crafted For Every Corner
            <br />
            Of Your Home
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-gray-600">
            Discover beautifully designed home textiles created with timeless
            craftsmanship, luxurious fabrics and unmatched attention to detail.
          </p>

        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((item) => (
            <CollectionCard
              key={item.id}
              collection={item}
            />
          ))}
        </div>

      </div>
    </section>
  );
}