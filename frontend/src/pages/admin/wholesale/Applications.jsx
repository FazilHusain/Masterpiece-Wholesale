import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Filters from "./components/Filters";
import ApplicationsTable from "./components/ApplicationsTable";
import LoadingSkeleton from "./components/LoadingSkeleton";
import EmptyState from "./components/EmptyState";
import DataTableToolbar from "./components/DataTableToolbar";
import PageHeader from "./components/PageHeader";
import StatsCards from "./components/StatsCards";

import { fetchWholesaleInquiries, deleteWholesaleInquiry } from "../../../redux/wholesale/wholesaleThunk";

export default function Applications() {
  const dispatch = useDispatch();

  const { inquiries, loading, pagination } = useSelector(
    (state) => state.wholesale
  );

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    dispatch(
      fetchWholesaleInquiries({
        page,
        search,
        status,
      })
    );
  }, [dispatch, page, search, status]);

  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setPage(1);
  };

  const toggleSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === inquiries.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(inquiries.map((item) => item._id));
    }
  };

  const handleRefresh = () => {
    dispatch(
      fetchWholesaleInquiries({
        page,
        search,
        status,
      })
    );
  };

  const handleBulkDelete = async () => {
    if (!selectedRows.length) return;

    if (!window.confirm("Delete selected applications?")) {
      return;
    }

    await Promise.all(
      selectedRows.map((id) =>
        dispatch(deleteWholesaleInquiry(id))
      )
    );

    setSelectedRows([]);

    handleRefresh();
  };

  const handleExport = () => {
    if (!inquiries.length) return;

    const rows = inquiries.map((item) => ({
      Application: item.applicationNumber,
      Name: `${item.firstName} ${item.lastName}`,
      Business: item.businessName,
      Country: item.country,
      Status: item.status,
      Email: item.email,
      Phone: item.whatsapp,
    }));

    const csv = [
      Object.keys(rows[0]).join(","),
      ...rows.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "wholesale-applications.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">

      <PageHeader total={pagination.total || 0} />

      <StatsCards applications={inquiries} />

      <Filters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onReset={resetFilters}
      />

      <DataTableToolbar
        selectedRows={selectedRows}
        loading={loading}
        onRefresh={handleRefresh}
        onExport={handleExport}
        onDelete={handleBulkDelete}
      />

      {loading ? (
        <LoadingSkeleton />
      ) : inquiries.length === 0 ? (
        <EmptyState />
      ) : (
        <ApplicationsTable
          applications={inquiries}
          selectedRows={selectedRows}
          toggleSelection={toggleSelection}
          toggleSelectAll={toggleSelectAll}
        />
      )}

      {pagination.totalPages > 1 && (
        <div className="flex justify-end gap-2">

          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="rounded-lg border px-4 py-2 disabled:opacity-50"
          >
            Previous
          </button>

          <button
            disabled={page === pagination.totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="rounded-lg border px-4 py-2 disabled:opacity-50"
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
}