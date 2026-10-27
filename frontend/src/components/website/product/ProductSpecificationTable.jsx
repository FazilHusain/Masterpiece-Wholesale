const ProductSpecificationTable = ({ product }) => {
  const specifications = [
    { label: "SKU", value: product?.sku },
    { label: "HS Code", value: product?.hsCode },
    { label: "Material", value: product?.material },
    { label: "Pattern", value: product?.pattern },
    { label: "Color Family", value: product?.colorFamily },
    { label: "Country of Origin", value: product?.countryOfOrigin },
    { label: "Lead Time", value: product?.leadTime },
    { label: "Care Instructions", value: product?.careInstructions },
  ].filter((item) => item.value);

  if (!specifications.length) return null;

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-18">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8">
          <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#B68C2F]">
            DETAILS
          </p>

          <h2 className="mt-3 font-cormorant text-[34px] font-normal leading-tight text-[#183425] sm:text-[38px] lg:text-[42px]">
            Product Specifications
          </h2>
        </div>

        {/* Specifications */}
        <div className="overflow-hidden border border-[#E8E2D6] bg-white">
          {specifications.map((item, index) => (
            <div
              key={item.label}
              className={`grid grid-cols-1 gap-2 px-5 py-4 sm:px-6 md:grid-cols-[200px_1fr] md:gap-6 ${
                index !== specifications.length - 1
                  ? "border-b border-[#ECE6DB]"
                  : ""
              }`}
            >
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8B7A5A]">
                {item.label}
              </div>

              <div className="whitespace-pre-line text-[13px] leading-6 text-[#183425]">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSpecificationTable;
