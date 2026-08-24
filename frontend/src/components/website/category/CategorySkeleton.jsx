const CategorySkeleton = () => {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

      {Array.from({ length: 6 }).map((_, index) => (

        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-3xl bg-white"
        >

          <div className="aspect-[4/3] bg-gray-200" />

          <div className="space-y-4 p-8">

            <div className="h-3 w-20 rounded bg-gray-200" />

            <div className="h-8 w-40 rounded bg-gray-200" />

            <div className="h-4 rounded bg-gray-200" />

            <div className="h-4 rounded bg-gray-200" />

            <div className="h-4 w-2/3 rounded bg-gray-200" />

            <div className="mt-6 h-4 w-28 rounded bg-gray-200" />

          </div>

        </div>

      ))}

    </div>
  );
};

export default CategorySkeleton;