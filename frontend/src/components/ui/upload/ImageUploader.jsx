import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";

import ImagePreview from "./ImagePreview";

export default function ImageUploader({
  label = "Upload Image",

  files = [],

  setFiles,

  onChange,

  multiple = true,

  maxFiles = multiple ? 10 : 1,

  accept = "image/*",
}) {
  const inputRef = useRef(null);

  const [dragging, setDragging] = useState(false);

  const updateFiles = (value) => {
    if (typeof onChange === "function") {
      onChange(value);

      return;
    }

    if (typeof setFiles === "function") {
      setFiles(value);
    }
  };

  const handleFiles = (selectedFiles) => {
    if (!selectedFiles) return;

    const images = Array.from(selectedFiles);

    if (!images.length) return;

    if (onChange) {
      updateFiles(
        multiple
          ? images.slice(0, maxFiles)
          : [images[0]]
      );

      return;
    }

    updateFiles((prev = []) => {
      if (!multiple) {
        return [images[0]];
      }

      return [...prev, ...images].slice(0, maxFiles);
    });
  };

  const onInputChange = (e) => {
    handleFiles(e.target.files);
  };

  const onDrop = (e) => {
    e.preventDefault();

    setDragging(false);

    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-4">
      {label && (
        <label className="block text-sm font-medium text-[#12312B]">
          {label}
        </label>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`group cursor-pointer rounded-3xl border-2 border-dashed p-10 transition-all duration-300 ${
          dragging
            ? "border-[#B68C2F] bg-[#FFF8EA]"
            : "border-[#E5DED2] bg-[#FCFBF8] hover:border-[#B68C2F]"
        }`}
      >
        <input
          ref={inputRef}
          hidden
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={onInputChange}
        />

        <div className="flex flex-col items-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF5DE]">
            <ImagePlus
              size={38}
              className="text-[#B68C2F]"
            />
          </div>

          <h3 className="mt-6 text-2xl font-semibold text-[#12312B]">
            Drag & Drop Images
          </h3>

          <p className="mt-2 text-gray-500">
            or click anywhere to browse
          </p>

          <button
            type="button"
            className="mt-7 rounded-xl bg-[#12312B] px-8 py-3 text-white hover:bg-[#0F2822]"
          >
            Browse Files
          </button>

          <p className="mt-5 text-sm text-gray-400">
            PNG • JPG • JPEG • WEBP
          </p>

        </div>
      </div>

      {files?.length > 0 && (
        <ImagePreview
          files={files}
          setFiles={setFiles}
        />
      )}
    </div>
  );
}