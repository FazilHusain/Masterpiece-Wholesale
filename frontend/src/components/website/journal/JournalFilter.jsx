import { JOURNAL_CATEGORIES } from "./journalCategories";

export default function JournalFilter({
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <section className="bg-[#FAF8F5] py-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="flex items-center justify-center">

          <div className="flex max-w-full gap-2 overflow-x-auto pb-1 scrollbar-hide">

            {JOURNAL_CATEGORIES.map((category) => {
              const active = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  className={`whitespace-nowrap border px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                    active
                      ? "border-[#183425] bg-[#183425] text-white"
                      : "border-[#DED8CF] bg-white text-[#5E5A54] hover:border-[#B68C2F] hover:text-[#B68C2F]"
                  }`}
                >
                  {category}
                </button>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}