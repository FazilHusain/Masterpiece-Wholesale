import SampleOrder from "../../models/SampleOrder.js";
import Product from "../../models/Product.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import generateSampleOrderNumber from "../../utils/generateSampleOrderNumber.js";

const createSampleOrder = async (req, res, next) => {
  try {
    const {
      items,
      product,
      variantId,
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

    // 1. Validate customer details
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

    // 2. Support both old single-product and new multi-product requests
    const requestedItems =
      Array.isArray(items) && items.length > 0
        ? items
        : product
          ? [{ product, variantId, quantity }]
          : [];

    if (!requestedItems.length) {
      return next(new ApiError(400, "At least one product is required."));
    }

    const orderItems = [];
    let grandTotal = 0;

    // 3. Fetch and validate every product on the server
    for (const item of requestedItems) {
      const productId = item.product || item.productId;
      const requestedQuantity = Number(item.quantity);
      const requestedVariantId = item.variantId || item.variant;

      if (
        !Number.isInteger(requestedQuantity) ||
        requestedQuantity < 1
      ) {
        return next(
          new ApiError(400, "Each sample quantity must be at least 1."),
        );
      }

      if (!productId) {
        return next(new ApiError(400, "Product ID is required for each item."));
      }

      const productData = await Product.findById(productId);

      if (!productData) {
        return next(new ApiError(404, "A selected product was not found."));
      }

      if (!productData.isActive || !productData.sample?.available) {
        return next(
          new ApiError(
            400,
            `Samples are unavailable for ${productData.name}.`,
          ),
        );
      }

      // Validate selected variant if provided
      let selectedVariant = null;

      if (requestedVariantId) {
        selectedVariant = productData.variants?.find(
          (variant) =>
            String(variant._id) === String(requestedVariantId) &&
            variant.isActive !== false,
        );

        if (!selectedVariant) {
          return next(
            new ApiError(400, `Invalid variant for ${productData.name}.`),
          );
        }
      }

      // Sample stock and sample price come from the admin Sample section
      const sampleStock = Number(productData.sample.stock || 0);
      const samplePrice = Number(productData.sample.price || 0);

      if (sampleStock < 1) {
        return next(
          new ApiError(400, `Samples are out of stock for ${productData.name}.`),
        );
      }

      if (requestedQuantity > sampleStock) {
        return next(
          new ApiError(
            400,
            `Only ${sampleStock} sample(s) are available for ${productData.name}.`,
          ),
        );
      }

      if (!Number.isFinite(samplePrice) || samplePrice < 0) {
        return next(
          new ApiError(400, `Invalid sample price for ${productData.name}.`),
        );
      }

      const lineTotal = samplePrice * requestedQuantity;
      grandTotal += lineTotal;

      orderItems.push({
        product: productData._id,
        variant: selectedVariant?._id || null,
        sku: productData.sample.sku || productData.sku || "",
        quantity: requestedQuantity,
        samplePrice,
        total: lineTotal,
      });
    }

    // 4. Preserve old fields for existing single-product compatibility
    const firstItem = orderItems[0];

    const shippingCost = 0;
    const discount = 0;
    const tax = 0;

    grandTotal = grandTotal + shippingCost + tax - discount;

    const orderNumber = await generateSampleOrderNumber();

    const order = await SampleOrder.create({
      orderNumber,
      items: orderItems,

      // Legacy fields remain populated for existing code
      product: firstItem.product,
      variant: firstItem.variant,
      sku: firstItem.sku,
      quantity: firstItem.quantity,
      samplePrice: firstItem.samplePrice,

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

      currency: "USD",
      shippingCost,
      discount,
      tax,
      grandTotal,

      paymentStatus: "Pending",
      paymentGateway: "PayGlocal",
      tradeUser: req.user?._id || null,
    });

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