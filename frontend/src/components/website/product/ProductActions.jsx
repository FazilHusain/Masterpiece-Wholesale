import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getTradeToken } from "../../../services/trade.service";

const ProductActions = ({ product }) => {
  const navigate = useNavigate();

  const handleQuote = () => {
    navigate(`/contact?product=${product?._id}`);
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
    <div className="grid gap-3 sm:grid-cols-2">

      {/* Request Quote */}
      <button
        type="button"
        onClick={handleQuote}
        className="h-12 bg-[#183425] px-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#B68C2F]"
      >
        Request Quote
      </button>

      {/* Sample */}
      <button
        type="button"
        onClick={handleSample}
        className="h-12 border border-[#183425] bg-white px-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#183425] transition duration-300 hover:bg-[#183425] hover:text-white"
      >
        Order Sample
      </button>

    </div>
  );
};

export default ProductActions;