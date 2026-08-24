import { Download } from "lucide-react";

import { Button } from "../../../../../components/ui";
import DetailCard from "../../../../../components/common/DetailCard";

export default function DownloadCard({
  product,
}) {
  const downloads = product?.downloads || [];

  return (
    <DetailCard
      title="Downloads"
      subtitle="Catalogues, brochures and product documents."
    >
      {!downloads.length ? (
        <div className="rounded-xl border border-dashed border-[#E8E2D9] py-12 text-center text-gray-400">
          No downloadable files available.
        </div>
      ) : (
        <div className="space-y-4">
          {downloads.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-5 rounded-2xl border border-[#E8E2D9] p-5 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="font-semibold text-[#12312B]">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500 break-all">
                  {item.file}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Display Order : {item.sortOrder ?? 0}
                </p>
              </div>

              <Button
                as="a"
                href={item.file}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={18} />

                Download
              </Button>
            </div>
          ))}
        </div>
      )}
    </DetailCard>
  );
}