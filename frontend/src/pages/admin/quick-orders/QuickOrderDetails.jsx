import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNoteCard from "./components/AdminNoteCard";
import CustomerInfoCard from "./components/CustomerInfoCard";
import CustomerNotesCard from "./components/CustomerNotesCard";
import OrderInfoCard from "./components/OrderInfoCard";
import OrderStatusCard from "./components/OrderStatusCard";
import QuickOrderItemsCard from "./components/QuickOrderItemsCard";
import TimelineCard from "./components/TimelineCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminNoteModal from "./components/AdminNoteModal";
import StatusModal from "./components/StatusModal";
import DeleteQuickOrderModal from "./components/DeleteQuickOrderModal";

import {
  updateQuickOrderStatus,
  addQuickOrderAdminNote,
  deleteQuickOrder,
  fetchQuickOrder,
} from "../../../redux/quickOrder";

const QuickOrderDetails = () => {
  const [statusModal, setStatusModal] = useState(false);
  const [noteModal, setNoteModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { order, loading } = useSelector((state) => state.quickOrder);

  useEffect(() => {
    console.log("URL PARAM =", id);

    if (!id || id === ":id") {
      console.error("Invalid ID:", id);
      return;
    }

    dispatch(fetchQuickOrder(id));
  }, [dispatch, id]);

  const handleStatusUpdate = async (status) => {
    await dispatch(
      updateQuickOrderStatus({
        id: order._id,
        status,
      }),
    );

    setStatusModal(false);
  };

  const handleAdminNote = async (note) => {
    await dispatch(
      addQuickOrderAdminNote({
        id: order._id,
        adminNote: note,
      }),
    );

    setNoteModal(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteQuickOrder(order._id));

    setDeleteModal(false);

    navigate("/admin/quick-orders");
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#173724] border-t-transparent" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#173724]">
            Order Not Found
          </h2>

          <button
            onClick={() => navigate("/admin/quick-orders")}
            className="mt-5 rounded-lg bg-[#173724] px-6 py-3 text-white"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <CustomerInfoCard order={order} />

          <QuickOrderItemsCard order={order} />

          <CustomerNotesCard order={order} />
        </div>

        <div className="space-y-6 xl:sticky xl:top-6 xl:h-fit">
          <OrderStatusCard
            order={order}
            setStatusModal={setStatusModal}
            setNoteModal={setNoteModal}
            setDeleteModal={setDeleteModal}
          />

          <OrderInfoCard order={order} />

          <AdminNoteCard order={order} />

          <TimelineCard order={order} />
        </div>
      </div>

      <StatusModal
        open={statusModal}
        order={order}
        onClose={() => setStatusModal(false)}
        onSave={handleStatusUpdate}
      />

      <AdminNoteModal
        open={noteModal}
        order={order}
        onClose={() => setNoteModal(false)}
        onSave={handleAdminNote}
      />

      <DeleteQuickOrderModal
        open={deleteModal}
        order={order}
        onClose={() => setDeleteModal(false)}
        onDelete={handleDelete}
      />
    </>
  );
};

export default QuickOrderDetails;
