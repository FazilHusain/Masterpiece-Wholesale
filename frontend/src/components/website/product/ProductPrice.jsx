import { useState } from "react";
import { Calculator, X } from "lucide-react";

/*
|--------------------------------------------------------------------------
| Currency Configuration
|--------------------------------------------------------------------------
| Base product price is stored in USD.
|
| These rates are kept in one place so they can easily be changed later
| if the client provides official FX rates.
|
| 1 USD =
| 0.85 EUR
| 0.73 GBP
|--------------------------------------------------------------------------
*/

const CURRENCIES = {
  USD: {
    symbol: "$",
    rate: 1,
    label: "USD ($)",
  },

  EUR: {
    symbol: "€",
    rate: 0.85,
    label: "EUR (€)",
  },

  GBP: {
    symbol: "£",
    rate: 0.73,
    label: "GBP (£)",
  },
};

/*
|--------------------------------------------------------------------------
| Duty Rates
|--------------------------------------------------------------------------
| Current client reference:
| United States = 5%
|
| More countries can be added here later without changing calculator UI.
|--------------------------------------------------------------------------
*/

const DUTY_RATES = {
  "United States": 5,
  Canada: 5,
  "United Kingdom": 5,
  Germany: 5,
  France: 5,
  Australia: 5,
  UAE: 5,
  India: 5,
  Other: 0,
};

