const ProductBadge = ({ product }) => {
  return (
    <div className="flex flex-wrap gap-3">

      {product.isNew && (
        <span className="rounded-full bg-[#183425] px-5 py-2 text-sm text-white">
          New
        </span>
      )}

      {product.isFeatured && (
        <span className="rounded-full bg-[#B68C2F] px-5 py-2 text-sm text-white">
          Featured
        </span>
      )}

      {product.isBestSeller && (
        <span className="rounded-full bg-black px-5 py-2 text-sm text-white">
          Bestseller
        </span>
      )}

    </div>
  );
};

export default ProductBadge;