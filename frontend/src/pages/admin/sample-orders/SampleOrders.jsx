import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import { Card, Input, Select, DeleteModal } from "../../../components/ui";
import Pagination from "../../../components/ui/Pagination";

import SampleOrderTable from "./SampleOrderTable";

import {
  fetchSampleOrders,
  deleteSampleOrder,
} from "../../../redux/sampleOrder";

export default function SampleOrders() {
  const dispatch = useDispatch();

  const { orders, loading, pagination } = useSelector(
    (state) => state.sampleOrder
  );

  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchValue.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  // Reset pagination when filters change
  useEffect(() => {
    setPage(1);
  }, [search, status]);

  // Fetch orders
  useEffect(() => {
    dispatch(
      fetchSampleOrders({
        page,
        search,
        status,
      })
    );
  }, [dispatch, page, search, status]);

  const handleDelete = async () => {
    if (!selectedOrder?._id || deleting) return;

    try {
      setDeleting(true);

      await dispatch(
        deleteSampleOrder(selectedOrder._id)
      ).unwrap();

      toast.success("Sample order deleted successfully.");

      setDeleteModal(false);
      setSelectedOrder(null);

      // Refresh current list
      await dispatch(
        fetchSampleOrders({
          page,
          search,
          status,
        })
      ).unwrap();
    } catch (error) {
      toast.error(
        error?.message ||
          error?.data?.message ||
          "Failed to delete sample order."
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleStatusChange = (value) => {
    setStatus(value?.target ? value.target.value : value);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sample Orders"
        subtitle="Manage all sample orders."
      />

      <Card>
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Search by Order No, Customer or Email..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <Select
            value={status}
            onChange={handleStatusChange}
            options={[
              { label: "All Status", value: "" },
              { label: "Pending", value: "Pending" },
              { label: "Approved", value: "Approved" },
              { label: "Rejected", value: "Rejected" },
              { label: "Packed", value: "Packed" },
              { label: "Shipped", value: "Shipped" },
              { label: "Delivered", value: "Delivered" },
            ]}
          />
        </div>

        <SampleOrderTable
          orders={orders || []}
          loading={loading}
          onDelete={(order) => {
            setSelectedOrder(order);
            setDeleteModal(true);
          }}
        />

        {pagination?.totalPages > 1 && (
          <Pagination
            currentPage={pagination.currentPage || 1}
            totalPages={pagination.totalPages || 1}
            onPageChange={setPage}
          />
        )}
      </Card>

      <DeleteModal
        open={deleteModal}
        onClose={() => {
          if (!deleting) {
            setDeleteModal(false);
            setSelectedOrder(null);
          }
        }}
        loading={deleting}
        onConfirm={handleDelete}
        title="Delete Sample Order"
        description="This action cannot be undone."
      />
    </div>
  );
}