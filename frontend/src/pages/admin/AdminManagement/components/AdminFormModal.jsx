import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAdmin } from "../../../../redux/admin";
import { updateAdmin } from "../../../../redux/admin";

const initialState = {
  name: "",
  email: "",
  role: "admin",
  password: "",
  confirmPassword: "",
  isActive: true,
};

const AdminFormModal = ({ open, onClose, editAdmin = null }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editAdmin) {
      setFormData({
        name: editAdmin.name,
        email: editAdmin.email,
        role: editAdmin.role,
        isActive: editAdmin.isActive,
        password: "",
        confirmPassword: "",
      });
    } else {
      setFormData(initialState);
    }
  }, [editAdmin]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editAdmin) {
      if (formData.password !== formData.confirmPassword) {
        return alert("Passwords do not match.");
      }

      dispatch(createAdmin(formData));
    } else {
      dispatch(
        updateAdmin({
          id: editAdmin._id,
          data: {
            name: formData.name,
            email: formData.email,
            role: formData.role,
            isActive: formData.isActive,
          },
        }),
      );
    }

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] overflow-y-auto bg-black/60 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Header */}

          <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-5">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {editAdmin ? "Edit Admin" : "Create Admin"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {editAdmin
                  ? "Update administrator details."
                  : "Create a new administrator account."}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100"
            >
              ✕
            </button>
          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="max-h-[70vh] overflow-y-auto p-6 md:p-8"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Name */}

              <div>
                <label className="mb-2 block text-sm font-medium">Name</label>

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-emerald-500"
                />
              </div>

              {/* Email */}

              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-emerald-500"
                />
              </div>

              {/* Role */}

              <div>
                <label className="mb-2 block text-sm font-medium">Role</label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-emerald-500"
                >
                  <option value="super-admin">Super Admin</option>

                  <option value="admin">Admin</option>

                  <option value="editor">Editor</option>
                </select>
              </div>

              {/* Active */}

              <div className="flex items-end">
                <label className="flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-3">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />

                  <span className="font-medium">Active</span>
                </label>
              </div>
            </div>

            {!editAdmin && (
              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            <div className="sticky bottom-0 mt-8 flex flex-col-reverse gap-3 border-t bg-white pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-gray-300 px-6 py-3 font-medium hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
              >
                {loading
                  ? "Please Wait..."
                  : editAdmin
                    ? "Update Admin"
                    : "Create Admin"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminFormModal;
