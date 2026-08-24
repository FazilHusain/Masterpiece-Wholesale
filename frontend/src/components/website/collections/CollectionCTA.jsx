const CollectionStory = ({ collection }) => {
  return (
    <section className="bg-white py-24">

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        <div>

          <p className="text-sm uppercase tracking-[5px] text-[#B68C2F]">

            Our Story

          </p>

          <h2 className="mt-4 font-cormorant text-5xl text-[#183425]">

            {collection?.storyTitle}

          </h2>

          <p className="mt-8 whitespace-pre-line leading-9 text-gray-600">

            {collection?.storyDescription}

          </p>

        </div>

        <div className="overflow-hidden rounded-3xl">

          <img
            src={collection?.featuredImage}
            alt={collection?.name}
            className="w-full object-cover"
          />

        </div>

      </div>

    </section>
  );
};

export default CollectionStory;