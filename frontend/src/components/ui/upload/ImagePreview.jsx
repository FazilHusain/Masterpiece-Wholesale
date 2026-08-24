import { useEffect, useMemo } from "react";

export default function ImagePreview({ files = [] }) {
  const normalizedFiles = Array.isArray(files)
    ? files
    : files
      ? [files]
      : [];

  const previews = useMemo(() => {
    return normalizedFiles
      .filter(Boolean)
      .map((file) => {
        // Existing Cloudinary URL
        if (typeof file === "string") {
          return {
            src: file,
            isObjectUrl: false,
          };
        }

        // Newly selected File
        if (file instanceof File) {
          return {
            src: URL.createObjectURL(file),
            isObjectUrl: true,
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [files]);

  useEffect(() => {
    return () => {
      previews.forEach((item) => {
        if (item.isObjectUrl) {
          URL.revokeObjectURL(item.src);
        }
      });
    };
  }, [previews]);

  if (!previews.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5">
      {previews.map((item, index) => (
        <div
          key={`${item.src}-${index}`}
          className="overflow-hidden rounded-2xl border border-[#E8E2D9] bg-white"
        >
          <img
            src={item.src}
            alt={`Preview ${index + 1}`}
            className="h-48 w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}