import { Download } from "lucide-react";

const ProductDownloads = ({ downloads }) => {
  if (!downloads?.length) return null;

  return (
    <section className="bg-[#183425] py-14 sm:py-16 lg:py-18">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-8 text-center">
          <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#B68C2F]">
            RESOURCES
          </p>

          <h2 className="mt-3 font-cormorant text-[34px] font-normal leading-tight text-white sm:text-[38px] lg:text-[42px]">
            Downloads
          </h2>
        </div>

        {/* Downloads */}
        <div className="grid gap-3">
          {downloads.map((item) => (
            <a
              key={item._id}
              href={item.file}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between border border-white/15 bg-white/5 px-5 py-4 text-white transition duration-300 hover:border-[#B68C2F] hover:bg-white hover:text-[#183425]"
            >
              <span className="text-[13px] leading-5">
                {item.title}
              </span>

              <Download
                size={17}
                className="shrink-0 text-[#B68C2F] transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductDownloads;