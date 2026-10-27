import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Play,
  Video as VideoIcon,
} from "lucide-react";
import ProductImageModal from "./ProductImageModal";

const FALLBACK_IMAGE = "/images/no-image.webp";

const ProductGallery = ({ product }) => {
  // ==========================================
  // MEDIA
  // ==========================================

  const imageMedia = [
    product?.featuredImage
      ? {
          type: "image",
          url:
            typeof product.featuredImage === "string"
              ? product.featuredImage
              : product.featuredImage?.url,
        }
      : null,

    ...(Array.isArray(product?.gallery)
      ? product.gallery.map((item) => ({
          type: "image",
          url: typeof item === "string" ? item : item?.url,
        }))
      : []),
  ].filter((item) => item?.url);

  const videoMedia = Array.isArray(product?.videos)
    ? product.videos
        .map((video) => ({
          type: "video",
          url: video?.url,
          thumbnail: video?.thumbnail,
          title: video?.title || `${product?.name || "Product"} Video`,
        }))
        .filter((video) => video.url)
    : [];

  const media = [...imageMedia, ...videoMedia];

  const galleryMedia = media.length
    ? media
    : [
        {
          type: "image",
          url: FALLBACK_IMAGE,
        },
      ];

  // ==========================================
  // STATE
  // ==========================================

  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const currentMedia = galleryMedia[currentIndex];

  // ==========================================
  // NAVIGATION
  // ==========================================

  const previousMedia = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? galleryMedia.length - 1 : prev - 1,
    );
  };

  const nextMedia = () => {
    setCurrentIndex((prev) =>
      prev === galleryMedia.length - 1 ? 0 : prev + 1,
    );
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* ==========================================
            THUMBNAILS
        ========================================== */}

        <div className="order-2 flex gap-2 overflow-x-auto lg:order-1 lg:w-[76px] lg:flex-col">
          {galleryMedia.map((item, index) => (
            <button
              key={`${item.type}-${item.url}-${index}`}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`group relative shrink-0 overflow-hidden border bg-[#F8F5EF] transition ${
                currentIndex === index
                  ? "border-[#B68C2F]"
                  : "border-[#E7E0D5] hover:border-[#B68C2F]"
              }`}
            >
              {item.type === "video" ? (
                <>
                  <img
                    src={item.thumbnail || FALLBACK_IMAGE}
                    alt={item.title}
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                    className="h-[68px] w-[68px] object-cover transition duration-500 group-hover:scale-105 sm:h-[74px] sm:w-[74px]"
                  />

                  {/* VIDEO OVERLAY */}
                  <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[#183425] shadow">
                      <Play size={12} fill="currentColor" />
                    </span>
                  </span>

                  <span className="absolute bottom-1 left-1 flex items-center gap-1 bg-black/65 px-1.5 py-1 text-[8px] font-semibold uppercase tracking-wider text-white">
                    <VideoIcon size={9} />
                    Video
                  </span>
                </>
              ) : (
                <img
                  src={item.url}
                  alt={`${product?.name || "Product"} ${index + 1}`}
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                  className="h-[68px] w-[68px] object-cover transition duration-500 group-hover:scale-105 sm:h-[74px] sm:w-[74px]"
                />
              )}
            </button>
          ))}
        </div>

        {/* ==========================================
            MAIN MEDIA
        ========================================== */}

        <div className="order-1 min-w-0 flex-1 lg:order-2">
          <div className="group relative overflow-hidden bg-[#F5F1E8]">
            {currentMedia?.type === "video" ? (
              <div className="relative flex aspect-[4/5] w-full items-center justify-center bg-black">
                <video
                  key={currentMedia.url}
                  src={currentMedia.url}
                  poster={currentMedia.thumbnail || undefined}
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>

                {/* VIDEO LABEL */}
                <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 bg-black/65 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-white">
                  <VideoIcon size={12} />
                  Product Video
                </div>
              </div>
            ) : (
              <>
                <img
                  src={currentMedia?.url || FALLBACK_IMAGE}
                  alt={product?.name || "Product"}
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                  className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                />

                {/* Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </>
            )}

            {/* ==========================================
                ZOOM / FULLSCREEN
            ========================================== */}

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={
                currentMedia?.type === "video"
                  ? "Open product video"
                  : "Open product image"
              }
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/90 text-[#183425] shadow-sm backdrop-blur transition hover:bg-[#183425] hover:text-white"
            >
              <Maximize2 size={17} />
            </button>

            {/* ==========================================
                NAVIGATION
            ========================================== */}

            {galleryMedia.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={previousMedia}
                  aria-label="Previous media"
                  className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#183425] opacity-0 shadow transition group-hover:opacity-100"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={nextMedia}
                  aria-label="Next media"
                  className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#183425] opacity-0 shadow transition group-hover:opacity-100"
                >
                  <ChevronRight size={18} />
                </button>

                <div className="absolute bottom-4 left-4 bg-[#183425]/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white">
                  {String(currentIndex + 1).padStart(2, "0")} /{" "}
                  {String(galleryMedia.length).padStart(2, "0")}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ==========================================
          FULLSCREEN MODAL
      ========================================== */}

      {open && (
        <ProductImageModal
          media={galleryMedia}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default ProductGallery;