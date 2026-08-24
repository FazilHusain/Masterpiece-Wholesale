const ProductPrice = ({ product }) => {
  const variant = product?.variants?.[0];

  if (!variant) return null;

  return (
    <div>
      <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#B68C2F]">
        Starting From
      </p>

      <h2 className="mt-2 font-cormorant text-[34px] font-semibold leading-none text-[#183425] sm:text-[38px]">
        ${variant.price}
      </h2>

      <p className="mt-2 text-[12px] uppercase tracking-[0.12em] text-[#6B6259]">
        MOQ: {variant.moq} Piece
      </p>
    </div>
  );
};

export default ProductPrice;