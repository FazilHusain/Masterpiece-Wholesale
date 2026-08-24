const ProductDescription = ({ product }) => {
  if (!product?.description) return null;

  return (
    <section className="border-t border-[#E8E2D8] bg-[#FAF8F5] py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        <div className="text-center">
          <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-[#B68C2F]">
            PRODUCT DETAILS
          </p>

          <h2 className="mt-4 font-cormorant text-[38px] font-normal leading-tight text-[#183425] sm:text-[44px]">
            Product Overview
          </h2>

          <div className="mx-auto mt-5 h-px w-12 bg-[#B68C2F]" />
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="whitespace-pre-line text-[15px] leading-8 text-[#625B53]">
            {product.description}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductDescription;