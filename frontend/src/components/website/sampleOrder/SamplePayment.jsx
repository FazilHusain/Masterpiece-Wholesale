import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  LockKeyhole,
  Mail,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { createWebsiteSamplePayment } from "../../../redux/websiteSampleOrder/websiteSampleOrderThunk";

export default function SamplePayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [paymentLoading, setPaymentLoading] = useState(false);

  /*
   * =========================================================
   * PAYMENT / ORDER DATA
   * =========================================================
   *
   * SampleRequestSection passes both:
   *
   * paymentData
   * order
   *
   * through React Router state.
   */

  const paymentData = location.state?.paymentData;
  const order = location.state?.order;

  /*
   * API response can either be:
   *
   * {
   *   data: {...}
   * }
   *
   * or directly:
   *
   * {...}
   */

  const payment = paymentData?.data || paymentData;

  /*
   * =========================================================
   * BASIC ORDER INFORMATION
   * =========================================================
   */

  const amount = Number(payment?.amount || 0);

  const currency =
    payment?.currency ||
    order?.currency ||
    "USD";

  const quantity =
    Number(order?.quantity) || 1;

  const product = order?.product;

  const productName =
    product?.name ||
    order?.productName ||
    "Sample Product";

  /*
   * Product image can come in multiple forms depending
   * on how the order was populated.
   */

  const productImage =
    product?.featuredImage ||
    product?.image ||
    order?.featuredImage ||
    "";

  const orderNumber =
    payment?.orderNumber ||
    order?.orderNumber ||
    "—";

  /*
   * Variant information
   */

  const variant = order?.variant;

  const variantSize =
    variant?.size ||
    order?.variantSize ||
    "";

  const variantDimensions =
    variant?.dimensions ||
    order?.variantDimensions ||
    "";

  const variantColor =
    variant?.color ||
    order?.variantColor ||
    "";

  /*
   * Shipping / tax
   *
   * Current backend may return these as 0.
   * We keep the UI ready for future values.
   */

  const shipping = Number(
    order?.shippingCost ??
      order?.shippingAmount ??
      0,
  );

  const tax = Number(
    order?.tax ??
      order?.taxAmount ??
      0,
  );

  /*
   * =========================================================
   * FINAL TOTAL
   * =========================================================
   *
   * IMPORTANT:
   *
   * We do NOT calculate the payable amount from frontend
   * product price here.
   *
   * Backend payment initialization gives us the final
   * amount and that amount is treated as authoritative.
   */

  const total = useMemo(() => {
    return amount;
  }, [amount]);

  /*
   * Subtotal is only a display value.
   *
   * Final payment amount remains `total`.
   */

  const subtotal = useMemo(() => {
    return Math.max(
      total - shipping - tax,
      0,
    );
  }, [total, shipping, tax]);

  /*
   * Unit price is derived from the final backend amount
   * for display purposes.
   */

  const unitPrice = useMemo(() => {
    if (!quantity || quantity <= 0) {
      return total;
    }

    return total / quantity;
  }, [total, quantity]);

  /*
   * =========================================================
   * MONEY FORMATTER
   * =========================================================
   */

  const formatMoney = (value) => {
    const numericValue = Number(value || 0);

    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
      }).format(numericValue);
    } catch {
      return `${currency} ${numericValue.toFixed(2)}`;
    }
  };

  /*
   * =========================================================
   * PAYMENT HANDLER
   * =========================================================
   */

  const handlePayment = async () => {
    const orderId =
      payment?.orderId ||
      order?._id ||
      order?.id;

    /*
     * Basic validation
     */

    if (!orderId) {
      toast.error(
        "Sample order not found. Please create the sample request again.",
      );

      return;
    }

    if (!total || total <= 0) {
      toast.error(
        "Invalid payment amount. Please create the sample request again.",
      );

      return;
    }

    /*
     * Prevent duplicate clicks
     */

    if (paymentLoading) {
      return;
    }

    try {
      setPaymentLoading(true);

      /*
       * Call backend.
       *
       * Backend will:
       *
       * 1. Find the SampleOrder
       * 2. Verify its amount
       * 3. Initialize PayGlocal
       * 4. Return checkoutUrl once gateway is configured
       */

      const response = await dispatch(
        createWebsiteSamplePayment(orderId),
      ).unwrap();

      const paymentResult =
        response?.data ||
        response ||
        {};

      /*
       * =====================================================
       * REAL CHECKOUT URL
       * =====================================================
       *
       * When PayGlocal is connected, backend will return
       * checkoutUrl.
       *
       * We then redirect the user to the secure gateway.
       */

      const checkoutUrl =
        paymentResult?.checkoutUrl ||
        paymentResult?.paymentUrl ||
        paymentResult?.redirectUrl ||
        null;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
        return;
      }

      /*
       * =====================================================
       * GATEWAY NOT CONFIGURED
       * =====================================================
       *
       * At the moment credentials are not available.
       *
       * Therefore we never pretend payment was successful.
       */

      toast.error(
        paymentResult?.message ||
          "Payment gateway is not configured yet. Please try again later.",
      );
    } catch (error) {
      console.error(
        "Sample payment initialization failed:",
        error,
      );

      let errorMessage =
        "Unable to initialize payment. Please try again.";

      /*
       * Redux / API errors can have different structures.
       */

      if (typeof error === "string") {
        errorMessage = error;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.response?.data?.message) {
        errorMessage =
          error.response.data.message;
      }

      toast.error(errorMessage);
    } finally {
      setPaymentLoading(false);
    }
  };

  /*
   * =========================================================
   * PAYMENT SESSION VALIDATION
   * =========================================================
   */

  if (!paymentData || !order) {
    return (
      <section className="min-h-[70vh] bg-[#FAF8F4] px-5 py-20">
        <div className="mx-auto max-w-xl rounded-3xl border border-[#E6DED3] bg-white p-10 text-center shadow-sm">
          <Package
            size={42}
            className="mx-auto text-[#B68C2F]"
          />

          <h1
            className="mt-5 text-3xl text-[#12312B]"
            style={{
              fontFamily:
                "Cormorant Garamond, serif",
            }}
          >
            Payment Session Not Found
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Please create a sample request first.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-flex items-center rounded-full bg-[#12312B] px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#0D2822]"
          >
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#FAF8F4] py-8 md:py-12">
      <div className="mx-auto max-w-[1250px] px-4 md:px-6">

        {/* =================================================
            PROGRESS
        ================================================= */}

        <div className="mb-8 overflow-hidden rounded-2xl border border-[#E5DED4] bg-white p-4 md:p-5">
          <div className="flex items-center justify-between">

            {/* STEP 1 */}

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1C8B52] text-white">
                <Check size={16} />
              </div>

              <span className="hidden text-sm font-medium text-[#12312B] sm:block">
                Product Selected
              </span>
            </div>

            <div className="mx-3 h-px flex-1 bg-[#D9D2C8]" />

            {/* STEP 2 */}

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1C8B52] text-white">
                <Check size={16} />
              </div>

              <span className="hidden text-sm font-medium text-[#12312B] sm:block">
                Sample Request
              </span>
            </div>

            <div className="mx-3 h-px flex-1 bg-[#D9D2C8]" />

            {/* STEP 3 */}

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#12312B] text-white">
                3
              </div>

              <span className="hidden text-sm font-semibold text-[#12312B] sm:block">
                Review & Pay
              </span>
            </div>

            <div className="mx-3 h-px flex-1 bg-[#D9D2C8]" />

            {/* STEP 4 */}

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7E3DD] text-gray-500">
                4
              </div>

              <span className="hidden text-sm text-gray-500 sm:block">
                Confirmation
              </span>
            </div>
          </div>
        </div>

        {/* =================================================
            ORDER CREATED NOTICE
        ================================================= */}

        <div className="mb-8 rounded-2xl border border-[#B9DEC8] bg-[#F0FBF4] p-5 md:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1C8B52] text-white">
                <Check size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#12312B]">
                  Sample Request Created Successfully
                </h2>

                <p className="mt-1 text-sm leading-6 text-[#567066]">
                  Your sample order has been created.
                  Payment is required to proceed with
                  processing and dispatch.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#B9DEC8] bg-white px-5 py-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">
                Order Number
              </p>

              <p className="mt-1 font-semibold text-[#12312B]">
                {orderNumber}
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="grid gap-7 lg:grid-cols-[1fr_400px]">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-7">

            {/* =================================================
                PRODUCT + SHIPPING
            ================================================= */}

            <div className="rounded-3xl border border-[#E5DED4] bg-white p-6 md:p-7">

              <div className="flex items-center gap-3">
                <Package
                  size={21}
                  className="text-[#B68C2F]"
                />

                <h2 className="text-xl font-semibold text-[#12312B]">
                  Sample Order Details
                </h2>
              </div>

              <div className="mt-6 grid gap-7 md:grid-cols-2">

                {/* PRODUCT */}

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B68C2F]">
                    Product
                  </p>

                  <div className="mt-4 flex gap-4">

                    <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-[#F3F0EA]">
                      {productImage ? (
                        <img
                          src={productImage}
                          alt={productName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Package className="text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3
                        className="text-2xl leading-tight text-[#12312B]"
                        style={{
                          fontFamily:
                            "Cormorant Garamond, serif",
                        }}
                      >
                        {productName}
                      </h3>

                      <p className="mt-2 text-sm text-gray-500">
                        Sample quantity:{" "}
                        <span className="font-medium text-[#12312B]">
                          {quantity}
                        </span>
                      </p>

                      {variantSize && (
                        <p className="mt-1 text-sm text-gray-500">
                          Size:{" "}
                          <span className="font-medium text-[#12312B]">
                            {variantSize}
                          </span>
                        </p>
                      )}

                      {variantDimensions && (
                        <p className="mt-1 text-sm text-gray-500">
                          Dimensions:{" "}
                          <span className="font-medium text-[#12312B]">
                            {variantDimensions}
                          </span>
                        </p>
                      )}

                      {variantColor && (
                        <p className="mt-1 text-sm text-gray-500">
                          Color:{" "}
                          <span className="font-medium text-[#12312B]">
                            {variantColor}
                          </span>
                        </p>
                      )}

                      <span className="mt-3 inline-flex rounded-full bg-[#F7EBDD] px-3 py-1 text-xs font-medium text-[#9A6B24]">
                        Sample Order
                      </span>
                    </div>
                  </div>
                </div>

                {/* SHIPPING */}

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B68C2F]">
                    Shipping Information
                  </p>

                  <div className="mt-4 space-y-3">

                    {order?.shippingAddress && (
                      <div className="flex gap-3">
                        <MapPin
                          size={18}
                          className="mt-0.5 shrink-0 text-[#B68C2F]"
                        />

                        <p className="text-sm leading-6 text-gray-600">
                          {order.shippingAddress}

                          {order.city
                            ? `, ${order.city}`
                            : ""}

                          {order.state
                            ? `, ${order.state}`
                            : ""}

                          {order.postalCode
                            ? ` - ${order.postalCode}`
                            : ""}

                          {order.country
                            ? `, ${order.country}`
                            : ""}
                        </p>
                      </div>
                    )}

                    {order?.email && (
                      <div className="flex gap-3">
                        <Mail
                          size={17}
                          className="mt-0.5 shrink-0 text-[#B68C2F]"
                        />

                        <span className="break-all text-sm text-gray-600">
                          {order.email}
                        </span>
                      </div>
                    )}

                    {order?.phone && (
                      <div className="flex gap-3">
                        <Phone
                          size={17}
                          className="mt-0.5 shrink-0 text-[#B68C2F]"
                        />

                        <span className="text-sm text-gray-600">
                          {order.phone}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                WHY PAYMENT
            ================================================= */}

            <div className="rounded-3xl border border-[#E5DED4] bg-white p-6 md:p-7">

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FBF2DC] text-[#B68C2F]">
                  ₹
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-[#12312B]">
                    Why is payment required?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Samples involve product preparation,
                    packaging, quality checking and shipping.
                    The applicable sample amount is shown
                    clearly before you continue.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Sample preparation",
                  "Packaging & handling",
                  "Shipping & logistics",
                  "Quality checking",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-[#FAF8F4] px-4 py-3"
                  >
                    <Check
                      size={17}
                      className="text-[#1C8B52]"
                    />

                    <span className="text-sm text-gray-600">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-[#EAD8A9] bg-[#FFFBF0] p-4">
                <p className="text-sm leading-6 text-[#75633A]">
                  <strong>
                    Transparent pricing:
                  </strong>{" "}
                  You will only be charged the final
                  amount shown in the Order Summary.
                  No additional payment will be taken
                  without your approval.
                </p>
              </div>
            </div>

            {/* =================================================
                WHAT HAPPENS NEXT
            ================================================= */}

            <div className="rounded-3xl border border-[#E5DED4] bg-white p-6 md:p-7">

              <div className="flex items-center gap-3">
                <Truck
                  size={21}
                  className="text-[#B68C2F]"
                />

                <h2 className="text-xl font-semibold text-[#12312B]">
                  What happens next?
                </h2>
              </div>

              <div className="mt-7 space-y-6">

                {/* STEP 1 */}

                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#12312B] text-sm text-white">
                    1
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#12312B]">
                      Complete Payment
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Securely complete the payment for
                      your sample order.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}

                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E7E3DD] text-sm text-gray-600">
                    2
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#12312B]">
                      Order Processing
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Our team will verify and process
                      your sample request.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}

                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E7E3DD] text-sm text-gray-600">
                    3
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#12312B]">
                      Sample Dispatch
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Tracking details will be shared once
                      the sample is dispatched.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT — PAYMENT
          ================================================= */}

          <aside className="lg:sticky lg:top-24 lg:self-start">

            <div className="overflow-hidden rounded-3xl border border-[#DCD5CB] bg-white shadow-sm">

              {/* HEADER */}

              <div className="border-b border-[#E9E3DA] p-6">
                <div className="flex items-center gap-3">
                  <CreditCard
                    size={24}
                    className="text-[#12312B]"
                  />

                  <div>
                    <h2 className="text-xl font-semibold text-[#12312B]">
                      Order Summary & Payment
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      Review everything before payment
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  PRICING
              ================================================= */}

              <div className="p-6">
                <h3 className="font-semibold text-[#12312B]">
                  Pricing Details
                </h3>

                <div className="mt-5 space-y-4 text-sm">

                  {/* UNIT PRICE */}

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Sample Price
                    </span>

                    <span className="font-medium text-[#12312B]">
                      {formatMoney(unitPrice)}
                    </span>
                  </div>

                  {/* QUANTITY */}

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Quantity
                    </span>

                    <span className="font-medium text-[#12312B]">
                      {quantity}
                    </span>
                  </div>

                  {/* VARIANT */}

                  {variantSize && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">
                        Size
                      </span>

                      <span className="font-medium text-[#12312B]">
                        {variantSize}
                      </span>
                    </div>
                  )}

                  <div className="border-t border-dashed border-[#DDD6CC] pt-4" />

                  {/* SUBTOTAL */}

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Subtotal
                    </span>

                    <span className="text-[#12312B]">
                      {formatMoney(subtotal)}
                    </span>
                  </div>

                  {/* SHIPPING */}

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Shipping & Handling
                    </span>

                    <span className="text-[#12312B]">
                      {formatMoney(shipping)}
                    </span>
                  </div>

                  {/* TAX */}

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Tax
                    </span>

                    <span className="text-[#12312B]">
                      {formatMoney(tax)}
                    </span>
                  </div>

                  <div className="border-t border-[#D8D1C7] pt-5" />

                  {/* TOTAL */}

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="font-semibold text-[#12312B]">
                        Total Amount
                      </p>

                      <p className="mt-1 text-[11px] text-gray-500">
                        Final payable amount
                      </p>
                    </div>

                    <p className="text-2xl font-bold text-[#13804A]">
                      {formatMoney(total)}
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  SECURITY
              ================================================= */}

              <div className="mx-6 rounded-2xl border border-[#CDE4D6] bg-[#F3FBF6] p-4">
                <div className="flex gap-3">

                  <ShieldCheck
                    size={23}
                    className="shrink-0 text-[#16814B]"
                  />

                  <div>
                    <p className="font-semibold text-[#12312B]">
                      Secure Payment
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      You will be redirected to our secure
                      payment gateway. Your card or other
                      payment details are handled securely
                      by the payment provider.
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  PAYMENT REQUIRED
              ================================================= */}

              <div className="mx-6 mt-5 rounded-2xl border border-[#EAD8A9] bg-[#FFFBF0] p-4">
                <p className="text-sm font-semibold text-[#6C5928]">
                  Payment Required
                </p>

                <p className="mt-1 text-xs leading-5 text-[#7A6A45]">
                  Your sample order will be processed after
                  successful payment confirmation.
                </p>
              </div>

              {/* =================================================
                  PAY BUTTON
              ================================================= */}

              <div className="p-6">

                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={
                    paymentLoading ||
                    !total ||
                    total <= 0
                  }
                  className={[
                    "flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white transition",
                    paymentLoading ||
                    !total ||
                    total <= 0
                      ? "cursor-not-allowed bg-[#8B9A94]"
                      : "bg-[#12312B] hover:bg-[#0D2822]",
                  ].join(" ")}
                >
                  {paymentLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                      Initializing Payment...
                    </>
                  ) : (
                    <>
                      <LockKeyhole size={18} />

                      Pay {formatMoney(total)}

                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-[11px] leading-5 text-gray-500">
                  By continuing, you confirm the order
                  details and authorize payment of the amount
                  shown above.
                </p>
              </div>
            </div>

            {/* =================================================
                BACK
            ================================================= */}

            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={paymentLoading}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#12312B] transition hover:text-[#B68C2F] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowLeft size={17} />

              Back to Sample Request
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}