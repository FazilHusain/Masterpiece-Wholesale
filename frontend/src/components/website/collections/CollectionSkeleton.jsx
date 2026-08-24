const CollectionSkeleton = () => {
  return (
    <div className="animate-pulse">

      {/* ================= HERO ================= */}

      <section className="bg-[#183425]">
        <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8 lg:py-12">

          <div className="mb-4 h-3 w-40 rounded bg-white/10" />

          <div className="h-10 w-2/5 rounded bg-white/10 sm:h-12" />

          <div className="mt-4 h-3 w-1/2 rounded bg-white/10" />

          <div className="mt-2 h-3 w-2/5 rounded bg-white/10" />

        </div>
      </section>

      {/* ================= STORY ================= */}

      <section className="bg-[#FAF8F5] py-12 lg:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">

          <div>

            <div className="h-3 w-24 rounded bg-[#E5DED3]" />

            <div className="mt-3 h-8 w-64 rounded bg-[#E5DED3]" />

            <div className="mt-5 space-y-3">
              <div className="h-3 w-full rounded bg-[#E5DED3]" />
              <div className="h-3 w-full rounded bg-[#E5DED3]" />
              <div className="h-3 w-5/6 rounded bg-[#E5DED3]" />
              <div className="h-3 w-4/6 rounded bg-[#E5DED3]" />
            </div>

          </div>

          <div className="h-[280px] w-full rounded-sm bg-[#E5DED3] sm:h-[320px] lg:h-[360px]" />

        </div>
      </section>

      {/* ================= CATEGORIES ================= */}

      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="mb-8">

            <div className="h-3 w-24 rounded bg-[#E5DED3]" />

            <div className="mt-3 h-8 w-48 rounded bg-[#E5DED3]" />

          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden border border-[#E8E2D9] bg-[#FAF8F5]"
              >

                <div className="aspect-[4/3] bg-[#E5DED3]" />

                <div className="p-5">

                  <div className="h-6 w-32 rounded bg-[#E5DED3]" />

                  <div className="mt-3 space-y-2">
                    <div className="h-3 w-full rounded bg-[#E5DED3]" />
                    <div className="h-3 w-5/6 rounded bg-[#E5DED3]" />
                  </div>

                  <div className="mt-4 h-3 w-16 rounded bg-[#E5DED3]" />

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= PRODUCTS ================= */}

      <section className="bg-[#FAF8F5] py-12 lg:py-14">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="mb-8">

            <div className="h-3 w-28 rounded bg-[#E5DED3]" />

            <div className="mt-3 h-8 w-56 rounded bg-[#E5DED3]" />

          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 xl:grid-cols-4">

            {[1, 2, 3, 4].map((item) => (
              <div key={item}>

                <div className="aspect-[4/5] bg-[#E5DED3]" />

                <div className="mt-4 h-3 w-20 rounded bg-[#E5DED3]" />

                <div className="mt-2 h-6 w-36 rounded bg-[#E5DED3]" />

                <div className="mt-2 h-3 w-24 rounded bg-[#E5DED3]" />

              </div>
            ))}

          </div>

        </div>
      </section>

    </div>
  );
};

export default CollectionSkeleton;