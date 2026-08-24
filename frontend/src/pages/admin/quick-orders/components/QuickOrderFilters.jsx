import { Search, Filter } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { fetchQuickOrders } from "../../../../redux/quickOrder";

const statusOptions = [
  "All",
  "Pending",
  "Confirmed",
  "Processing",
  "Completed",
  "Cancelled",
];

const QuickOrderFilters = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const handleSearch = (e) => {
    e.preventDefault();

    dispatch(
      fetchQuickOrders({
        search,
        status: status === "All" ? "" : status,
        page: 1,
      })
    );
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-xl shadow p-5"
    >
      <div className="grid md:grid-cols-3 gap-4">

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3.5 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search Order / Customer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 rounded-lg border pl-10 pr-3 outline-none focus:border-[#183425]"
          />

        </div>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-11 rounded-lg border px-3 outline-none focus:border-[#183425]"
        >
          {statusOptions.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        {/* Button */}

        <button
          type="submit"
          className="h-11 rounded-lg bg-[#183425] text-white flex items-center justify-center gap-2 hover:bg-[#0f2419]"
        >
          <Filter size={18} />

          Apply Filters
        </button>

      </div>
    </form>
  );
};

export default QuickOrderFilters;