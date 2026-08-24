import ProductCard from "./ProductCard";

const RelatedProducts = ({ products }) => {
  if (!products?.length) return null;

  return (
    <section className="border-t border-[#E8E2D8] bg-[#FAF8F5] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        <div className="mb-10">
          <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-[#B68C2F]">
            YOU MAY ALSO LIKE
          </p>

          <h2 className="mt-4 font-cormorant text-[38px] font-normal text-[#183425] sm:text-[44px]">
            Related Products
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default RelatedProducts;