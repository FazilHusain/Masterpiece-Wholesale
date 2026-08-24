import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getAdmins, toggleAdminStatus } from "../../../redux/admin/adminThunk";

import AdminHeader from "./components/AdminHeader";
import AdminFilters from "./components/AdminFilters";
import AdminTable from "./components/AdminTable";
import Pagination from "../../../components/ui/Pagination";
import { useSelector } from "react-redux";
import AdminFormModal from "./components/AdminFormModal";
import DeleteAdminModal from "./components/DeleteAdminModal";
import ResetPasswordModal from "./components/ResetPasswordModal";

const AdminManagement = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    search: "",
    role: "",
    status: "",
    page: 1,
    limit: 10,
  });
  const { admins, pagination, loading } = useSelector((state) => state.admin);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    dispatch(getAdmins(filters));
  }, [dispatch, filters]);

  const handleRefresh = () => {
    dispatch(getAdmins(filters));
  };

  const handleAddAdmin = () => {
    setSelectedAdmin(null);
    setShowFormModal(true);
  };

  const handleEditAdmin = (admin) => {
    setSelectedAdmin(admin);
    setShowFormModal(true);
  };

  const handleDeleteAdmin = (admin) => {
    setSelectedAdmin(admin);
    setShowDeleteModal(true);
  };

  const handleResetPassword = (admin) => {
    setSelectedAdmin(admin);
    setShowResetModal(true);
  };

  const handleToggleStatus = async (admin) => {
    await dispatch(toggleAdminStatus(admin._id));

    dispatch(getAdmins(filters));
  };

  return (
    <div className="space-y-6">
      <AdminHeader onRefresh={handleRefresh} onAddAdmin={handleAddAdmin} />

      <AdminFilters filters={filters} setFilters={setFilters} />

      <AdminTable
        admins={admins}
        loading={loading}
        onEdit={handleEditAdmin}
        onDelete={handleDeleteAdmin}
        onResetPassword={handleResetPassword}
        onToggleStatus={handleToggleStatus}
      />

      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={(page) =>
          setFilters((prev) => ({
            ...prev,
            page,
          }))
        }
      />

      <AdminFormModal
        open={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          setSelectedAdmin(null);
          dispatch(getAdmins(filters));
        }}
        editAdmin={selectedAdmin}
      />

      <DeleteAdminModal
        open={showDeleteModal}
        admin={selectedAdmin}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedAdmin(null);
          dispatch(getAdmins(filters));
        }}
      />

      <ResetPasswordModal
        open={showResetModal}
        admin={selectedAdmin}
        onClose={() => {
          setShowResetModal(false);
          setSelectedAdmin(null);
        }}
      />
    </div>
  );
};

export default AdminManagement;
