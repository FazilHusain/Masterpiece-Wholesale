import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

export default function TableRow({
  item,
  checked,
  onCheck,
}) {
  return (
    <tr className="border-b hover:bg-gray-50">

      <td className="px-4 py-4">

        <input
          type="checkbox"
          checked={checked}
          onChange={() =>
            onCheck(item._id)
          }
        />

      </td>

      <td className="px-4 py-4">

        <div className="font-semibold">
          {item.applicationNumber}
        </div>

        <div className="text-xs text-gray-500">
          {item.firstName} {item.lastName}
        </div>

      </td>

      <td className="px-4 py-4">

        {item.businessName}

      </td>

      <td className="px-4 py-4">

        {item.country}

      </td>

      <td className="px-4 py-4">

        <StatusBadge
          status={item.status}
        />

      </td>

      <td className="px-4 py-4">

        {new Date(
          item.createdAt
        ).toLocaleDateString()}

      </td>

      <td className="px-4 py-4 text-center">

        <Link
          to={`/admin/wholesale/${item._id}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-gray-100"
        >
          <Eye size={18} />
        </Link>

      </td>

    </tr>
  );
}