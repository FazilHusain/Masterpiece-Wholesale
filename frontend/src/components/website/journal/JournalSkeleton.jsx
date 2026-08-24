export default function JournalSkeleton() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Featured Skeleton */}

        <div className="mb-16 overflow-hidden rounded-[28px] border border-[#ECE7DE]">

          <div className="grid lg:grid-cols-[1.25fr_1fr]">

            <div className="h-[360px] animate-pulse bg-[#F3F0EA]" />

            <div className="flex flex-col justify-center p-10">

              <div className="mb-5 h-3 w-28 animate-pulse rounded bg-[#F3F0EA]" />

              <div className="mb-4 h-10 w-4/5 animate-pulse rounded bg-[#F3F0EA]" />

              <div className="mb-3 h-4 w-full animate-pulse rounded bg-[#F3F0EA]" />
              <div className="mb-3 h-4 w-11/12 animate-pulse rounded bg-[#F3F0EA]" />
              <div className="h-4 w-8/12 animate-pulse rounded bg-[#F3F0EA]" />

              <div className="mt-8 h-10 w-40 animate-pulse rounded-full bg-[#F3F0EA]" />

            </div>

          </div>

        </div>

        {/* Grid */}

        <div className="grid gap-10 lg:grid-cols-[1.45fr_0.75fr]">

          <div className="grid gap-8 md:grid-cols-2">

            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[24px] border border-[#ECE7DE]"
              >
                <div className="h-64 animate-pulse bg-[#F3F0EA]" />

                <div className="p-6">

                  <div className="mb-5 h-3 w-20 animate-pulse rounded bg-[#F3F0EA]" />

                  <div className="mb-3 h-8 w-5/6 animate-pulse rounded bg-[#F3F0EA]" />

                  <div className="mb-3 h-4 w-full animate-pulse rounded bg-[#F3F0EA]" />
                  <div className="mb-3 h-4 w-11/12 animate-pulse rounded bg-[#F3F0EA]" />
                  <div className="h-4 w-8/12 animate-pulse rounded bg-[#F3F0EA]" />

                </div>

              </div>
            ))}

          </div>

          <div className="rounded-[28px] border border-[#ECE7DE] p-7">

            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`flex gap-4 ${
                  index !== 3 ? "mb-7 border-b border-[#ECE7DE] pb-7" : ""
                }`}
              >
                <div className="h-24 w-24 animate-pulse rounded-2xl bg-[#F3F0EA]" />

                <div className="flex-1">

                  <div className="mb-3 h-3 w-20 animate-pulse rounded bg-[#F3F0EA]" />

                  <div className="mb-3 h-5 w-full animate-pulse rounded bg-[#F3F0EA]" />

                  <div className="h-5 w-4/5 animate-pulse rounded bg-[#F3F0EA]" />

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}