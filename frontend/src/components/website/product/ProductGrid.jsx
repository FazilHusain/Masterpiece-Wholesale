import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductGrid({
  products = [],
  loading = false,
  emptyMessage = "No products found.",
  isSampleMode = false,
}) {
  // Loading State
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Empty State
  if (!products.length) {
    return (
      <div className="flex min-h-[220px] items-center justify-center border border-dashed border-[#D8D2C8] bg-[#FAF8F5]">
        <p className="px-6 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
          {emptyMessage}
        </p>
      </div>
    );
  }

  // Product List
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          isSampleMode={isSampleMode}
        />
      ))}
    </div>
  );
}