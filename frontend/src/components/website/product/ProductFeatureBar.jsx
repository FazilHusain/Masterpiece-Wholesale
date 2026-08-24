import {
  ShieldCheck,
  Truck,
  BadgeCheck,
  Package,
} from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Premium Quality",
  },
  {
    icon: Truck,
    title: "Worldwide Export",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Manufacturer",
  },
  {
    icon: Package,
    title: "Custom Packaging",
  },
];

const ProductFeatureBar = () => {
  return (
    <section className="border-y bg-[#FAF8F5]">

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-2 xl:grid-cols-4">

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-5"
            >

              <div className="rounded-full bg-[#183425] p-4 text-white">

                <Icon size={24} />

              </div>

              <div>

                <h3 className="font-semibold text-[#183425]">
                  {item.title}
                </h3>

              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductFeatureBar;