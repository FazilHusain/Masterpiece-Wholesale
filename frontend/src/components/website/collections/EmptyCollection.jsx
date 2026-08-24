const EmptyCollection = ({
  title = "No Products Found",
  description = "Products will appear here once they are added.",
  label = "Collection",
}) => {
  return (
    <section className="bg-[#FAF8F5] py-20 lg:py-24">
      <div className="mx-auto max-w-xl px-6 text-center">
        <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-[#B68C2F]">
          {label}
        </p>

        <h2
          className="mt-2 text-[30px] leading-tight text-[#183425] sm:text-[34px]"
          style={{
            fontFamily: "Cormorant Garamond, serif",
          }}
        >
          {title}
        </h2>

        <p className="mx-auto mt-3 max-w-md text-[12px] leading-6 text-[#6B6259]">
          {description}
        </p>
      </div>
    </section>
  );
};

export default EmptyCollection;