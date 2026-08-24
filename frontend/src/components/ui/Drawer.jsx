import { useEffect } from "react";
import { X } from "lucide-react";

export default function Drawer({
  open,
  title,
  width = "max-w-2xl",
  children,
  footer,
  onClose,
}) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999]">

      {/* Overlay */}

      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
      />

      {/* Drawer */}

      <div
        className={`absolute right-0 top-0 flex h-full w-full ${width} flex-col bg-white shadow-2xl`}
      >

        {/* Header */}

        <div className="flex items-center justify-between border-b border-[#ECE7DF] px-6 py-5">

          <div>

            <h2 className="text-2xl font-semibold text-[#12312B]">
              {title}
            </h2>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-[#F8F6F2]"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto p-6">

          {children}

        </div>

        {/* Footer */}

        {footer && (
          <div className="border-t border-[#ECE7DF] bg-white px-6 py-5">

            {footer}

          </div>
        )}

      </div>

    </div>
  );
}