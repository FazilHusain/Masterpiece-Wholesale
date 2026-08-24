import { Share2 } from "lucide-react";

const ShareProduct = () => {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);

      alert("Product link copied.");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 text-[#183425]"
    >
      <Share2 size={18} />

      Share Product

    </button>
  );
};

export default ShareProduct;