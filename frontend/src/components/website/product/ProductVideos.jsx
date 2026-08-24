const ProductVideos = ({ videos }) => {
  if (!videos?.length) return null;

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-18">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-8 text-center">
          <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#B68C2F]">
            WATCH & DISCOVER
          </p>

          <h2 className="mt-3 font-cormorant text-[34px] font-normal leading-tight text-[#183425] sm:text-[38px] lg:text-[42px]">
            Videos
          </h2>
        </div>

        {/* Videos */}
        <div className="grid gap-6 lg:grid-cols-2">
          {videos.map((video) => (
            <div
              key={video._id}
              className="overflow-hidden bg-[#F5F1E8]"
            >
              <iframe
                src={video.url}
                title={video.title}
                className="aspect-video w-full"
                loading="lazy"
                allowFullScreen
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductVideos;