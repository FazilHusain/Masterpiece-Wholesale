import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import ProductImageModal from "./ProductImageModal";

const FALLBACK_IMAGE = "/images/no-image.webp";

const ProductGallery = ({ product }) => {
  const images = [
    product?.featuredImage,
    ...(product?.gallery || []).map((item) =>
      typeof item === "string" ? item : item?.url
    ),
  ].filter(Boolean);

  const galleryImages = images.length ? images : [FALLBACK_IMAGE];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const previousImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row">

        {/* THUMBNAILS */}
        <div className="order-2 flex gap-2 overflow-x-auto lg:order-1 lg:w-[76px] lg:flex-col">
          {galleryImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`group shrink-0 overflow-hidden border bg-[#F8F5EF] transition ${
                currentIndex === index
                  ? "border-[#B68C2F]"
                  : "border-[#E7E0D5] hover:border-[#B68C2F]"
              }`}
            >
              <img
                src={image}
                alt={`${product?.name || "Product"} ${index + 1}`}
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
                className="h-[68px] w-[68px] object-cover transition duration-500 group-hover:scale-105 sm:h-[74px] sm:w-[74px]"
              />
            </button>
          ))}
        </div>

        {/* MAIN IMAGE */}
        <div className="order-1 min-w-0 flex-1 lg:order-2">
          <div className="group relative overflow-hidden bg-[#F5F1E8]">

            <img
              src={galleryImages[currentIndex]}
              alt={product?.name || "Product"}
              onError={(e) => {
                e.currentTarget.src = FALLBACK_IMAGE;
              }}
              className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.025]"
            />

            {/* Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

            {/* Zoom */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open product image"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/90 text-[#183425] shadow-sm backdrop-blur transition hover:bg-[#183425] hover:text-white"
            >
              <Maximize2 size={17} />
            </button>

            {/* Navigation */}
            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={previousImage}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#183425] opacity-0 shadow transition group-hover:opacity-100"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#183425] opacity-0 shadow transition group-hover:opacity-100"
                >
                  <ChevronRight size={18} />
                </button>

                <div className="absolute bottom-4 left-4 bg-[#183425]/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white">
                  {String(currentIndex + 1).padStart(2, "0")} /{" "}
                  {String(galleryImages.length).padStart(2, "0")}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {open && (
        <ProductImageModal
          images={galleryImages}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default ProductGallery;