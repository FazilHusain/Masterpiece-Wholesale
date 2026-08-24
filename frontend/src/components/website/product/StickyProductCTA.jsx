import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getTradeToken } from "../../../services/trade.service";

const StickyProductCTA = ({ product }) => {
  const navigate = useNavigate();

  if (!product) return null;

  const handleQuote = () => {
    navigate(`/contact?product=${product._id}`);
  };

  const handleSample = () => {
    if (!product?._id) {
      toast.error("Product not found.");
      return;
    }

    const token = getTradeToken();

    if (token) {
      navigate(`/trade/sample-order/${product.slug}`);
      return;
    }

    navigate(`/sample-request/${product.slug}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E8E2D8] bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-6xl gap-2">

        <button
          type="button"
          onClick={handleQuote}
          className="flex-1 bg-[#183425] py-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#B68C2F]"
        >
          Request Quote
        </button>

        <button
          type="button"
          onClick={handleSample}
          className="flex-1 border border-[#183425] bg-white py-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#183425] transition hover:bg-[#183425] hover:text-white"
        >
          Order Sample
        </button>

      </div>
    </div>
  );
};

export default StickyProductCTA;