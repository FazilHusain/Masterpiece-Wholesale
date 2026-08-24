const ProductStory = ({ story }) => {
  if (!story?.length) return null;

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl space-y-20 px-6 lg:space-y-28 lg:px-8">

        {story.map((item, index) => (
          <div
            key={index}
            className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
              index % 2
                ? "lg:[&>*:first-child]:order-2"
                : ""
            }`}
          >

            {/* Image */}
            <div className="group overflow-hidden bg-[#F5F1E8]">
              <img
                src={item.image}
                alt={item.title || "Product story"}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.025]"
              />
            </div>

            {/* Content */}
            <div className="max-w-xl">
              <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-[#B68C2F]">
                THE STORY
              </p>

              <h2 className="mt-4 font-cormorant text-[38px] font-normal leading-[1.08] text-[#183425] sm:text-[44px]">
                {item.title}
              </h2>

              <div className="mt-5 h-px w-12 bg-[#B68C2F]" />

              <p className="mt-6 whitespace-pre-line text-[15px] leading-8 text-[#6B6259]">
                {item.description}
              </p>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
};

export default ProductStory;