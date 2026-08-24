import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  createWebsiteSampleOrder,
  createWebsiteSamplePayment,
} from "../../../redux/websiteSampleOrder/websiteSampleOrderThunk";

import { fetchWebsiteProduct } from "../../../redux/websiteProduct/websiteProductThunk";
import { getTradeUser } from "../../../services/trade.service";
import { Button, Input, Textarea } from "../../../components/ui";
import { useNavigate } from "react-router-dom";

const SampleRequestSection = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { slug } = useParams();

  const { product } = useSelector((state) => state.websiteProduct);

  const { loading, paymentLoading } = useSelector(
    (state) => state.websiteSampleOrder,
  );

  const user = getTradeUser();

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    product: "",
    quantity: 1,

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

  /* =========================
     FETCH PRODUCT
  ========================= */

  useEffect(() => {
    if (slug) {
      dispatch(fetchWebsiteProduct(slug));
    }
  }, [dispatch, slug]);

  /* =========================
     SET PRODUCT
  ========================= */

  useEffect(() => {
    if (!product) return;

    setFormData((prev) => ({
      ...prev,
      product: product._id,
    }));
  }, [product]);

  /* =========================
     PREFILL TRADE USER
  ========================= */

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

  /* =========================
     CHANGE
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  /* =========================
     VALIDATION
  ========================= */

  const validate = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Customer name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required.";
    }

    if (!formData.shippingAddress.trim()) {
      newErrors.shippingAddress = "Address is required.";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required.";
    }

    if (Number(formData.quantity) < 1) {
      newErrors.quantity = "Quantity is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      /*
       * STEP 1
       * Create sample order
       */

      const orderResponse = await dispatch(
        createWebsiteSampleOrder({
          ...formData,
          quantity: Number(formData.quantity),
        }),
      ).unwrap();

      const createdOrder = orderResponse?.data?.order;

      if (!createdOrder?._id) {
        throw new Error(
          "Sample order was created but order ID was not returned.",
        );
      }

      /*
       * STEP 2
       * Initialize payment
       */

      const paymentResponse = await dispatch(
        createWebsiteSamplePayment(createdOrder._id),
      ).unwrap();

      console.log("Sample payment initialized:", paymentResponse);

      toast.success("Sample order created successfully.");

      navigate("/sample-payment", {
        state: {
          order: createdOrder,
          paymentData: paymentResponse,
        },
      });
      
    } catch (error) {
      console.error("Sample order/payment error:", error);

      toast.error(
        error?.message || error?.error?.message || "Something went wrong.",
      );
    }
  };

  /* =========================
     RENDER
  ========================= */

  return (
    <section className="bg-[#FAF8F4] py-12 md:py-14">
      <div className="mx-auto max-w-[1180px] px-5 lg:px-7">
        <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          {/* =========================
              LEFT — SAMPLE FORM
          ========================= */}

          <form
            onSubmit={handleSubmit}
            className="border border-[#E4DDD3] bg-white p-5 md:p-6"
          >
            <div className="mb-6">
              <span className="text-[9px] font-medium uppercase tracking-[0.38em] text-[#B68C2F]">
                SAMPLE REQUEST
              </span>

              <h2
                className="mt-3 text-[31px] leading-[1.05] text-[#183425] md:text-[35px]"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                }}
              >
                Request a <span className="italic">Sample</span>
              </h2>

              <p className="mt-3 text-[12px] leading-6 text-[#6B6259]">
                Tell us a little about your requirements and our team will get
                back to you within 24 hours.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
              {/* Product */}

              <div className="md:col-span-2">
                <Input label="Product" value={product?.name || ""} readOnly />
              </div>

              {/* Customer */}

              <Input
                label="Customer Name *"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                error={errors.customerName}
              />

              <Input
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />

              {/* Contact */}

              <Input
                label="Email *"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <Input
                label="Phone *"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />

              {/* Quantity */}

              <Input
                label="Quantity *"
                type="number"
                min={1}
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                error={errors.quantity}
              />

              <div className="hidden md:block" />

              {/* Address */}

              <div className="md:col-span-2">
                <Textarea
                  label="Shipping Address *"
                  rows={3}
                  name="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={handleChange}
                  error={errors.shippingAddress}
                />
              </div>

              {/* Location */}

              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />

              <Input
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />

              <Input
                label="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />

              <Input
                label="Country *"
                name="country"
                value={formData.country}
                onChange={handleChange}
                error={errors.country}
              />

              {/* Message */}

              <div className="md:col-span-2">
                <Textarea
                  label="Message"
                  rows={3}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Anything you'd like us to know..."
                />
              </div>
            </div>

            {/* Submit */}

            <div className="mt-6">
              <Button
                type="submit"
                loading={loading || paymentLoading}
                disabled={loading || paymentLoading}
                className="h-11 w-full bg-[#183425] text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#10271B]"
              >
                {paymentLoading ? "Preparing Payment..." : "Request Sample"}
              </Button>
            </div>
          </form>

          {/* =========================
              RIGHT — PROCESS
          ========================= */}

          <div className="lg:sticky lg:top-28">
            <span className="text-[9px] font-medium uppercase tracking-[0.38em] text-[#B68C2F]">
              HOW IT WORKS
            </span>

            <h2
              className="mt-3 text-[30px] leading-[1.05] text-[#183425] md:text-[34px]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
              }}
            >
              Sample Request <span className="italic">Process</span>
            </h2>

            <div className="mt-7 space-y-5">
              {/* Step 1 */}

              <div className="flex items-start gap-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#183425] text-[9px] font-medium text-white">
                  1
                </div>

                <div>
                  <h3
                    className="text-[18px] leading-tight text-[#183425]"
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                    }}
                  >
                    Submit Request
                  </h3>

                  <p className="mt-1.5 text-[11px] leading-5 text-[#6B6259]">
                    Complete the form and submit your request.
                  </p>
                </div>
              </div>

              {/* Step 2 */}

              <div className="flex items-start gap-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#183425] text-[9px] font-medium text-white">
                  2
                </div>

                <div>
                  <h3
                    className="text-[18px] leading-tight text-[#183425]"
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                    }}
                  >
                    Review
                  </h3>

                  <p className="mt-1.5 text-[11px] leading-5 text-[#6B6259]">
                    Our team reviews your request within 24 hours.
                  </p>
                </div>
              </div>

              {/* Step 3 */}

              <div className="flex items-start gap-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#183425] text-[9px] font-medium text-white">
                  3
                </div>

                <div>
                  <h3
                    className="text-[18px] leading-tight text-[#183425]"
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                    }}
                  >
                    Dispatch
                  </h3>

                  <p className="mt-1.5 text-[11px] leading-5 text-[#6B6259]">
                    Once approved, your sample will be shipped.
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Help */}

            <div className="mt-7 bg-[#183425] px-5 py-5">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/60">
                Need help with your sample?
              </p>

              <a
                href="tel:+919876543210"
                className="mt-1 block text-[19px] font-semibold tracking-wide text-[#B68C2F] transition hover:text-white"
              >
                +91 98765 43210
              </a>
            </div>

            {/* Small Info */}

            <div className="mt-5 border border-[#E4DDD3] bg-white px-5 py-4">
              <p className="text-[11px] leading-5 text-[#777]">
                Samples help you evaluate quality, fabric and craftsmanship
                before placing a larger wholesale order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SampleRequestSection;
