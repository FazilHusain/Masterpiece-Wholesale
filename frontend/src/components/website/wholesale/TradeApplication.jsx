import { MessageCircle } from "lucide-react";
import Select from "react-select";
import { businessTypeOptions } from "../../../utils/businessTypes";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import api from "../../../services/axios";
import { Country } from "country-state-city";
import { useMemo, useEffect, useState } from "react";
import { tradeSchema } from "../../../validations/tradeSchema";

const selectStyles = (error) => ({
  control: (base, state) => ({
    ...base,
    minHeight: 44,
    height: 44,
    borderRadius: 0,
    borderColor: error ? "#ef4444" : state.isFocused ? "#b8934c" : "#e4ddd1",
    boxShadow: "none",
    fontSize: 13,
    color: "#555",

    "&:hover": {
      borderColor: "#b8934c",
    },
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "0 12px",
  }),

  placeholder: (base) => ({
    ...base,
    color: "#9a9a9a",
    fontSize: 13,
  }),

  singleValue: (base) => ({
    ...base,
    fontSize: 13,
    color: "#555",
  }),

  input: (base) => ({
    ...base,
    fontSize: 13,
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  dropdownIndicator: (base) => ({
    ...base,
    padding: "0 10px",
  }),

  menu: (base) => ({
    ...base,
    zIndex: 9999,
    fontSize: 13,
  }),

  option: (base, state) => ({
    ...base,
    fontSize: 13,
    padding: "9px 12px",
    backgroundColor: state.isSelected
      ? "#183324"
      : state.isFocused
        ? "#f5f1e9"
        : "#fff",
    color: state.isSelected ? "#fff" : "#444",
  }),
});

export default function TradeApplication() {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productRows, setProductRows] = useState([
    { product: null, quantity: "1" },
  ]);

  useEffect(() => {
    let mounted = true;

    const loadProducts = async () => {
      setProductsLoading(true);
      try {
        const { data } = await api.get(
          `${import.meta.env.VITE_API_URL}/api/products`
        );

        const body = data?.data ?? data?.products ?? data;
        const list = Array.isArray(body)
          ? body
          : Array.isArray(body?.products)
            ? body.products
            : Array.isArray(body?.results)
              ? body.results
              : [];

        if (mounted) {
          setProducts(
            list
              .filter((product) => product && product._id && product.name)
              .map((product) => ({
                value: product._id,
                label: product.sku
                  ? `${product.name} — ${product.sku}`
                  : product.name,
                name: product.name,
                sku: product.sku || "",
              }))
          );
        }
      } catch (error) {
        if (mounted) {
          toast.error(
            error.response?.data?.message ||
              "Unable to load products. Please try again."
          );
        }
      } finally {
        if (mounted) setProductsLoading(false);
      }
    };

    loadProducts();
    return () => {
      mounted = false;
    };
  }, []);

  const addProductRow = () => {
    setProductRows((rows) => [...rows, { product: null, quantity: "1" }]);
  };

  const removeProductRow = (index) => {
    setProductRows((rows) =>
      rows.length === 1
        ? [{ product: null, quantity: "1" }]
        : rows.filter((_, i) => i !== index)
    );
  };

  const updateProductRow = (index, key, value) => {
    setProductRows((rows) =>
      rows.map((row, i) => (i === index ? { ...row, [key]: value } : row))
    );
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(tradeSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      businessName: "",
      businessType: "",
      businessAddress: "",
      email: "",
      whatsapp: "",
      city: "",
      country: null,
      categoriesInterested: [],
      orderItems: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        businessName: data.businessName.trim(),
        email: data.email.trim().toLowerCase(),
        whatsapp: data.whatsapp.trim(),
        businessType: data.businessType,
        businessAddress: data.businessAddress?.trim() || "",
        city: data.city?.trim() || "",
        state: "",
        country: data.country?.label || "",
        website: "",
        yearsInBusiness: "",
        annualPurchase: "",
        categoriesInterested:
          data.categoriesInterested?.map((item) => item.value) || [],
        orderItems: productRows
          .filter((row) => row.product && Number(row.quantity) > 0)
          .map((row) => `${row.product.sku || row.product.name}, ${Number(row.quantity)}`)
          .join("\n"),
        message: data.message?.trim() || "",
      };

      const { data: response } = await api.post(
        `${import.meta.env.VITE_API_URL}/api/wholesale/apply`,
        payload,
      );

      toast.success(response.message);

      reset({
        firstName: "",
        lastName: "",
        businessName: "",
        businessType: "",
        email: "",
        whatsapp: "",
        city: "",
        country: null,
        businessAddress: "",
        categoriesInterested: [],
        orderItems: "",
        message: "",
      });
      setProductRows([{ product: null, quantity: "1" }]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const countryOptions = useMemo(
    () =>
      Country.getAllCountries().map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
    [],
  );

  const categoryOptions = [
    { value: "Bath Towels", label: "Bath Towels" },
    { value: "Hand Towels", label: "Hand Towels" },
    { value: "Beach Towels", label: "Beach Towels" },
    { value: "Kitchen Towels", label: "Kitchen Towels" },
    { value: "Bed Linen", label: "Bed Linen" },
    { value: "Cushions", label: "Cushions" },
    { value: "Throws", label: "Throws" },
  ];

  const inputClass = (error) =>
    `h-11 w-full border bg-white px-3.5 text-[13px] text-[#555] outline-none transition placeholder:text-[#a0a0a0] ${
      error ? "border-red-500" : "border-[#e4ddd1] focus:border-[#b8934c]"
    }`;

  return (
    <section id="trade-form" className="bg-[#faf8f4] py-12 md:py-14">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-7">
        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          {/* =====================================================
              LEFT — TRADE APPLICATION
          ===================================================== */}

          <div className="border border-[#e4ddd1] bg-white px-6 py-7 md:px-8 md:py-8">
            <h2
              className="text-[32px] leading-none text-[#1d1d1d] md:text-[35px]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
              }}
            >
              Trade Application
            </h2>

            <p className="mt-2.5 text-[12px] leading-5 text-[#888]">
              Complete the form and our team will contact you within 24 hours.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4">
              {/* First Name / Last Name */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#222]">
                    First Name *
                  </label>

                  <input
                    {...register("firstName")}
                    type="text"
                    placeholder="John"
                    className={inputClass(errors.firstName)}
                  />

                  {errors.firstName && (
                    <p className="mt-1 text-[10px] text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#222]">
                    Last Name *
                  </label>

                  <input
                    {...register("lastName")}
                    type="text"
                    placeholder="Doe"
                    className={inputClass(errors.lastName)}
                  />

                  {errors.lastName && (
                    <p className="mt-1 text-[10px] text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Business Name */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#222]">
                  Business Name *
                </label>

                <input
                  {...register("businessName")}
                  type="text"
                  placeholder="ABC Home Decor"
                  className={inputClass(errors.businessName)}
                />

                {errors.businessName && (
                  <p className="mt-1 text-[10px] text-red-500">
                    {errors.businessName.message}
                  </p>
                )}
              </div>

              {/* Email / WhatsApp */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em]">
                    Email *
                  </label>

                  <input
                    {...register("email")}
                    type="email"
                    placeholder="you@business.com"
                    className={inputClass(errors.email)}
                  />

                  {errors.email && (
                    <p className="mt-1 text-[10px] text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em]">
                    WhatsApp Number *
                  </label>

                  <input
                    {...register("whatsapp")}
                    type="text"
                    placeholder="+91 9876543210"
                    className={inputClass(errors.whatsapp)}
                  />

                  {errors.whatsapp && (
                    <p className="mt-1 text-[10px] text-red-500">
                      {errors.whatsapp.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Business Type */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em]">
                  Business Type *
                </label>

                <Controller
                  control={control}
                  name="businessType"
                  render={({ field }) => (
                    <>
                      <Select
                        {...field}
                        options={businessTypeOptions}
                        placeholder="Select Business Type"
                        isSearchable={false}
                        value={
                          businessTypeOptions.find(
                            (item) => item.value === field.value,
                          ) || null
                        }
                        onChange={(option) =>
                          field.onChange(option?.value || "")
                        }
                        classNamePrefix="trade-select"
                        styles={selectStyles(errors.businessType)}
                      />

                      {errors.businessType && (
                        <p className="mt-1 text-[10px] text-red-500">
                          {errors.businessType.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              {/* Business Address */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em]">
                  Business Address *
                </label>

                <input
                  {...register("businessAddress")}
                  type="text"
                  placeholder="Address"
                  className={inputClass(errors.businessAddress)}
                />

                {errors.businessAddress && (
                  <p className="mt-1 text-[10px] text-red-500">
                    {errors.businessAddress.message}
                  </p>
                )}
              </div>

              {/* City / Country */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em]">
                    City / State
                  </label>

                  <input
                    {...register("city")}
                    type="text"
                    placeholder="New York / California"
                    className={inputClass(errors.city)}
                  />

                  {errors.city && (
                    <p className="mt-1 text-[10px] text-red-500">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em]">
                    Country *
                  </label>

                  <Controller
                    control={control}
                    name="country"
                    render={({ field }) => (
                      <>
                        <Select
                          options={countryOptions}
                          placeholder="Select Country"
                          value={field.value}
                          onChange={field.onChange}
                          isSearchable
                          classNamePrefix="trade-select"
                          styles={selectStyles(errors.country)}
                        />

                        {errors.country && (
                          <p className="mt-1 text-[10px] text-red-500">
                            {errors.country.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em]">
                  Categories Of Interest
                </label>

                <Controller
                  control={control}
                  name="categoriesInterested"
                  render={({ field }) => (
                    <Select
                      isMulti
                      closeMenuOnSelect={false}
                      options={categoryOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select Categories"
                      classNamePrefix="trade-select"
                      styles={selectStyles()}
                    />
                  )}
                />
              </div>

              {/* Product Selection */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#222]">
                  Select Products
                </label>

                <p className="mb-3 text-[11px] leading-5 text-[#888]">
                  Search your products, select a product and enter the required quantity.
                </p>

                <div className="space-y-3">
                  {productRows.map((row, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_100px_36px] sm:items-start"
                    >
                      <Select
                        options={products}
                        value={row.product}
                        onChange={(option) =>
                          updateProductRow(index, "product", option)
                        }
                        isSearchable
                        isClearable
                        isLoading={productsLoading}
                        placeholder={productsLoading ? "Loading products..." : "Search product name or SKU"}
                        noOptionsMessage={() =>
                          productsLoading ? "Loading products..." : "No products found"
                        }
                        classNamePrefix="trade-select"
                        styles={selectStyles()}
                      />

                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={row.quantity}
                        onChange={(event) =>
                          updateProductRow(index, "quantity", event.target.value)
                        }
                        aria-label={`Quantity for product ${index + 1}`}
                        placeholder="Quantity"
                        className="h-11 w-full border border-[#e4ddd1] bg-white px-3 text-[13px] text-[#555] outline-none focus:border-[#b8934c]"
                      />

                      <button
                        type="button"
                        onClick={() => removeProductRow(index)}
                        aria-label={`Remove product ${index + 1}`}
                        title="Remove product"
                        className="flex h-11 w-full items-center justify-center border border-[#e4ddd1] text-[18px] text-[#8b8175] transition hover:border-red-300 hover:text-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addProductRow}
                  className="mt-3 border border-[#b8934c] px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8b6728] transition hover:bg-[#f5f1e9]"
                >
                  + Add Product
                </button>
              </div>

              {/* Message */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em]">
                  Message
                </label>

                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Tell us about your business..."
                  className="w-full resize-none border border-[#e4ddd1] bg-white p-3.5 text-[13px] text-[#555] outline-none transition placeholder:text-[#a0a0a0] focus:border-[#b8934c]"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 bg-[#183324] px-7 text-[9px] font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-[#b8934c] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 items-center bg-[#25D366] px-7 text-[9px] font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-[#1fb85b]"
                >
                  WhatsApp Instead
                </a>
              </div>
            </form>
          </div>

          {/* =====================================================
              RIGHT — BENEFITS
          ===================================================== */}

          <div className="pt-1">
            <h2
              className="text-[32px] leading-[1.05] text-[#1d1d1d] md:text-[36px]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
              }}
            >
              Trade Program{" "}
              <span className="italic text-[#b8934c]">Benefits</span>
            </h2>

            <p className="mt-3 max-w-[520px] text-[12px] leading-6 text-[#777]">
              Join hundreds of retailers, designers and hospitality brands
              sourcing handcrafted luxury collections from His Masterpiece.
            </p>

            {/* Benefits */}
            <div className="mt-6 space-y-2.5">
              {[
                "Original, design-led collections – not available elsewhere",
                "Seasonal collections with pre-order windows",
                "Style Guides and Look Books with every collection",
                "Heirloom quality with reliable production schedules",
                "Long-term reorder availability on all core styles",
                "Dedicated WhatsApp trade support",
                "Exclusive territories available for boutique retailers",
                "Min. order $300.00 | No MOQ on reorders",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#b8934c]" />

                  <p className="text-[11px] leading-5 text-[#555]">{item}</p>
                </div>
              ))}
            </div>

            {/* WhatsApp Card */}
            <div className="mt-7 bg-[#173523] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <MessageCircle className="h-[17px] w-[17px] text-white" />
                </div>

                <div>
                  <p className="text-[10px] text-white/75">
                    Prefer to speak directly? Reach us on WhatsApp
                  </p>

                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-0.5 block text-[20px] font-semibold tracking-[0.02em] text-[#c8a55a] transition hover:text-white"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-5 border border-[#e7dfd2] bg-[#faf8f4] px-5 py-5">
              <p
                className="text-[14px] italic leading-6 text-[#444]"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                }}
              >
                "The collections photograph beautifully in our store and
                customers love the craft stories behind each piece."
              </p>

              <p className="mt-4 text-[9px] uppercase tracking-[0.2em] text-[#8d8d8d]">
                — Trade Partner, New York
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
