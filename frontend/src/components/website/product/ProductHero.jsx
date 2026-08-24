const ProductHero = () => {
  return (
    <section className="bg-[#183425]">
      <div className="mx-auto flex h-[250px] max-w-6xl items-center justify-center px-6 text-center sm:h-[270px] lg:h-[290px] lg:px-8">

        <div className="max-w-2xl">
          <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#B68C2F]">
            HIS MASTERPIECE
          </p>

          <h1 className="mt-3 font-cormorant text-[34px] font-normal leading-[1.05] text-white sm:text-[38px] lg:text-[44px]">
            Premium Home Textile Collection
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-[13px] leading-6 text-white/75 sm:text-[14px] sm:leading-7">
            Explore our curated range of towels, bathrobes, bedding, cushions,
            and luxury home textiles crafted for hospitality, retail, and
            global sourcing partners.
          </p>
        </div>

      </div>
    </section>
  );
};

export default ProductHero;