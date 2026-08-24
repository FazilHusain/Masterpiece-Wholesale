import { useDispatch, useSelector } from "react-redux";
import { deleteAdmin } from "../../../../redux/admin";

const DeleteAdminModal = ({
  open,
  onClose,
  admin,
}) => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.admin);

  if (!open || !admin) return null;

  const handleDelete = async () => {
    await dispatch(deleteAdmin(admin._id));

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-md rounded-xl bg-white p-6">

        <h2 className="text-xl font-semibold">
          Delete Admin
        </h2>

        <p className="mt-4 text-gray-600">
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}
            {admin.name}
          </span>
          ?
        </p>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-5 py-2 text-white"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteAdminModal;