const ProductVariantTable = ({ variants }) => {
  if (!variants?.length) return null;

  return (
    <div className="overflow-hidden border border-[#E8E2D8]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px]">

          <thead className="bg-[#183425] text-white">
            <tr>
              <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.16em]">
                Size
              </th>

              <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.16em]">
                Dimensions
              </th>

              <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.16em]">
                MOQ
              </th>
            </tr>
          </thead>

          <tbody>
            {variants.map((item) => (
              <tr
                key={item._id}
                className="border-t border-[#E8E2D8] transition hover:bg-[#FAF8F5]"
              >
                <td className="px-4 py-3 text-[13px] font-medium text-[#183425]">
                  {item.size || "-"}
                </td>

                <td className="px-4 py-3 text-[13px] text-[#6B6259]">
                  {item.dimensions || "-"}
                </td>

                <td className="px-4 py-3 text-[13px] text-[#6B6259]">
                  {item.moq || "-"}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ProductVariantTable;