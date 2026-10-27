import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

const ProductActions = ({
  product,
  selectedVariant,
  quantity = 1,
  totalPrice = 0,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  /*
   * =========================================================
   * TRADE / PUBLIC CONTEXT
   * =========================================================
   *
   * We do NOT use the trade token here.
   *
   * A user may have a tradeToken stored in localStorage
   * while browsing the normal public website.
   *
   * Public product page:
   * /products/...
   *
   * Trade product page:
   * /trade/...
   *
   * Therefore route context decides the sample flow.
   */

  const isTradePage =
    location.pathname.startsWith("/trade/");

  /*
   * =========================================================
   * REQUEST QUOTE
   * =========================================================
   */

  const handleQuote = () => {
    if (!product?._id) {
      toast.error("Product not found.");
      return;
    }

    navigate(
      `/contact?product=${product._id}`,
    );
  };

  /*
   * =========================================================
   * ORDER SAMPLE
   * =========================================================
   */

  const handleSample = () => {
    /*
     * Product validation
     */

    if (!product?._id) {
      toast.error("Product not found.");
      return;
    }

    /*
     * Variant validation
     */

    if (!selectedVariant?._id) {
      toast.error(
        "Please select a size/variant.",
      );
      return;
    }

    /*
     * MOQ validation
     */

    const minimumQuantity =
      Math.max(
        Number(selectedVariant.moq) || 1,
        1,
      );

    const requestedQuantity =
      Number(quantity);

    if (
      !Number.isInteger(requestedQuantity) ||
      requestedQuantity < minimumQuantity
    ) {
      toast.error(
        `Minimum order quantity is ${minimumQuantity}.`,
      );
      return;
    }

    /*
     * =======================================================
     * SAMPLE STATE
     * =======================================================
     *
     * totalPrice is only for frontend display/reference.
     *
     * Backend MUST calculate the final amount again from
     * the selected variant stored in MongoDB.
     */

    const sampleState = {
      selectedVariantId:
        selectedVariant._id,

      quantity:
        requestedQuantity,

      totalPrice:
        Number(totalPrice) || 0,
    };

    /*
     * =======================================================
     * ROUTE DECISION
     * =======================================================
     *
     * IMPORTANT:
     *
     * We intentionally DO NOT check localStorage
     * tradeToken here.
     *
     * Public website:
     * /products/:slug
     *       ↓
     * /sample-request/:slug
     *
     * Trade portal:
     * /trade/...
     *       ↓
     * /trade/sample-order/:slug
     */

    if (isTradePage) {
      navigate(
        `/trade/sample-order/${product.slug}`,
        {
          state: sampleState,
        },
      );

      return;
    }

    /*
     * Public customer sample flow
     */

    navigate(
      `/sample-request/${product.slug}`,
      {
        state: sampleState,
      },
    );
  };

  /*
   * =========================================================
   * UI
   * =========================================================
   */

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {/* REQUEST QUOTE */}

      <button
        type="button"
        onClick={handleQuote}
        className="h-12 bg-[#183425] px-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#B68C2F]"
      >
        Request Quote
      </button>

      {/* ORDER SAMPLE */}

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