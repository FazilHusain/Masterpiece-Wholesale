const CategoryStory = ({ category }) => {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-18">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">

        {/* Heading */}
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#B68C2F]">
            CATEGORY
          </p>

          <h2 className="mt-3 font-cormorant text-[34px] font-normal leading-[1.08] text-[#183425] sm:text-[38px] lg:text-[42px]">
            Crafted With Excellence
          </h2>
        </div>

        {/* Description */}
        <div>
          <p className="text-[14px] leading-7 text-[#6B6259]">
            {category?.description}
          </p>
        </div>

      </div>
    </section>
  );
};

export default CategoryStory;