const ProductPrice = ({ product }) => {
  const variant = product?.variants?.[0];

  const [currency, setCurrency] = useState("USD");

  const [calculatorOpen, setCalculatorOpen] =
    useState(false);

  const [quantity, setQuantity] = useState(
    Math.max(Number(variant?.moq) || 1, 1),
  );

  const [destination, setDestination] =
    useState("United States");

  if (!variant) return null;

  // =========================================================
  // BASE PRODUCT PRICE
  // =========================================================

  const basePriceUSD = Number(variant.price) || 0;

  const moq = Math.max(Number(variant.moq) || 1, 1);

  const currencyConfig =
    CURRENCIES[currency] || CURRENCIES.USD;

  // =========================================================
  // CONVERT USD → SELECTED CURRENCY
  // =========================================================

  const convertedUnitPrice =
    basePriceUSD * currencyConfig.rate;

  // =========================================================
  // DUTY CALCULATOR
  // =========================================================

  const safeQuantity = Math.max(
    Number(quantity) || 1,
    1,
  );

  const goodsValue =
    convertedUnitPrice * safeQuantity;

  const dutyRate =
    DUTY_RATES[destination] ?? 0;

  const estimatedDuty =
    goodsValue * (dutyRate / 100);

  const totalEstimatedCost =
    goodsValue + estimatedDuty;

  // =========================================================
  // FORMAT MONEY
  // =========================================================

  const formatMoney = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // =========================================================
  // QUANTITY
  // =========================================================

  const handleQuantityChange = (value) => {
    const parsed = Number(value);

    if (!Number.isFinite(parsed) || parsed < 1) {
      setQuantity(1);
      return;
    }

    setQuantity(Math.floor(parsed));
  };

  // =========================================================
  // OPEN CALCULATOR
  // =========================================================

  const openCalculator = () => {
    setQuantity(moq);
    setCurrency("USD");
    setDestination("United States");
    setCalculatorOpen(true);
  };

  return (
    <>
      {/* =====================================================
          STARTING PRICE
      ===================================================== */}

      <div>
        <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#B68C2F]">
          Starting From
        </p>

        <h2 className="mt-2 font-cormorant text-[34px] font-semibold leading-none text-[#183425] sm:text-[38px]">
          ${basePriceUSD.toFixed(2)}
        </h2>

        <p className="mt-2 text-[12px] uppercase tracking-[0.12em] text-[#6B6259]">
          MOQ: {moq} Piece
        </p>

        {/* =====================================================
            EST. SOURCING PRICE
        ===================================================== */}

        <div className="mt-6 border-t border-[#E8E2D8] pt-5">
          <p className="text-[10px] font-medium text-[#6B6259]">
            Est. Sourcing Price
          </p>

          <div className="mt-2 flex items-end gap-2">
            <div className="font-cormorant text-[34px] font-semibold leading-none text-[#183425]">
              {formatMoney(convertedUnitPrice)}
            </div>

            <span className="mb-1 text-[13px] text-[#8B8176]">
              / unit
            </span>
          </div>

          {/* =================================================
              CURRENCY SWITCH
          ================================================= */}

          <div className="mt-4 inline-flex overflow-hidden rounded-md border border-[#DCD5CA] bg-[#F7F4EE]">
            {Object.keys(CURRENCIES).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setCurrency(code)}
                className={`px-4 py-2 text-[11px] font-semibold transition ${
                  currency === code
                    ? "bg-[#183425] text-white"
                    : "text-[#6B6259] hover:bg-white"
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          {/* FX INFO */}

          <p className="mt-2 text-[10px] leading-4 text-[#8B8176]">
            1 USD = {CURRENCIES[currency].rate}{" "}
            {currency}
          </p>
        </div>

        {/* =====================================================
            DUTY & TAX BUTTON
        ===================================================== */}

        <button
          type="button"
          onClick={openCalculator}
          className="mt-6 flex w-full items-center justify-center gap-2 border border-[#183425] bg-[#183425] px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#B68C2F]"
        >
          <Calculator size={15} />

          Duty & Tax Calculator
        </button>
      </div>

      {/* =======================================================
          DUTY & TAX MODAL
      ======================================================= */}

      {calculatorOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-[2px]"
          onClick={() => setCalculatorOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-[500px] overflow-y-auto bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* =================================================
                CLOSE
            ================================================= */}

            <button
              type="button"
              onClick={() => setCalculatorOpen(false)}
              aria-label="Close calculator"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center text-[#6B6259] transition hover:bg-[#F5F1E8] hover:text-[#183425]"
            >
              <X size={19} />
            </button>

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="pr-10">
              <div className="flex items-center gap-2">
                <Calculator
                  size={18}
                  className="text-[#B68C2F]"
                />

                <h3 className="font-cormorant text-[28px] text-[#183425]">
                  Duty & Tax Calculator
                </h3>
              </div>

              <p className="mt-2 text-[13px] leading-5 text-[#8B8176]">
                Estimate import duties based on destination,
                quantity and product value.
              </p>
            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <div className="mt-7 space-y-5">
              {/* =================================================
                  QUANTITY + CURRENCY
              ================================================= */}

              <div className="grid gap-4 sm:grid-cols-2">
                {/* QUANTITY */}

                <div>
                  <label
                    htmlFor="duty-quantity"
                    className="mb-2 block text-[13px] font-medium text-[#4E4842]"
                  >
                    Quantity
                  </label>

                  <input
                    id="duty-quantity"
                    type="number"
                    min={1}
                    step={1}
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        e.target.value,
                      )
                    }
                    className="w-full border border-[#DCD5CA] bg-white px-4 py-3 text-[14px] text-[#183425] outline-none transition focus:border-[#B68C2F]"
                  />
                </div>

                {/* CURRENCY */}

                <div>
                  <label
                    htmlFor="duty-currency"
                    className="mb-2 block text-[13px] font-medium text-[#4E4842]"
                  >
                    Currency
                  </label>

                  <select
                    id="duty-currency"
                    value={currency}
                    onChange={(e) =>
                      setCurrency(e.target.value)
                    }
                    className="w-full border border-[#DCD5CA] bg-white px-4 py-3 text-[14px] text-[#183425] outline-none focus:border-[#B68C2F]"
                  >
                    {Object.entries(CURRENCIES).map(
                      ([code, config]) => (
                        <option
                          key={code}
                          value={code}
                        >
                          {config.label}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              </div>

              {/* =================================================
                  DESTINATION
              ================================================= */}

              <div>
                <label
                  htmlFor="duty-country"
                  className="mb-2 block text-[13px] font-medium text-[#4E4842]"
                >
                  Destination Country
                </label>

                <select
                  id="duty-country"
                  value={destination}
                  onChange={(e) =>
                    setDestination(e.target.value)
                  }
                  className="w-full border border-[#DCD5CA] bg-white px-4 py-3 text-[14px] text-[#183425] outline-none focus:border-[#B68C2F]"
                >
                  <option value="United States">
                    United States (Est. 5% Duty)
                  </option>

                  <option value="Canada">
                    Canada (Est. 5% Duty)
                  </option>

                  <option value="United Kingdom">
                    United Kingdom (Est. 5% Duty)
                  </option>

                  <option value="Germany">
                    Germany (Est. 5% Duty)
                  </option>

                  <option value="France">
                    France (Est. 5% Duty)
                  </option>

                  <option value="Australia">
                    Australia (Est. 5% Duty)
                  </option>

                  <option value="UAE">
                    UAE (Est. 5% Duty)
                  </option>

                  <option value="India">
                    India (Est. 5% Duty)
                  </option>

                  <option value="Other">
                    Other Country
                  </option>
                </select>
              </div>

              {/* =================================================
                  CALCULATION RESULT
              ================================================= */}

              <div className="rounded-xl border border-[#DCE3EA] bg-[#F7FAFC] p-5">
                {/* GOODS VALUE */}

                <div className="flex items-center justify-between gap-4">
                  <span className="text-[13px] text-[#718096]">
                    Total Goods Value
                  </span>

                  <span className="text-[14px] font-medium text-[#40506A]">
                    {formatMoney(goodsValue)}
                  </span>
                </div>

                {/* DUTY */}

                <div className="mt-4 flex items-center justify-between gap-4">
                  <span className="text-[13px] text-[#718096]">
                    Estimated Duty ({dutyRate}%)
                  </span>

                  <span className="text-[14px] font-medium text-[#40506A]">
                    {formatMoney(estimatedDuty)}
                  </span>
                </div>

                {/* DIVIDER */}

                <div className="my-4 h-px bg-[#E2E8F0]" />

                {/* TOTAL */}

                <div className="flex items-center justify-between gap-4">
                  <span className="text-[15px] font-semibold text-[#243247]">
                    Total Estimated Cost
                  </span>

                  <span className="text-[18px] font-bold text-[#1D55D9]">
                    {formatMoney(totalEstimatedCost)}
                  </span>
                </div>
              </div>

              {/* =================================================
                  NOTE
              ================================================= */}

              <p className="text-center text-[11px] leading-5 text-[#718096]">
                * This is an estimate. Final duties are assessed
                by customs at the border based on applicable HS
                codes and shipping costs.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPrice;