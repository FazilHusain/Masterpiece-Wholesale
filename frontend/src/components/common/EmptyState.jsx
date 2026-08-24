import { Inbox } from "lucide-react";

const EmptyState = ({
  title = "No Data Found",
  description = "There is no data available.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-16">

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        <Inbox className="h-10 w-10 text-gray-400" />
      </div>

      <h3 className="mt-5 text-xl font-semibold text-gray-800">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-center text-sm text-gray-500">
        {description}
      </p>

    </div>
  );
};

export default EmptyState;