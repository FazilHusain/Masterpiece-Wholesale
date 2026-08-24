import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageHeader from "../../../components/common/PageHeader";
import { DeleteModal, Loader } from "../../../components/ui";

import HeroCard from "./components/details/HeroCard";
import CustomerCard from "./components/details/CustomerCard";
import ProductCard from "./components/details/ProductCard";
import ShippingCard from "./components/details/ShippingCard";
import NotesCard from "./components/details/NotesCard";
import TimelineCard from "./components/details/TimelineCard";
import SystemCard from "./components/details/SystemCard";

import { fetchSampleOrder } from "../../../redux/sampleOrder";
import { clearSampleOrder } from "../../../redux/sampleOrder/sampleOrderSlice";

import StatusDrawer from "./drawers/StatusDrawer";
import AdminNoteDrawer from "./drawers/AdminNoteDrawer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  updateSampleStatus,
  addAdminNote,
  deleteSampleOrder,
} from "../../../redux/sampleOrder";

import { useState } from "react";

export default function SampleOrderDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { order, loading } = useSelector((state) => state.sampleOrder);

  const [statusDrawer, setStatusDrawer] = useState(false);

  const [noteDrawer, setNoteDrawer] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  const [status, setStatus] = useState(order?.status || "");

  useEffect(() => {
    dispatch(fetchSampleOrder(id));

    return () => {
      dispatch(clearSampleOrder());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  const handleStatus = async () => {
    try {
      await dispatch(
        updateSampleStatus({
          id,
          status,
        }),
      ).unwrap();

      // Get latest updated order
      await dispatch(fetchSampleOrder(id)).unwrap();

      toast.success("Status updated.");

      setStatusDrawer(false);
    } catch (error) {
      toast.error(error?.message || "Failed to update status.");
    }
  };

  const handleAdminNote = async (note) => {
    try {
      await dispatch(
        addAdminNote({
          id,
          adminNote: note,
        }),
      ).unwrap();

      // Get latest updated order
      await dispatch(fetchSampleOrder(id)).unwrap();

      toast.success("Admin note updated.");

      setNoteDrawer(false);
    } catch (error) {
      toast.error(error?.message || "Failed to update note.");
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteSampleOrder(id)).unwrap();

      toast.success("Sample order deleted.");

      navigate("/admin/sample-orders");
    } catch (error) {
      toast.error(error?.message || "Delete failed.");
    }
  };

  if (loading && !order) {
    return <Loader />;
  }

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Sample Order Details"
          subtitle="View complete sample order information."
        />

        <HeroCard
          order={order}
          onStatus={() => setStatusDrawer(true)}
          onNote={() => setNoteDrawer(true)}
          onDelete={() => setDeleteModal(true)}
        />

        <CustomerCard order={order} />

        <ProductCard order={order} />

        <ShippingCard order={order} />

        <NotesCard order={order} />

        <TimelineCard order={order} />

        <SystemCard order={order} />

        <StatusDrawer
          open={statusDrawer}
          onClose={() => setStatusDrawer(false)}
          value={order?.status}
          onChange={setStatus}
          onSave={handleStatus}
          loading={loading}
        />

        <AdminNoteDrawer
          open={noteDrawer}
          onClose={() => setNoteDrawer(false)}
          note={order?.adminNote}
          onSave={handleAdminNote}
          loading={loading}
        />
      </div>
      <DeleteModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
        loading={loading}
        title="Delete Sample Order"
        description="This action cannot be undone."
      />
    </>
  );
}
