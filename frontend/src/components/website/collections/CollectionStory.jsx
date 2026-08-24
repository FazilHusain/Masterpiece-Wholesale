const CollectionStory = ({ collection }) => {
  return (
    <section className="bg-[#FAF8F5] py-12 lg:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">

        {/* ================= CONTENT ================= */}

        <div>

          <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-[#B68C2F]">
            Our Story
          </p>

          <h2
            className="mt-2 text-[30px] leading-tight text-[#183425] sm:text-[34px]"
            style={{
              fontFamily: "Cormorant Garamond, serif",
            }}
          >
            {collection?.storyTitle}
          </h2>

          <p className="mt-4 whitespace-pre-line text-[12px] leading-6 text-[#66615A]">
            {collection?.storyDescription}
          </p>

        </div>

        {/* ================= IMAGE ================= */}

        <div className="overflow-hidden">

          <img
            src={collection?.featuredImage}
            alt={collection?.name}
            loading="lazy"
            className="h-[280px] w-full object-cover sm:h-[320px] lg:h-[360px]"
          />

        </div>

      </div>
    </section>
  );
};

export default CollectionStory;