import mongoose from "mongoose";

import SampleOrder from "../../models/SampleOrder.js";
import Product from "../../models/Product.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const createSampleOrder = async (req, res, next) => {
  try {
    const {
      customerName,
      companyName,
      email,
      phone,
      country,
      shippingAddress,
      city,
      state,
      postalCode,
      message,
    } = req.body;

    // 1. Validate customer details
    if (
      !customerName?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !shippingAddress?.trim() ||
      !country?.trim()
    ) {
      return next(
        new ApiError(
          400,
          "Customer name, email, phone, country and shipping address are required."
        )
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 2. Support both multi-product and legacy requests
    let requestedItems = [];

    if (Array.isArray(req.body.items) && req.body.items.length > 0) {
      requestedItems = req.body.items;
    } else if (req.body.product) {
      requestedItems = [
        {
          product: req.body.product,
          variant: req.body.variant,
          quantity: req.body.quantity,
        },
      ];
    }

    if (requestedItems.length === 0) {
      return next(
        new ApiError(400, "At least one sample product is required.")
      );
    }

    // Avoid malformed requests and excessively large orders
    if (requestedItems.length > 50) {
      return next(
        new ApiError(400, "A maximum of 50 products can be requested.")
      );
    }

    // 3. Validate and prepare every item
    const preparedItems = [];
    const productCache = new Map();

    for (const requestedItem of requestedItems) {
      const productId = requestedItem.product;

      if (
        !productId ||
        !mongoose.isValidObjectId(productId)
      ) {
        return next(new ApiError(400, "Invalid product ID."));
      }

      const quantity = Number(requestedItem.quantity);

      if (!Number.isSafeInteger(quantity) || quantity < 1) {
        return next(
          new ApiError(400, "Each product quantity must be a positive integer.")
        );
      }

      const id = String(productId);

      let product = productCache.get(id);

      if (!product) {
        product = await Product.findById(id);

        if (product) {
          productCache.set(id, product);
        }
      }

      if (!product) {
        return next(
          new ApiError(404, "One or more requested products were not found.")
        );
      }

      if (!product.isActive) {
        return next(
          new ApiError(
            400,
            `Product "${product.name}" is currently unavailable.`
          )
        );
      }

      // 4. Validate sample availability
      if (!product.sample?.available) {
        return next(
          new ApiError(
            400,
            `Samples are not available for "${product.name}".`
          )
        );
      }

      const sampleStock = Number(product.sample.stock);

      if (
        !Number.isFinite(sampleStock) ||
        sampleStock < 0
      ) {
        return next(
          new ApiError(
            400,
            `Sample stock is not configured correctly for "${product.name}".`
          )
        );
      }

      if (quantity > sampleStock) {
        return next(
          new ApiError(
            400,
            `Only ${sampleStock} sample(s) are available for "${product.name}".`
          )
        );
      }

      // 5. Validate optional embedded variant
      let variantId = null;
      let variantData = null;

      if (requestedItem.variant) {
        if (!mongoose.isValidObjectId(requestedItem.variant)) {
          return next(new ApiError(400, "Invalid product variant ID."));
        }

        variantData = product.variants?.find(
          (variant) =>
            String(variant._id) === String(requestedItem.variant)
        );

        if (!variantData) {
          return next(
            new ApiError(
              400,
              `The selected variant does not belong to "${product.name}".`
            )
          );
        }

        if (variantData.isActive === false) {
          return next(
            new ApiError(400, "The selected product variant is inactive.")
          );
        }

        variantId = variantData._id;
      }

      // Sample price comes from the database, never from the client.
      const samplePrice = Number(product.sample.price);

      if (!Number.isFinite(samplePrice) || samplePrice < 0) {
        return next(
          new ApiError(
            400,
            `Sample price is not configured correctly for "${product.name}".`
          )
        );
      }

      const sku =
        product.sample.sku ||
        variantData?.sku ||
        product.sku ||
        "";

      const total = Number(
        (samplePrice * quantity).toFixed(2)
      );

      preparedItems.push({
        product: product._id,
        variant: variantId,
        sku,
        quantity,
        samplePrice,
        total,
      });
    }

    // 6. Calculate total on the server
    const grandTotal = Number(
      preparedItems
        .reduce((sum, item) => sum + item.total, 0)
        .toFixed(2)
    );

    const firstItem = preparedItems[0];

    // 7. Create order
    // Keep legacy fields in sync with the first item.
    const order = await SampleOrder.create({
      orderNumber: `SMP-${Date.now()}-${new mongoose.Types.ObjectId()
        .toString()
        .slice(-6)
        .toUpperCase()}`,

      customerName: customerName.trim(),
      companyName: companyName?.trim() || "",
      email: normalizedEmail,
      phone: phone.trim(),
      country: country.trim(),

      items: preparedItems,

      product: firstItem.product,
      variant: firstItem.variant,
      sku: firstItem.sku,
      quantity: firstItem.quantity,
      samplePrice: firstItem.samplePrice,

      currency: "USD",
      shippingCost: 0,
      discount: 0,
      tax: 0,
      grandTotal,

      shippingAddress: shippingAddress.trim(),
      city: city?.trim() || "",
      state: state?.trim() || "",
      postalCode: postalCode?.trim() || "",

      message: message?.trim() || "",

      status: "Pending",
      paymentStatus: "Pending",

      ...(req.user?._id ? { tradeUser: req.user._id } : {}),
    });

    // 8. Return created order
    const populatedOrder = await SampleOrder.findById(order._id)
      .populate("product", "name sku featuredImage")
      .populate("items.product", "name sku featuredImage");

    return res.status(201).json(
      new ApiResponse(
        201,
        { order: populatedOrder },
        "Sample order created successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default createSampleOrder;