const getPayGlocalConfig = () => {
  return {
    clientId: process.env.PAYGLOCAL_CLIENT_ID || "",
    clientSecret: process.env.PAYGLOCAL_CLIENT_SECRET || "",
    apiKey: process.env.PAYGLOCAL_API_KEY || "",
    apiUrl:
      process.env.PAYGLOCAL_API_URL ||
      "https://api.uat.payglocal.in",
    callbackUrl:
      process.env.PAYGLOCAL_CALLBACK_URL || "",
  };
};

/*
 * =========================================================
 * PAYGLOCAL CONFIG CHECK
 * =========================================================
 *
 * Credentials are intentionally kept server-side.
 *
 * We do NOT fake a payment session when credentials
 * are missing.
 */

export const isPayGlocalConfigured = () => {
  const config = getPayGlocalConfig();

  return Boolean(
    config.apiKey &&
      config.apiUrl &&
      config.callbackUrl,
  );
};

/*
 * =========================================================
 * INITIALIZE PAYGLOCAL PAYMENT
 * =========================================================
 *
 * This is the single gateway entry point.
 *
 * Once PayGlocal credentials + exact merchant payload
 * are available, the API request will be implemented here.
 *
 * Controllers and frontend will NOT need to change.
 */

export const initializePayGlocalPayment = async ({
  order,
}) => {
  if (!order?._id) {
    throw new Error("Sample order is required.");
  }

  if (!order.grandTotal || order.grandTotal <= 0) {
    throw new Error("Invalid payment amount.");
  }

  const config = getPayGlocalConfig();

  /*
   * Credentials are not available yet.
   *
   * Never pretend that payment has been initialized.
   */
  if (!isPayGlocalConfigured()) {
    const error = new Error(
      "PayGlocal payment gateway is not configured yet.",
    );

    error.code = "PAYGLOCAL_NOT_CONFIGURED";

    throw error;
  }

  /*
   * =======================================================
   * PAYGLOCAL API INTEGRATION
   * =======================================================
   *
   * Merchant-specific PayGlocal credentials and the final
   * payment payload are required before making the real
   * gateway request.
   *
   * DO NOT put PayGlocal secret/API credentials in frontend.
   */

  /*
   * Example internal payment object.
   *
   * This is NOT a PayGlocal API response.
   * It only gives our application a stable structure.
   */

  return {
    provider: "PayGlocal",

    orderId: order._id,

    orderNumber: order.orderNumber,

    amount: Number(order.grandTotal),

    currency: order.currency || "USD",

    status: "Pending",

    checkoutUrl: null,

    gatewayOrderId:
      order.gatewayOrderId || "",

    message:
      "PayGlocal payment initialization is ready for gateway credentials.",
  };
};

export default {
  initializePayGlocalPayment,
  isPayGlocalConfigured,
};