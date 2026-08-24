import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ApplicantCard from "./components/ApplicantCard";
import BusinessCard from "./components/BusinessCard";
import ContactCard from "./components/ContactCard";
import CategoriesCard from "./components/CategoriesCard";
import RequirementCard from "./components/RequirementCard";
import AdminNotesCard from "./components/AdminNotesCard";
import QuotationCard from "./components/QuotationCard";
import ActionButtons from "./components/ActionButtons";

import {
  deleteWholesaleInquiry,
  uploadWholesaleQuotation,
  fetchWholesaleInquiry,
  updateWholesaleStatus,
  updateWholesaleNote,
} from "../../../redux/wholesale/wholesaleThunk";

export default function ApplicationDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { inquiry, detailsLoading } = useSelector((state) => state.wholesale);

  useEffect(() => {
    dispatch(fetchWholesaleInquiry(id));
  }, [dispatch, id]);

  const approve = async () => {
    await dispatch(
      updateWholesaleStatus({
        id,
        payload: {
          status: "Approved",
        },
      }),
    );

    dispatch(fetchWholesaleInquiry(id));
  };

  const reject = async () => {
    await dispatch(
      updateWholesaleStatus({
        id,
        payload: {
          status: "Rejected",
        },
      }),
    );

    dispatch(fetchWholesaleInquiry(id));
  };

  const saveNotes = (notes) => {
    dispatch(
      updateWholesaleNote({
        id,
        notes,
      }),
    );
  };

  const uploadQuotation = (formData) => {
    dispatch(
      uploadWholesaleQuotation({
        id,
        formData,
      }),
    );
  };

  const deleteApplication = async () => {
    if (!window.confirm("Delete this application?")) return;

    await dispatch(deleteWholesaleInquiry(id));

    navigate("/admin/wholesale");
  };

  if (detailsLoading) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        Loading...
      </div>
    );
  }

  if (!inquiry) return null;

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <button
            onClick={() => navigate("/admin/wholesale")}
            className="mb-3 text-sm text-blue-600 hover:underline"
          >
            ← Back to Applications
          </button>

          <h1 className="text-3xl font-bold">Wholesale Application</h1>

          <p className="mt-1 text-gray-500">
            Review application details and manage approval.
          </p>
        </div>

        <div className="rounded-xl border bg-white px-5 py-4 shadow-sm">
          <div className="text-xs uppercase text-gray-500">Status</div>

          <div className="mt-2">
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium
            ${
              inquiry.status === "Approved"
                ? "bg-green-100 text-green-700"
                : inquiry.status === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : inquiry.status === "Reviewing"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
            }`}
            >
              {inquiry.status}
            </span>
          </div>
        </div>
      </div>

      {/* Main Layout */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Left */}

        <div className="space-y-6 xl:col-span-2">
          <ApplicantCard application={inquiry} />

          <BusinessCard application={inquiry} />

          <ContactCard application={inquiry} />

          <CategoriesCard application={inquiry} />

          <RequirementCard application={inquiry} />
        </div>

        {/* Right Sidebar */}

        <div className="space-y-6">
          <ActionButtons
            application={inquiry}
            onApprove={approve}
            onReject={reject}
            onDelete={deleteApplication}
          />

          <QuotationCard application={inquiry} onUpload={uploadQuotation} />

          <AdminNotesCard application={inquiry} onSave={saveNotes} />
        </div>
      </div>
    </div>
  );
}
