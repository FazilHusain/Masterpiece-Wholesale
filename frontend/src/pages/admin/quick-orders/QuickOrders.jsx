import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addQuickOrderAdminNote,
  deleteQuickOrder,
  fetchQuickOrders,
  updateQuickOrderStatus,
} from "../../../redux/quickOrder";

import QuickOrderFilters from "./components/QuickOrderFilters";
import QuickOrderStats from "./components/QuickOrderStats";
import QuickOrderTable from "./QuickOrderTable";
import DeleteQuickOrderModal from "./components/DeleteQuickOrderModal";
import AdminNoteModal from "./components/AdminNoteModal";
import StatusModal from "./components/StatusModal";

const QuickOrders = () => {
  const dispatch = useDispatch();

  const {
    orders = [],
    pagination = {},
    counts = {},
    loading,
  } = useSelector((state) => state.quickOrder);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [statusModal, setStatusModal] = useState(false);

  const [noteModal, setNoteModal] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(fetchQuickOrders());
  }, [dispatch]);

  const handlePageChange = (page) => {
    dispatch(
      fetchQuickOrders({
        page,
      }),
    );
  };

  const handleStatus = (order) => {
    setSelectedOrder(order);
    setStatusModal(true);
  };

  const handleAdminNote = (order) => {
    setSelectedOrder(order);
    setNoteModal(true);
  };

  const handleDelete = (order) => {
    setSelectedOrder(order);
    setDeleteModal(true);
  };

  const handleAdminNoteSave = async (note) => {
    await dispatch(
      addQuickOrderAdminNote({
        id: selectedOrder._id,
        adminNote: note,
      }),
    );

    setNoteModal(false);

    dispatch(fetchQuickOrders());
  };

  const handleDeleteConfirm = async () => {
    await dispatch(deleteQuickOrder(selectedOrder._id));

    setDeleteModal(false);

    dispatch(fetchQuickOrders());
  };

  const handleStatusSave = async (status) => {
    await dispatch(
      updateQuickOrderStatus({
        id: selectedOrder._id,
        status,
      }),
    );

    setStatusModal(false);

    dispatch(fetchQuickOrders());
  };

  if (loading) {
    return <div className="flex justify-center py-20">Loading...</div>;
  }

  return (
    <>
      <div className="space-y-6">
        <QuickOrderStats counts={counts} />

        <QuickOrderFilters />

        <QuickOrderTable
          orders={orders}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
          onStatus={handleStatus}
          onAdminNote={handleAdminNote}
          onDelete={handleDelete}
        />
      </div>

      <StatusModal
        open={statusModal}
        order={selectedOrder}
        onClose={() => setStatusModal(false)}
        onSave={handleStatusSave}
      />

      <AdminNoteModal
        open={noteModal}
        order={selectedOrder}
        onClose={() => setNoteModal(false)}
        onSave={handleAdminNoteSave}
      />

      <DeleteQuickOrderModal
        open={deleteModal}
        order={selectedOrder}
        onClose={() => setDeleteModal(false)}
        onDelete={handleDeleteConfirm}
      />
    </>
  );
};

export default QuickOrders;
