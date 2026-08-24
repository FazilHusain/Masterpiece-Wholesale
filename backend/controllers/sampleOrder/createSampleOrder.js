import SampleOrder from "../../models/SampleOrder.js";
import Product from "../../models/Product.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import generateSampleOrderNumber from "../../utils/generateSampleOrderNumber.js";

// import sendSampleOrderCustomerMail from "../../services/mail/sampleOrderSubmitted.js";

const createSampleOrder = async (req, res, next) => {
  try {
    const {
      product,
      quantity = 1,

      customerName,
      companyName,

      email,
      phone,

      shippingAddress,
      city,
      state,
      postalCode,
      country,

      message,
    } = req.body;

    /* =========================
       BASIC VALIDATION
    ========================= */

    if (!product) {
      return next(new ApiError(400, "Product is required."));
    }

    if (!customerName?.trim()) {
      return next(new ApiError(400, "Customer name is required."));
    }

    if (!email?.trim()) {
      return next(new ApiError(400, "Email is required."));
    }

    if (!phone?.trim()) {
      return next(new ApiError(400, "Phone is required."));
    }

    if (!shippingAddress?.trim()) {
      return next(new ApiError(400, "Shipping address is required."));
    }

    if (!country?.trim()) {
      return next(new ApiError(400, "Country is required."));
    }

    /* =========================
       QUANTITY VALIDATION
    ========================= */

    const requestedQuantity = Number(quantity);

    if (
      !Number.isInteger(requestedQuantity) ||
      requestedQuantity < 1
    ) {
      return next(
        new ApiError(400, "Sample quantity must be at least 1."),
      );
    }

    /* =========================
       FETCH PRODUCT
    ========================= */

    const productData = await Product.findById(product);

    if (!productData) {
      return next(new ApiError(404, "Product not found."));
    }

    /* =========================
       SAMPLE VALIDATION
    ========================= */

    if (!productData.sample?.available) {
      return next(
        new ApiError(
          400,
          "Sample is currently unavailable for this product.",
        ),
      );
    }

    const sampleStock = Number(productData.sample?.stock || 0);

    if (sampleStock < 1) {
      return next(
        new ApiError(
          400,
          "Sample is currently out of stock.",
        ),
      );
    }

    if (requestedQuantity > sampleStock) {
      return next(
        new ApiError(
          400,
          `Only ${sampleStock} sample(s) are currently available.`,
        ),
      );
    }

    /* =========================
       SAMPLE PRICE
    ========================= */

    const samplePrice = Number(
      productData.sample?.price || 0,
    );

    if (samplePrice <= 0) {
      return next(
        new ApiError(
          400,
          "Sample price is not configured for this product.",
        ),
      );
    }

    /* =========================
       PRICING
    ========================= */

    const shippingCost = 0;
    const discount = 0;
    const tax = 0;

    const subtotal =
      samplePrice * requestedQuantity;

    const grandTotal =
      subtotal +
      shippingCost +
      tax -
      discount;

    /* =========================
       ORDER NUMBER
    ========================= */

    const orderNumber =
      await generateSampleOrderNumber();

    /* =========================
       CREATE ORDER
    ========================= */

    const order = await SampleOrder.create({
      orderNumber,

      product,

      quantity: requestedQuantity,

      customerName: customerName.trim(),
      companyName: companyName?.trim() || "",

      email: email.trim().toLowerCase(),
      phone: phone.trim(),

      shippingAddress: shippingAddress.trim(),
      city: city?.trim() || "",
      state: state?.trim() || "",
      postalCode: postalCode?.trim() || "",
      country: country.trim(),

      message: message?.trim() || "",

      // IMPORTANT:
      // Sample SKU, not wholesale variant SKU
      sku:
        productData.sample?.sku ||
        productData.sku ||
        "",

      currency: "USD",

      samplePrice,

      shippingCost,

      discount,

      tax,

      grandTotal,

      // Payment will start from Pending
      paymentStatus: "Pending",

      // Normal user => null
      // Trade user => authenticated user's ID
      tradeUser: req.user?._id || null,
    });

    /* =========================
       EMAIL
    ========================= */

    // await sendSampleOrderCustomerMail(order);

    /* =========================
       RESPONSE
    ========================= */

    return res.status(201).json(
      new ApiResponse(
        201,
        {
          order,
          payment: {
            required: grandTotal > 0,
            amount: grandTotal,
            currency: "USD",
          },
        },
        "Sample order created successfully.",
      ),
    );
  } catch (error) {
    next(error);
  }
};

export default createSampleOrder;