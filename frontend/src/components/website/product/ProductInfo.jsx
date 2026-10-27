import { useEffect, useMemo, useState } from "react";

import ProductVariantTable from "./ProductVariantTable";
import ProductActions from "./ProductActions";
import ProductBadge from "./ProductBadge";
import ShareProduct from "./ShareProduct";

/* =========================
   CALCULATOR CONFIG
========================= */

const FX_RATES = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.74,
};

const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};

const DUTY_RATES = {
  "United States": {
    duty: 5,
    tax: 0,
  },
  "United Kingdom": {
    duty: 12,
    tax: 20,
  },
  Germany: {
    duty: 12,
    tax: 19,
  },
  France: {
    duty: 12,
    tax: 20,
  },
  Canada: {
    duty: 10,
    tax: 5,
  },
  Australia: {
    duty: 5,
    tax: 10,
  },
  UAE: {
    duty: 5,
    tax: 5,
  },
  India: {
    duty: 10,
    tax: 18,
  },
};

const ProductInfo = ({ product }) => {
  /* =========================
     PRODUCT VARIANT
  ========================= */

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  /* =========================
     CALCULATOR MODALS
  ========================= */

  const [showSourcingCalculator, setShowSourcingCalculator] = useState(false);

  const [showDutyCalculator, setShowDutyCalculator] = useState(false);

  /* =========================
     SOURCING CALCULATOR
  ========================= */

  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [sourceQuantity, setSourceQuantity] = useState(1);

  /* =========================
     DUTY CALCULATOR
  ========================= */

  const [destination, setDestination] = useState("Australia");
  const [dutyCurrency, setDutyCurrency] = useState("USD");
  const [goodsValue, setGoodsValue] = useState("");
  const [dutyQuantity, setDutyQuantity] = useState(1);

  /* =========================
     DEFAULT VARIANT
  ========================= */

  useEffect(() => {
    if (!product?.variants?.length) {
      setSelectedVariant(null);
      setQuantity(1);
      return;
    }

    const firstActiveVariant =
      product.variants.find((item) => item.isActive !== false) ||
      product.variants[0];

    setSelectedVariant(firstActiveVariant);

    const moq = Math.max(1, Number(firstActiveVariant?.moq) || 1);

    setQuantity(moq);
    setDutyQuantity(moq);
  }, [product]);

  /* =========================
     VARIANT SELECT
  ========================= */

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);

    const moq = Math.max(1, Number(variant?.moq) || 1);

    setQuantity(moq);
    setDutyQuantity(moq);
  };

  /* =========================
     QUANTITY
  ========================= */

  const minimumQuantity = Math.max(1, Number(selectedVariant?.moq) || 1);

  const handleQuantityChange = (value) => {
    const nextQuantity = Number(value);

    if (!Number.isFinite(nextQuantity)) return;

    setQuantity(Math.max(minimumQuantity, nextQuantity));
  };

  /* =========================
     SELECTED PRICE
  ========================= */

  const unitPrice = Number(selectedVariant?.price || 0);

  const totalPrice = unitPrice * quantity;

  /* =========================
     SOURCING CALCULATION
  ========================= */

  const sourcingCalculation = useMemo(() => {
    const qty = Math.max(1, Number(sourceQuantity) || 1);

    const rate = FX_RATES[sourceCurrency] || 1;

    const convertedUnitPrice = unitPrice * rate;

    const convertedTotal = convertedUnitPrice * qty;

    return {
      unitPrice: convertedUnitPrice,
      totalPrice: convertedTotal,
      quantity: qty,
    };
  }, [unitPrice, sourceCurrency, sourceQuantity]);

  /* =========================
     DUTY CALCULATION
  ========================= */

  const dutyCalculation = useMemo(() => {
    const qty = Math.max(1, Number(dutyQuantity) || 1);

    const rate = FX_RATES[dutyCurrency] || 1;

    const unitPriceInCurrency = unitPrice * rate;

    const value = unitPriceInCurrency * qty;

    const rates = DUTY_RATES[destination] || {
      duty: 0,
      tax: 0,
    };

    const dutyAmount = (value * rates.duty) / 100;

    const taxableAmount = value + dutyAmount;

    const taxAmount = (taxableAmount * rates.tax) / 100;

    const totalImportCost = value + dutyAmount + taxAmount;

    return {
      quantity: qty,
      unitPrice: unitPriceInCurrency,
      goodsValue: value,
      dutyRate: rates.duty,
      taxRate: rates.tax,
      dutyAmount,
      taxAmount,
      totalImportCost,
    };
  }, [unitPrice, dutyCurrency, destination, dutyQuantity]);

  /* =========================
     OPEN DUTY CALCULATOR
  ========================= */

  const openDutyCalculator = () => {
    setDutyQuantity(quantity);

    const rate = FX_RATES[dutyCurrency] || 1;
    const calculatedValue = totalPrice * rate;

    setGoodsValue(calculatedValue > 0 ? calculatedValue.toFixed(2) : "");

    setShowDutyCalculator(true);
  };

  return (
    <>
      <div className="flex flex-col">
        {/* Collection */}
        {product.collection?.name && (
          <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#B68C2F]">
            {product.collection.name}
          </p>
        )}

        {/* Title */}
        <h1 className="mt-3 max-w-2xl font-cormorant text-[42px] font-normal leading-[1.02] text-[#183425] sm:text-[48px] lg:text-[56px]">
          {product.name}
        </h1>

        {/* Badges + Share */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <ProductBadge product={product} />

          <div className="ml-1">
            <ShareProduct />
          </div>
        </div>

        {/* Description */}
        {product.shortDescription && (
          <p className="mt-6 max-w-xl text-[14px] leading-7 text-[#6B6259] sm:text-[15px]">
            {product.shortDescription}
          </p>
        )}

        {/* =========================
            SELECTED PRICE
        ========================= */}

        <div className="mt-7 border-t border-[#E8E2D8] pt-6">
          <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#B68C2F]">
            {selectedVariant ? "Selected Price" : "Starting From"}
          </p>

          <h2 className="mt-2 font-cormorant text-[34px] font-semibold leading-none text-[#183425] sm:text-[38px]">
            ${unitPrice.toFixed(2)}
          </h2>

          {selectedVariant && (
            <p className="mt-2 text-[12px] uppercase tracking-[0.12em] text-[#6B6259]">
              {selectedVariant.size || "Selected Variant"} · MOQ:{" "}
              {minimumQuantity} Piece
            </p>
          )}
        </div>

        {/* =========================
            VARIANTS
        ========================= */}

        {product.variants?.length > 0 && (
          <div className="mt-7">
            <ProductVariantTable
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelect={handleVariantSelect}
            />
          </div>
        )}

        {/* =========================
            QUANTITY + TOTAL
        ========================= */}

        {selectedVariant && (
          <div className="mt-7 border-y border-[#E8E2D8] py-5">
            <div className="flex items-center justify-between gap-5">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#183425]">
                  Quantity
                </p>

                <p className="mt-1 text-[11px] text-[#8B8176]">
                  Minimum {minimumQuantity} piece
                  {minimumQuantity > 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex h-10 items-center border border-[#DDD5C9] bg-white">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= minimumQuantity}
                  className="flex h-full w-10 items-center justify-center text-[16px] text-[#183425] transition hover:bg-[#FAF8F4] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  −
                </button>

                <input
                  type="number"
                  min={minimumQuantity}
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  className="h-full w-14 border-x border-[#DDD5C9] bg-white text-center text-[13px] text-[#183425] outline-none"
                />

                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="flex h-full w-10 items-center justify-center text-[16px] text-[#183425] transition hover:bg-[#FAF8F4]"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-5 flex items-end justify-between gap-5">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B8176]">
                  Sample Total
                </p>

                <p className="mt-1 text-[11px] text-[#6B6259]">
                  ${unitPrice.toFixed(2)} × {quantity} piece
                  {quantity > 1 ? "s" : ""}
                </p>
              </div>

              <p className="font-cormorant text-[30px] font-semibold leading-none text-[#183425]">
                ${totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {/* =========================
            CALCULATORS
        ========================= */}

        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Sourcing Calculator */}
          <button
            type="button"
            onClick={() => {
              setSourceQuantity(quantity);
              setShowSourcingCalculator(true);
            }}
            className="flex h-12 items-center justify-center border border-[#183425] bg-[#183425] px-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#10271B]"
          >
            ▦ &nbsp; Sourcing Price Calculator
          </button>

          {/* Duty Calculator */}
          <button
            type="button"
            onClick={openDutyCalculator}
            className="flex h-12 items-center justify-center border border-[#183425] bg-white px-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#183425] transition hover:bg-[#FAF8F4]"
          >
            ▦ &nbsp; Duty & Tax Calculator
          </button>
        </div>

        {/* =========================
            KEY INFORMATION
        ========================= */}

        <div className="mt-7 border-y border-[#E8E2D8]">
          <Info title="Material" value={product.material} />
          <Info title="HS Code" value={product.hsCode} />
          <Info title="Pattern" value={product.pattern} />
          <Info title="Origin" value={product.countryOfOrigin} />
          <Info title="Lead Time" value={product.leadTime} />
        </div>

        {/* =========================
            ACTIONS
        ========================= */}

        <div className="mt-7">
          <ProductActions
            product={product}
            selectedVariant={selectedVariant}
            quantity={quantity}
            totalPrice={totalPrice}
          />
        </div>

        {/* Reassurance */}
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.16em] text-[#8B8176]">
          <span>Premium Quality</span>
          <span>Export Ready</span>
          <span>Made in India</span>
        </div>
      </div>

      {/* =====================================================
          SOURCING PRICE MODAL
      ===================================================== */}

      {showSourcingCalculator && (
        <CalculatorModal
          title="Sourcing Price Calculator"
          subtitle="Estimate your product sourcing cost by currency and quantity."
          onClose={() => setShowSourcingCalculator(false)}
        >
          <div className="grid grid-cols-3 gap-2">
            {["USD", "EUR", "GBP"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSourceCurrency(item)}
                className={`h-11 border text-[10px] font-semibold uppercase tracking-[0.15em] transition ${
                  sourceCurrency === item
                    ? "border-[#183425] bg-[#183425] text-white"
                    : "border-[#DDD5C9] bg-white text-[#6B6259] hover:border-[#183425]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <CalculatorField label="Quantity">
            <input
              type="number"
              min="1"
              value={sourceQuantity}
              onChange={(e) => setSourceQuantity(e.target.value)}
              className="h-12 w-full border border-[#DDD5C9] bg-white px-4 text-[13px] text-[#183425] outline-none focus:border-[#183425]"
            />
          </CalculatorField>

          <CalculatorResult>
            <ResultRow
              label="Estimated Unit Price"
              value={`${
                CURRENCY_SYMBOLS[sourceCurrency]
              }${sourcingCalculation.unitPrice.toFixed(2)}`}
            />

            <ResultRow label="Quantity" value={sourcingCalculation.quantity} />

            <div className="mt-4 border-t border-[#E8E2D8] pt-4">
              <ResultRow
                label="Estimated Total"
                value={`${
                  CURRENCY_SYMBOLS[sourceCurrency]
                }${sourcingCalculation.totalPrice.toFixed(2)}`}
                large
              />
            </div>
          </CalculatorResult>

          <p className="mt-4 text-[9px] leading-4 text-[#8B8176]">
            Indicative sourcing estimate. Final pricing may vary based on
            quantity, selected variant, shipping and commercial terms.
          </p>
        </CalculatorModal>
      )}

      {/* =====================================================
          DUTY & TAX MODAL
      ===================================================== */}

      {showDutyCalculator && (
        <CalculatorModal
          title="Duty & Tax Calculator"
          subtitle="Estimate import duties based on destination, quantity and product value."
          onClose={() => setShowDutyCalculator(false)}
        >
          {/* Quantity + Currency */}
          <div className="grid grid-cols-2 gap-4">
            <CalculatorField label="Quantity">
              <input
                type="number"
                min="1"
                value={dutyQuantity}
                onChange={(e) => setDutyQuantity(e.target.value)}
                className="h-12 w-full border border-[#DDD5C9] bg-white px-4 text-[13px] text-[#183425] outline-none focus:border-[#183425]"
              />
            </CalculatorField>

            <CalculatorField label="Currency">
              <select
                value={dutyCurrency}
                onChange={(e) => setDutyCurrency(e.target.value)}
                className="h-12 w-full border border-[#DDD5C9] bg-white px-4 text-[13px] text-[#183425] outline-none focus:border-[#183425]"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </CalculatorField>
          </div>

          {/* Destination */}
          <CalculatorField label="Destination Country">
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="h-12 w-full border border-[#DDD5C9] bg-white px-4 text-[13px] text-[#183425] outline-none focus:border-[#183425]"
            >
              {Object.entries(DUTY_RATES).map(([country, rates]) => (
                <option key={country} value={country}>
                  {country} (Est. {rates.duty}% Duty)
                </option>
              ))}
            </select>
          </CalculatorField>

          {/* HS Code */}
          <CalculatorField label="HS Code">
            <div className="flex h-12 items-center border border-[#DDD5C9] bg-[#FAF8F4] px-4 text-[13px] text-[#183425]">
              {product.hsCode || "Not assigned"}
            </div>
          </CalculatorField>

          {/* Goods Value */}
          <CalculatorField label={`Goods Value (${dutyCurrency})`}>
            <input
              type="number"
              min="0"
              value={goodsValue}
              onChange={(e) => setGoodsValue(e.target.value)}
              placeholder="Enter goods value"
              className="h-12 w-full border border-[#DDD5C9] bg-white px-4 text-[13px] text-[#183425] outline-none focus:border-[#183425]"
            />
          </CalculatorField>

          {/* Results */}
          <CalculatorResult>
            <ResultRow
              label="Total Goods Value"
              value={`${
                CURRENCY_SYMBOLS[dutyCurrency]
              }${dutyCalculation.goodsValue.toFixed(2)}`}
            />

            <ResultRow
              label={`Estimated Duty (${dutyCalculation.dutyRate}%)`}
              value={`${
                CURRENCY_SYMBOLS[dutyCurrency]
              }${dutyCalculation.dutyAmount.toFixed(2)}`}
            />

            <ResultRow
              label={`Estimated Tax (${dutyCalculation.taxRate}%)`}
              value={`${
                CURRENCY_SYMBOLS[dutyCurrency]
              }${dutyCalculation.taxAmount.toFixed(2)}`}
            />

            <div className="mt-4 border-t border-[#E8E2D8] pt-4">
              <ResultRow
                label="Total Estimated Cost"
                value={`${
                  CURRENCY_SYMBOLS[dutyCurrency]
                }${dutyCalculation.totalImportCost.toFixed(2)}`}
                large
              />
            </div>
          </CalculatorResult>

          <p className="mt-4 text-[9px] leading-4 text-[#8B8176]">
            This is an estimate. Final duties are assessed by customs at the
            border based on applicable HS codes, origin, valuation and shipping
            costs.
          </p>
        </CalculatorModal>
      )}
    </>
  );
};

/* =========================================================
   INFO
========================================================= */

const Info = ({ title, value }) => {
  if (!value) return null;

  return (
    <div className="flex items-center justify-between gap-6 border-b border-[#EEEAE3] py-4 last:border-b-0">
      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#183425]">
        {title}
      </span>

      <span className="max-w-[65%] text-right text-[13px] leading-5 text-[#6B6259]">
        {value}
      </span>
    </div>
  );
};

/* =========================================================
   CALCULATOR MODAL
========================================================= */

const CalculatorModal = ({ title, subtitle, onClose, children }) => {
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-[500px] overflow-y-auto bg-white p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center text-[22px] text-[#6B6259] transition hover:text-[#183425]"
          aria-label="Close calculator"
        >
          ×
        </button>

        {/* Header */}
        <div className="pr-8">
          <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#B68C2F]">
            International Trade
          </p>

          <h2 className="mt-2 font-cormorant text-[30px] leading-tight text-[#183425]">
            {title}
          </h2>

          <p className="mt-2 text-[12px] leading-5 text-[#6B6259]">
            {subtitle}
          </p>
        </div>

        <div className="mt-6 space-y-5">{children}</div>
      </div>
    </div>
  );
};

/* =========================================================
   FIELD
========================================================= */

const CalculatorField = ({ label, children }) => {
  return (
    <div>
      <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-[#183425]">
        {label}
      </label>

      {children}
    </div>
  );
};

/* =========================================================
   RESULT BOX
========================================================= */

const CalculatorResult = ({ children }) => {
  return (
    <div className="border border-[#DCE3E8] bg-[#F7FAFC] p-5">{children}</div>
  );
};

/* =========================================================
   RESULT ROW
========================================================= */

const ResultRow = ({ label, value, large = false }) => {
  return (
    <div className="flex items-center justify-between gap-5">
      <span
        className={`${
          large
            ? "text-[10px] font-semibold uppercase tracking-[0.15em] text-[#183425]"
            : "text-[10px] uppercase tracking-[0.12em] text-[#6B6259]"
        }`}
      >
        {label}
      </span>

      <span
        className={`${
          large
            ? "font-cormorant text-[27px] font-semibold text-[#183425]"
            : "text-[14px] font-medium text-[#183425]"
        }`}
      >
        {value}
      </span>
    </div>
  );
};

export default ProductInfo;
