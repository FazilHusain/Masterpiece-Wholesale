import {
  X,
  ChevronLeft,
  ChevronRight,
  Video as VideoIcon,
} from "lucide-react";
import { useEffect } from "react";

const ProductImageModal = ({
  media = [],
  currentIndex,
  setCurrentIndex,
  onClose,
}) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) =>
          prev === media.length - 1 ? 0 : prev + 1,
        );
      }

      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) =>
          prev === 0 ? media.length - 1 : prev - 1,
        );
      }
    };

    window.addEventListener("keydown", handleKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [media.length, onClose, setCurrentIndex]);

  if (!media.length) return null;

  const goPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? media.length - 1 : prev - 1,
    );
  };

  const goNext = () => {
    setCurrentIndex((prev) =>
      prev === media.length - 1 ? 0 : prev + 1,
    );
  };

  const currentMedia = media[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label="Product media gallery"
      onClick={onClose}
    >
      {/* ==========================================
          CLOSE
      ========================================== */}

      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-[#183425] sm:right-6 sm:top-6"
      >
        <X size={20} />
      </button>

      {/* ==========================================
          PREVIOUS
      ========================================== */}

      {media.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrevious();
          }}
          aria-label="Previous media"
          className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-[#183425] sm:left-6"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* ==========================================
          NEXT
      ========================================== */}

      {media.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next media"
          className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-[#183425] sm:right-6"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* ==========================================
          MAIN MEDIA
      ========================================== */}

      <div
        className="flex h-full items-center justify-center px-14 py-16 sm:px-20 sm:py-16"
        onClick={(e) => e.stopPropagation()}
      >
        {currentMedia?.type === "video" ? (
          <div className="relative flex max-h-full max-w-5xl items-center justify-center">
            <video
              key={currentMedia.url}
              src={currentMedia.url}
              poster={currentMedia.thumbnail || undefined}
              controls
              autoPlay
              playsInline
              className="max-h-[85vh] max-w-full object-contain"
            >
              Your browser does not support the video tag.
            </video>

            <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 bg-black/65 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-white">
              <VideoIcon size={12} />
              Product Video
            </div>
          </div>
        ) : (
          <img
            src={currentMedia?.url}
            alt={`Product image ${currentIndex + 1}`}
            className="max-h-full max-w-full object-contain"
          />
        )}
      </div>

      {/* ==========================================
          COUNTER
      ========================================== */}

      {media.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/10 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.2em] text-white">
          {currentIndex + 1} / {media.length}
        </div>
      )}
    </div>
  );
};

export default ProductImageModal;