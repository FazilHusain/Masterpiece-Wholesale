import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../../components/common/PageHeader";
import { Card, Input, Select } from "../../../components/ui";
import { fetchOrders } from "../../../redux/order";

import OrderTable from "./OrderTable";

export default function Orders() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { orders, loading } = useSelector(
    (state) => state.order
  );

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [paymentStatus, setPaymentStatus] =
    useState("");

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const filteredOrders = useMemo(() => {
    return orders.filter((item) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        item.orderNumber
          ?.toLowerCase()
          .includes(keyword) ||
        item.customerName
          ?.toLowerCase()
          .includes(keyword) ||
        item.email
          ?.toLowerCase()
          .includes(keyword);

      const matchesStatus =
        !status || item.status === status;

      const matchesPayment =
        !paymentStatus ||
        item.paymentStatus === paymentStatus;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment
      );
    });
  }, [
    orders,
    search,
    status,
    paymentStatus,
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        subtitle="Manage all customer orders."
      />

      <Card>
        <div className="grid gap-4 lg:grid-cols-3">
          <Input
            placeholder="Search Order..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <Select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            options={[
              {
                label: "All Status",
                value: "",
              },

              {
                label: "Pending",
                value: "pending",
              },

              {
                label: "Confirmed",
                value: "confirmed",
              },

              {
                label: "Processing",
                value: "processing",
              },

              {
                label: "Shipped",
                value: "shipped",
              },

              {
                label: "Delivered",
                value: "delivered",
              },

              {
                label: "Cancelled",
                value: "cancelled",
              },
            ]}
          />

          <Select
            value={paymentStatus}
            onChange={(e) =>
              setPaymentStatus(e.target.value)
            }
            options={[
              {
                label: "All Payments",
                value: "",
              },

              {
                label: "Pending",
                value: "pending",
              },

              {
                label: "Paid",
                value: "paid",
              },

              {
                label: "Failed",
                value: "failed",
              },

              {
                label: "Refunded",
                value: "refunded",
              },
            ]}
          />
        </div>

        <div className="mt-6">
          <OrderTable
            orders={filteredOrders}
            loading={loading}
          />
        </div>
      </Card>
    </div>
  );
}