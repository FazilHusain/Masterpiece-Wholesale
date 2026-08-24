import ProductPrice from "./ProductPrice";
import ProductVariantTable from "./ProductVariantTable";
import ProductActions from "./ProductActions";
import ProductBadge from "./ProductBadge";
import ShareProduct from "./ShareProduct";

const ProductInfo = ({ product }) => {
  return (
    <div className="flex flex-col">

      {/* Collection */}
      {product.collection?.name && (
        <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#B68C2F]">
          {product.collection.name}
        </p>
      )}

      {/* Title */}
      <h1 className="mt-3 max-w-2xl font-cormorant text-[42px] font-normal leading-[1.02] text-[#183425] sm:text-[48px] lg:text-[56px]">
        {product.name}
      </h1>

      {/* Badges + Share */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <ProductBadge product={product} />

        <div className="ml-1">
          <ShareProduct />
        </div>
      </div>

      {/* Description */}
      {product.shortDescription && (
        <p className="mt-6 max-w-xl text-[14px] leading-7 text-[#6B6259] sm:text-[15px]">
          {product.shortDescription}
        </p>
      )}

      {/* Price */}
      <div className="mt-7 border-t border-[#E8E2D8] pt-6">
        <ProductPrice product={product} />
      </div>

      {/* Variants */}
      {product.variants?.length > 0 && (
        <div className="mt-7">
          <ProductVariantTable variants={product.variants} />
        </div>
      )}

      {/* Key Information */}
      <div className="mt-7 border-y border-[#E8E2D8]">
        <Info title="Material" value={product.material} />
        <Info title="Pattern" value={product.pattern} />
        <Info title="Origin" value={product.countryOfOrigin} />
        <Info title="Lead Time" value={product.leadTime} />
      </div>

      {/* Actions */}
      <div className="mt-7">
        <ProductActions product={product} />
      </div>

      {/* Small reassurance */}
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.16em] text-[#8B8176]">
        <span>Premium Quality</span>
        <span>Export Ready</span>
        <span>Made in India</span>
      </div>

    </div>
  );
};

const Info = ({ title, value }) => {
  if (!value) return null;

  return (
    <div className="flex items-center justify-between gap-6 border-b border-[#EEEAE3] py-4 last:border-b-0">
      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#183425]">
        {title}
      </span>

      <span className="max-w-[65%] text-right text-[13px] leading-5 text-[#6B6259]">
        {value}
      </span>
    </div>
  );
};

export default ProductInfo;