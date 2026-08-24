import { Filter, X, ChevronDown } from "lucide-react";

const FilterSection = ({ title, options = [], selected = [], onChange }) => {
  if (!options.length) return null;

  return (
    <div className="border-b border-[#E8E2D8] pb-5 last:border-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#183425]">
          {title}
        </h3>

        <ChevronDown
          size={14}
          className="text-[#8B847A]"
        />
      </div>

      <div className="space-y-2.5">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2.5"
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onChange(option)}
              className="h-3.5 w-3.5 cursor-pointer rounded border-[#183425] accent-[#183425]"
            />

            <span className="text-[13px] leading-5 text-[#6B6259] transition hover:text-[#183425]">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

const ProductFilters = ({
  open,
  setOpen,
  filters,
  setFilters,
  collections = [],
  categories = [],
  materials = [],
  colors = [],
}) => {
  const toggleFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  const clearFilters = () => {
    setFilters({
      collections: [],
      categories: [],
      materials: [],
      colors: [],
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Filter Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-full w-[300px] overflow-y-auto
          bg-white px-6 py-6 transition-transform duration-300
          lg:sticky lg:top-24 lg:z-0 lg:h-fit lg:w-full
          lg:translate-x-0 lg:bg-transparent lg:px-0 lg:py-0
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b border-[#E8E2D8] pb-4">
          <div className="flex items-center gap-2.5">
            <Filter
              size={17}
              className="text-[#B68C2F]"
            />

            <h2 className="font-cormorant text-[24px] text-[#183425]">
              Filters
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full p-1.5 text-gray-500 transition hover:bg-gray-100 lg:hidden"
            aria-label="Close filters"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter Sections */}
        <div className="space-y-5">
          <FilterSection
            title="Collections"
            options={collections}
            selected={filters.collections}
            onChange={(value) =>
              toggleFilter("collections", value)
            }
          />

          <FilterSection
            title="Categories"
            options={categories}
            selected={filters.categories}
            onChange={(value) =>
              toggleFilter("categories", value)
            }
          />

          <FilterSection
            title="Materials"
            options={materials}
            selected={filters.materials}
            onChange={(value) =>
              toggleFilter("materials", value)
            }
          />

          <FilterSection
            title="Colors"
            options={colors}
            selected={filters.colors}
            onChange={(value) =>
              toggleFilter("colors", value)
            }
          />
        </div>

        {/* Clear */}
        <div className="mt-7">
          <button
            type="button"
            onClick={clearFilters}
            className="w-full rounded-full border border-[#183425] py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#183425] transition hover:bg-[#183425] hover:text-white"
          >
            Clear All Filters
          </button>
        </div>
      </aside>
    </>
  );
};

export default ProductFilters;