import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  createWebsiteSampleOrder,
  createWebsiteSamplePayment,
} from "../../../redux/websiteSampleOrder/websiteSampleOrderThunk";
import {
  fetchWebsiteProduct,
  fetchWebsiteProducts,
} from "../../../redux/websiteProduct/websiteProductThunk";
import { getTradeUser } from "../../../services/trade.service";
import { Button, Input, Textarea } from "../../../components/ui";

const money = (value) => `$${(Number(value) || 0).toFixed(2)}`;

const getProductImageUrl = (product) => {
  const candidates = [
    product?.thumbnail,
    product?.image,
    product?.mainImage,
    product?.featuredImage,
    product?.primaryImage,
    product?.images?.[0],
    product?.gallery?.[0],
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate;
    if (candidate && typeof candidate === "object") {
      const url = candidate.url || candidate.secure_url || candidate.src || candidate.imageUrl;
      if (typeof url === "string" && url.trim()) return url;
    }
  }
  return "";
};

const ProductThumbnail = ({ product, size = "md" }) => {
  const [failed, setFailed] = useState(false);
  const imageUrl = getProductImageUrl(product);
  const dimensions = size === "sm" ? "h-12 w-12" : "h-14 w-14";

  return (
    <div className={`${dimensions} shrink-0 overflow-hidden border border-[#E4DDD3] bg-[#FAF8F4]`}>
      {imageUrl && !failed ? (
        <img
          src={imageUrl}
          alt={product?.name || product?.title || "Product"}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[8px] uppercase tracking-widest text-[#B68C2F]">HMP</div>
      )}
    </div>
  );
};

const getProductId = (product) => String(product?._id || product?.id || "");

const getActiveVariants = (product) =>
  (Array.isArray(product?.variants) ? product.variants : []).filter(
    (variant) => variant?.isActive !== false,
  );

const getDefaultVariant = (product, preferredId = "") => {
  const variants = getActiveVariants(product);
  return (
    variants.find((variant) => String(variant._id) === String(preferredId)) ||
    variants[0] ||
    null
  );
};

const normalizeProducts = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.products)) return payload.data.products;
  return [];
};

const SampleRequestSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();

  const { product, products: productsState, loading: productsLoading } =
    useSelector((state) => state.websiteProduct || {});
  const { loading, paymentLoading } = useSelector(
    (state) => state.websiteSampleOrder || {},
  );

  const user = useMemo(() => getTradeUser(), []);
  const navigationState = location.state || {};
  const selectedVariantId = navigationState.selectedVariantId || "";
  const initialQuantity = Number(navigationState.quantity) || 1;

  const [items, setItems] = useState([]);
  const [productToAdd, setProductToAdd] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    customerName: "",
    companyName: "",
    email: "",
    phone: "",
    shippingAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    message: "",
  });

  const products = useMemo(() => {
    const list = normalizeProducts(productsState);
    if (product && getProductId(product) && !list.some((p) => getProductId(p) === getProductId(product))) {
      return [product, ...list];
    }
    return list;
  }, [productsState, product]);

  useEffect(() => {
    dispatch(fetchWebsiteProducts());
    if (slug) dispatch(fetchWebsiteProduct(slug));
  }, [dispatch, slug]);

  // Preserve Product Details -> Request Sample preselection.
  useEffect(() => {
    if (!product?._id) return;
    setItems((current) => {
      const alreadyAdded = current.some(
        (item) => String(item.productId) === String(product._id),
      );
      if (alreadyAdded) return current;
      const variant = getDefaultVariant(product, selectedVariantId);
      return [
        ...current,
        {
          key: `${product._id}-${Date.now()}`,
          productId: String(product._id),
          product,
          variantId: variant?._id || "",
          quantity: Math.max(initialQuantity, Number(variant?.moq) || 1),
        },
      ];
    });
  }, [product, selectedVariantId, initialQuantity]);

  useEffect(() => {
    if (!user) return;
    const address =
      user.addresses?.find((item) => item.isDefault) || user.addresses?.[0];
    setFormData((prev) => ({
      ...prev,
      customerName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      companyName: user.businessName || "",
      email: user.email || "",
      phone: user.phone || "",
      shippingAddress: address?.addressLine1 || "",
      city: address?.city || "",
      state: address?.state || "",
      postalCode: address?.postalCode || "",
      country: address?.country || "",
    }));
  }, [user]);

  const updateItem = (key, patch) => {
    setItems((current) =>
      current.map((item) => (item.key === key ? { ...item, ...patch } : item)),
    );
    setErrors((current) => ({ ...current, items: "" }));
  };

  const handleAddProduct = () => {
    const selectedProduct = products.find(
      (item) => getProductId(item) === String(productToAdd),
    );
    if (!selectedProduct) {
      toast.error("Please select a product to add.");
      return;
    }
    if (items.some((item) => String(item.productId) === getProductId(selectedProduct))) {
      toast.error("This product is already in your sample request.");
      return;
    }
    const variant = getDefaultVariant(selectedProduct);
    if (!variant) {
      toast.error(`${selectedProduct.name || "This product"} has no active variant.`);
      return;
    }
    setItems((current) => [
      ...current,
      {
        key: `${getProductId(selectedProduct)}-${Date.now()}`,
        productId: getProductId(selectedProduct),
        product: selectedProduct,
        variantId: variant._id,
        quantity: Number(variant.moq) || 1,
      },
    ]);
    setProductToAdd("");
    setErrors((current) => ({ ...current, items: "" }));
  };

  const handleRemoveItem = (key) => {
    setItems((current) => current.filter((item) => item.key !== key));
    setErrors((current) => ({ ...current, items: "" }));
  };

  const itemTotals = useMemo(
    () =>
      items.map((item) => {
        const variant = getActiveVariants(item.product).find(
          (entry) => String(entry._id) === String(item.variantId),
        );
        const unitPrice = Number(item.product?.sample?.price) || 0;
        const quantity = Number(item.quantity) || 0;
        return {
          ...item,
          variant,
          unitPrice,
          quantity,
          total: unitPrice * quantity,
          minimumQuantity: Number(variant?.moq) || 1,
        };
      }),
    [items],
  );

  const grandTotal = itemTotals.reduce((sum, item) => sum + item.total, 0);
  const totalQuantity = itemTotals.reduce((sum, item) => sum + item.quantity, 0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!items.length) nextErrors.items = "Please add at least one product.";
    itemTotals.forEach((item, index) => {
      if (!item.productId) nextErrors.items = `Product ${index + 1} is invalid.`;
      if (!item.variant?._id) nextErrors.items = `Please select a variant for ${item.product?.name || `product ${index + 1}`}.`;
      if (!Number.isInteger(Number(item.quantity)) || Number(item.quantity) < item.minimumQuantity) {
        nextErrors.items = `Minimum quantity for ${item.product?.name || `product ${index + 1}`} is ${item.minimumQuantity}.`;
      }
      if (Number(item.product?.sample?.stock) < Number(item.quantity)) {
        nextErrors.items = `Requested quantity exceeds sample stock for ${item.product?.name || `product ${index + 1}`}.`;
      }
    });
    if (!formData.customerName.trim()) nextErrors.customerName = "Customer name is required.";
    if (!formData.email.trim()) nextErrors.email = "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) nextErrors.email = "Please enter a valid email.";
    if (!formData.phone.trim()) nextErrors.phone = "Phone is required.";
    if (!formData.shippingAddress.trim()) nextErrors.shippingAddress = "Address is required.";
    if (!formData.country.trim()) nextErrors.country = "Country is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      toast.error("Please check the product selection and required details.");
      return;
    }

    try {
      const payload = {
        ...formData,
        items: itemTotals.map((item) => ({
          product: item.productId,
          variantId: item.variantId,
          quantity: Number(item.quantity),
        })),
      };

      const orderResponse = await dispatch(createWebsiteSampleOrder(payload)).unwrap();
      const createdOrder = orderResponse?.data?.order || orderResponse?.order;
      if (!createdOrder?._id) {
        throw new Error("Sample order was created but order ID was not returned.");
      }

      const paymentResponse = await dispatch(
        createWebsiteSamplePayment(createdOrder._id),
      ).unwrap();

      toast.success("Sample order created successfully.");
      navigate("/sample-payment", {
        state: { order: createdOrder, paymentData: paymentResponse },
      });
    } catch (error) {
      console.error("Sample order/payment error:", error);
      toast.error(
        error?.message ||
          error?.error?.message ||
          error?.payload?.message ||
          "Something went wrong.",
      );
    }
  };

  const inputClass =
    "w-full border border-[#E4DDD3] bg-white px-3 py-3 text-sm text-[#183425] outline-none focus:border-[#B68C2F]";

  return (
    <section className="bg-[#FAF8F4] py-12 md:py-16">
      <div className="mx-auto max-w-[1180px] px-5 lg:px-7">
        <div className="grid items-start gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden border border-[#E4DDD3] bg-white shadow-[0_12px_45px_rgba(24,52,37,0.05)]"
          >
            <div className="border-b border-[#EAE4DA] px-5 py-6 md:px-7 md:py-7">
              <span className="text-[9px] font-medium uppercase tracking-[0.38em] text-[#B68C2F]">
                SAMPLE REQUEST
              </span>
              <h2
                className="mt-3 text-[32px] leading-[1.05] text-[#183425] md:text-[37px]"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Request <span className="italic">Samples</span>
              </h2>
              <p className="mt-3 max-w-xl text-[12px] leading-6 text-[#6B6259]">
                Add one or more products, choose a variant and quantity for each, then enter delivery details for one combined order.
              </p>
            </div>

            <div className="border-b border-[#EAE4DA] bg-[#FAF8F4] px-5 py-5 md:px-7">
              <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B8176]">
                Add another product
              </label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <select
                  value={productToAdd}
                  onChange={(event) => setProductToAdd(event.target.value)}
                  className={`${inputClass} min-w-0 flex-1`}
                >
                  <option value="">
                    {productsLoading ? "Loading products..." : "Select a product"}
                  </option>
                  {products
                    .filter((entry) => !items.some((item) => String(item.productId) === getProductId(entry)))
                    .map((entry) => (
                      <option key={getProductId(entry)} value={getProductId(entry)}>
                        {entry.name || entry.title || "Unnamed product"}
                      </option>
                    ))}
                </select>
                <Button type="button" onClick={handleAddProduct} className="min-h-11 whitespace-nowrap bg-[#183425] text-white">
                  + Add Product
                </Button>
              </div>
              {errors.items && (
                <p className="mt-2 text-xs text-red-600">{errors.items}</p>
              )}
            </div>

            <div className="space-y-4 px-5 py-5 md:px-7">
              {itemTotals.length === 0 ? (
                <div className="border border-dashed border-[#D8CFC2] px-4 py-8 text-center text-sm text-[#77716A]">
                  {slug ? "Loading selected product..." : "No products added yet. Select a product above to get started."}
                </div>
              ) : (
                itemTotals.map((item, index) => (
                  <div key={item.key} className="border border-[#E4DDD3] bg-white">
                    <div className="flex items-start justify-between gap-3 border-b border-[#EAE4DA] bg-[#FAF8F4] px-4 py-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <ProductThumbnail product={item.product} />
                        <div className="min-w-0">
                          <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#8B8176]">
                            Product {index + 1}
                          </p>
                          <h3 className="mt-1 text-sm font-medium leading-5 text-[#183425]">
                            {item.product?.name || item.product?.title || "Selected product"}
                          </h3>
                          <p className="mt-1 text-xs text-[#77716A]">
                            Sample price: {money(item.unitPrice)} / piece
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.key)}
                        className="text-xs font-semibold text-red-600 hover:text-red-800"
                        aria-label={`Remove ${item.product?.name || "product"}`}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid gap-4 p-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8B8176]">
                          Variant / Size *
                        </label>
                        <select
                          value={item.variantId}
                          onChange={(event) => {
                            const variant = getDefaultVariant(item.product, event.target.value);
                            updateItem(item.key, {
                              variantId: variant?._id || "",
                              quantity: Math.max(Number(item.quantity) || 1, Number(variant?.moq) || 1),
                            });
                          }}
                          className={inputClass}
                        >
                          <option value="">Select variant</option>
                          {getActiveVariants(item.product).map((variant) => (
                            <option key={variant._id} value={variant._id}>
                              {variant.size || variant.name || variant.sku || "Variant"}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8B8176]">
                          Quantity * (Min {item.minimumQuantity})
                        </label>
                        <input
                          type="number"
                          min={item.minimumQuantity}
                          step="1"
                          value={item.quantity}
                          onChange={(event) => {
                            const value = Number(event.target.value);
                            updateItem(item.key, {
                              quantity: value > 0 ? value : item.minimumQuantity,
                            });
                          }}
                          className={inputClass}
                        />
                      </div>
                      <div className="sm:col-span-2 flex items-center justify-between border-t border-[#EEEAE3] pt-3">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8B8176]">
                          Line total
                        </span>
                        <span className="text-lg font-semibold text-[#183425]">
                          {money(item.total)}
                        </span>
                      </div>
                      {Number(item.product?.sample?.stock) > 0 && (
                        <p className="sm:col-span-2 -mt-2 text-[10px] text-[#77716A]">
                          Sample stock available: {Number(item.product.sample.stock)}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="px-5 pb-6 md:px-7">
              <div className="mb-6 flex items-center justify-between border border-[#183425] bg-[#183425] px-4 py-4 text-white">
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/60">
                    Combined sample total
                  </p>
                  <p className="mt-1 text-xs text-white/70">
                    {itemTotals.length} product{itemTotals.length !== 1 ? "s" : ""} · {totalQuantity} piece{totalQuantity !== 1 ? "s" : ""}
                  </p>
                </div>
                <p className="text-2xl font-semibold text-[#B68C2F]">{money(grandTotal)}</p>
              </div>

              <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#183425]">
                Delivery & Contact Details
              </h3>
              <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
                <Input label="Customer Name *" name="customerName" value={formData.customerName} onChange={handleChange} error={errors.customerName} />
                <Input label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
                <Input label="Email *" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
                <Input label="Phone *" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} />
                <div className="md:col-span-2">
                  <Textarea label="Shipping Address *" rows={3} name="shippingAddress" value={formData.shippingAddress} onChange={handleChange} error={errors.shippingAddress} />
                </div>
                <Input label="City" name="city" value={formData.city} onChange={handleChange} />
                <Input label="State" name="state" value={formData.state} onChange={handleChange} />
                <Input label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                <Input label="Country *" name="country" value={formData.country} onChange={handleChange} error={errors.country} />
                <div className="md:col-span-2">
                  <Textarea label="Message" rows={3} name="message" value={formData.message} onChange={handleChange} placeholder="Anything you'd like us to know..." />
                </div>
              </div>

              <div className="mt-6 border border-[#E5DDCF] bg-[#FBF8F2] px-4 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#183425]">
                  Secure Sample Payment
                </p>
                <p className="mt-1 text-[11px] leading-5 text-[#6B6259]">
                  One order will be created for all selected products. Payment will be initialized for the amount calculated by the server.
                </p>
              </div>

              <div className="mt-5">
                <Button
                  type="submit"
                  loading={loading || paymentLoading}
                  disabled={loading || paymentLoading || itemTotals.length === 0}
                  className="h-12 w-full bg-[#183425] text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-[#10271B]"
                >
                  {paymentLoading ? "Preparing Secure Payment..." : loading ? "Creating Sample Order..." : `Continue to Payment · ${money(grandTotal)}`}
                </Button>
              </div>
              <p className="mt-3 text-center text-[9px] uppercase tracking-[0.13em] text-[#9A9187]">
                Secure checkout · Final payable amount is calculated on the server
              </p>
            </div>
          </form>

          <aside className="lg:sticky lg:top-28">
            <span className="text-[9px] font-medium uppercase tracking-[0.38em] text-[#B68C2F]">
              YOUR SAMPLE
            </span>
            <h2
              className="mt-3 text-[31px] leading-[1.05] text-[#183425] md:text-[36px]"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Sample Order <span className="italic">Summary</span>
            </h2>

            <div className="mt-7 border border-[#E4DDD3] bg-white">
              {itemTotals.length === 0 ? (
                <p className="px-5 py-6 text-sm text-[#77716A]">Your selected products will appear here.</p>
              ) : (
                <div className="divide-y divide-[#EEEAE3]">
                  {itemTotals.map((item) => (
                    <div key={item.key} className="flex items-center gap-3 px-4 py-4">
                      <ProductThumbnail product={item.product} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium leading-5 text-[#183425]">
                          {item.product?.name || item.product?.title || "Product"}
                        </p>
                        <p className="mt-1 text-xs text-[#77716A]">
                          {item.variant?.size || "Variant"} · {item.quantity} × {money(item.unitPrice)}
                        </p>
                      </div>
                      <p className="shrink-0 text-right text-sm font-semibold text-[#183425]">
                        {money(item.total)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <div className="border-t border-[#183425] bg-[#183425] px-5 py-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-white/55">
                      Combined Estimated Amount
                    </p>
                    <p className="mt-1 text-[10px] text-white/55">All selected sample items</p>
                  </div>
                  <p className="text-[27px] font-semibold text-[#B68C2F]">{money(grandTotal)}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <span className="text-[9px] font-medium uppercase tracking-[0.38em] text-[#B68C2F]">HOW IT WORKS</span>
              <div className="mt-6 space-y-5">
                <ProcessStep number="1" title="Choose Samples" text="Add products and choose the required variant and quantity for each." />
                <ProcessStep number="2" title="Secure Payment" text="Continue to the secure payment step for the combined order." />
                <ProcessStep number="3" title="Dispatch" text="After payment is confirmed, the team processes your sample request." />
              </div>
            </div>

            <div className="mt-8 bg-[#183425] px-5 py-5">
              <p className="text-[9px] uppercase tracking-[0.17em] text-white/55">Need help with your sample?</p>
              <a href="tel:+919876543210" className="mt-1 block text-[18px] font-semibold tracking-wide text-[#B68C2F] transition hover:text-white">
                +91 98765 43210
              </a>
            </div>
            <div className="mt-4 border border-[#E4DDD3] bg-white px-5 py-4">
              <p className="text-[10px] leading-5 text-[#77716A]">
                Samples help you evaluate fabric quality, finish and craftsmanship before placing a larger wholesale order.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

const ProcessStep = ({ number, title, text }) => (
  <div className="flex items-start gap-4">
    <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#183425] text-[9px] font-medium text-white">
      {number}
    </div>
    <div>
      <h3 className="text-[18px] leading-tight text-[#183425]" style={{ fontFamily: "Cormorant Garamond, serif" }}>
        {title}
      </h3>
      <p className="mt-1.5 text-[11px] leading-5 text-[#6B6259]">{text}</p>
    </div>
  </div>
);

export default SampleRequestSection;
