import CategoryCard from "./CategoryCard";

const categories = [
  {
    id: 1,
    name: "Table Linen",
    slug: "table-linen",
    image: "/images/categories/category1.webp",
    description: "Elegant dining essentials",
  },
  {
    id: 2,
    name: "Cushions",
    slug: "cushions",
    image: "/images/categories/category2.webp",
    description: "Luxury decorative cushions",
  },
  {
    id: 3,
    name: "Throws",
    slug: "throws",
    image: "/images/categories/category3.webp",
    description: "Soft handcrafted throws",
  },
  {
    id: 4,
    name: "Bedding",
    slug: "bedding",
    image: "/images/categories/category4.webp",
    description: "Premium bedding collection",
  },
  {
    id: 5,
    name: "Kitchen Linen",
    slug: "kitchen-linen",
    image: "/images/categories/category5.webp",
    description: "Everyday luxury kitchen textiles",
  },
  {
    id: 6,
    name: "Decor",
    slug: "decor",
    image: "/images/categories/category6.webp",
    description: "Curated home accessories",
  },
];

export default function CategorySection() {
  return (
    <section className="bg-[#f7f5f0] py-20">
      <div className="mx-auto max-w-7xl px-5">
        {/* Heading */}

        <div className="mb-14 text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#b8862b]">
            Shop By Category
          </p>

          <h2
            className="mt-3 text-[34px] lg:text-[46px] text-[#1b1b1b]"
            style={{
              fontFamily: "Cormorant Garamond, serif",
            }}
          >
            Crafted Collections
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-gray-600">
            Explore handcrafted collections created for premium interiors,
            boutique hotels and luxury retailers.
          </p>
        </div>

        {/* Grid */}

        {/* Categories Grid */}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
