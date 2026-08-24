export default function Loader({
  text = "Loading...",
}) {
  return (
    <div className="flex items-center justify-center py-10">

      <div className="flex items-center gap-3">

        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#B68C2F] border-t-transparent" />

        <span className="text-sm text-gray-500">
          {text}
        </span>

      </div>

    </div>
  );
}