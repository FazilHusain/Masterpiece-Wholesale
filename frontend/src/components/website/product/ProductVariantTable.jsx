const ProductVariantTable = ({ variants, selectedVariant, onSelect }) => {
  if (!variants?.length) return null;

  const activeVariants = variants.filter((item) => item.isActive !== false);

  if (!activeVariants.length) return null;

  return (
    <div>
      {/* Heading */}
      <div className="mb-4">
        <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#B68C2F]">
          Choose Your Size
        </p>

        <p className="mt-1 text-[11px] text-[#8B8176]">
          Select a size to view its price and minimum order quantity.
        </p>
      </div>

      {/* Variant Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {activeVariants.map((item) => {
          const isSelected = selectedVariant?._id === item._id;

          return (
            <button
              key={item._id}
              type="button"
              onClick={() => onSelect?.(item)}
              className={`group w-full border p-4 text-left transition-all duration-200 ${
                isSelected
                  ? "border-[#183425] bg-[#183425] shadow-sm"
                  : "border-[#E8E2D8] bg-white hover:border-[#183425] hover:bg-[#FAF8F4]"
              }`}
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${
                      isSelected ? "text-[#B68C2F]" : "text-[#8B8176]"
                    }`}
                  >
                    Size
                  </p>

                  <p
                    className={`mt-1 font-cormorant text-[24px] leading-none ${
                      isSelected ? "text-white" : "text-[#183425]"
                    }`}
                  >
                    {item.size || "-"}
                  </p>
                </div>

                {/* Selected Indicator */}
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? "border-[#B68C2F] bg-[#B68C2F]"
                      : "border-[#D8D0C5] bg-white"
                  }`}
                >
                  {isSelected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </span>
              </div>

              {/* Details */}
              <div
                className={`mt-4 border-t pt-3 ${
                  isSelected
                    ? "border-white/15"
                    : "border-[#EEEAE3]"
                }`}
              >
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p
                      className={`text-[9px] uppercase tracking-[0.14em] ${
                        isSelected ? "text-white/55" : "text-[#8B8176]"
                      }`}
                    >
                      Price
                    </p>

                    <p
                      className={`mt-1 text-[15px] font-semibold ${
                        isSelected ? "text-white" : "text-[#183425]"
                      }`}
                    >
                      ${Number(item.price || 0).toFixed(2)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-[9px] uppercase tracking-[0.14em] ${
                        isSelected ? "text-white/55" : "text-[#8B8176]"
                      }`}
                    >
                      MOQ
                    </p>

                    <p
                      className={`mt-1 text-[13px] ${
                        isSelected ? "text-white" : "text-[#6B6259]"
                      }`}
                    >
                      {item.moq || 1} pcs
                    </p>
                  </div>
                </div>

                {/* Dimensions */}
                {item.dimensions && (
                  <p
                    className={`mt-3 text-[10px] ${
                      isSelected ? "text-white/65" : "text-[#6B6259]"
                    }`}
                  >
                    {item.dimensions}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductVariantTable;