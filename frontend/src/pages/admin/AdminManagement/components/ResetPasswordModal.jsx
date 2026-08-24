import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../../../redux/admin";

const ResetPasswordModal = ({
  open,
  onClose,
  admin,
}) => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.admin);

  const [password, setPassword] = useState("");

  if (!open || !admin) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      resetPassword({
        id: admin._id,
        data: {
          newPassword: password,
        },
      })
    );

    setPassword("");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-md rounded-xl bg-white p-6">

        <h2 className="text-xl font-semibold">
          Reset Password
        </h2>

        <p className="mt-2 text-gray-500">
          {admin.name}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-5 space-y-4"
        >

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            className="w-full rounded-lg border p-3"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-2"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="rounded-lg bg-emerald-600 px-5 py-2 text-white"
            >
              Reset Password
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ResetPasswordModal;