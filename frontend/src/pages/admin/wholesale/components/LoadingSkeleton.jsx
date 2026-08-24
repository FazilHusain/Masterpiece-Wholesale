
export default function LoadingSkeleton() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="mb-5 h-12 animate-pulse rounded-lg bg-gray-100"
        />
      ))}

    </div>
  );
}