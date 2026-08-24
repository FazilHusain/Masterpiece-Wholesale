import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageHeader from "../../../components/common/PageHeader";
import { Card, Input, Select } from "../../../components/ui";

import SampleOrderTable from "./SampleOrderTable";
import Pagination from "../../../components/ui/Pagination";
import { DeleteModal } from "../../../components/ui";

import {
  fetchSampleOrders,
  deleteSampleOrder,
} from "../../../redux/sampleOrder";
import toast from "react-hot-toast";

export default function SampleOrders() {
  const dispatch = useDispatch();

  const { orders, loading, pagination } = useSelector(
    (state) => state.sampleOrder,
  );
  console.log("ORDERS FROM REDUX:", orders);
  console.log("PAGINATION:", pagination);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const [searchValue, setSearchValue] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    dispatch(
      fetchSampleOrders({
        page,
        search,
        status,
      }),
    )
      .unwrap()
      .then((response) => {
        console.log("SAMPLE ORDERS API RESPONSE:", response);
      })
      .catch((error) => {
        console.error("SAMPLE ORDERS API ERROR:", error);
      });
  }, [dispatch, page, search, status]);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const handleDelete = async () => {
    if (!selectedOrder) return;

    try {
      await dispatch(deleteSampleOrder(selectedOrder._id)).unwrap();

      toast.success("Sample order deleted successfully.");

      setDeleteModal(false);
      setSelectedOrder(null);

      dispatch(
        fetchSampleOrders({
          page,
          search,
          status,
        }),
      );
    } catch (error) {
      toast.error(error?.message || "Failed to delete sample order.");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Sample Orders" subtitle="Manage all sample orders." />

      <Card>
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Search by Order No, Customer, Product or Email..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              {
                label: "All Status",
                value: "",
              },
              {
                label: "Pending",
                value: "Pending",
              },
              {
                label: "Approved",
                value: "Approved",
              },
              {
                label: "Rejected",
                value: "Rejected",
              },
              {
                label: "Packed",
                value: "Packed",
              },
              {
                label: "Shipped",
                value: "Shipped",
              },
              {
                label: "Delivered",
                value: "Delivered",
              },
            ]}
          />
        </div>

        <SampleOrderTable
          orders={orders}
          loading={loading}
          onDelete={(row) => {
            setSelectedOrder(row);

            setDeleteModal(true);
          }}
        />
        {pagination?.totalPages > 1 && (
          <Pagination
            currentPage={pagination?.currentPage || 1}
            totalPages={pagination?.totalPages || 1}
            onPageChange={setPage}
          />
        )}
      </Card>
      <DeleteModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        loading={loading}
        onConfirm={handleDelete}
        title="Delete Sample Order"
        description="This action cannot be undone."
      />
    </div>
  );
}
