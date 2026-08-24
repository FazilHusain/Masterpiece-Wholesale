import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Card, Badge, Button } from "../../../components/ui";
import PageHeader from "../../../components/common/PageHeader";

import { fetchSingleContact, changeContactStatus } from "../../../redux/contact";
import { removeContact } from "../../../redux/contact";

export default function ContactDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const { contact } = useSelector(
    (state) => state.contact
  );

  useEffect(() => {
    dispatch(fetchSingleContact(id));
  }, [dispatch, id]);

  if (!contact) return null;

  const markAsRead = async () => {
    try {
      await dispatch(
        changeContactStatus({
          id,
          payload: {
            status: "Read",
          },
        })
      ).unwrap();

      toast.success("Marked as Read.");

      dispatch(fetchSingleContact(id));
    } catch (error) {
      toast.error(error);
    }
  };

  const deleteContact = async () => {
    try {
      await dispatch(removeContact(id)).unwrap();

      toast.success("Contact deleted.");

      navigate("/admin/contact");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contact Details"
        subtitle="View customer inquiry."
      />

      <Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <p className="text-sm text-gray-500">
              Name
            </p>

            <p className="font-semibold">
              {contact.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="font-semibold">
              {contact.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Phone
            </p>

            <p className="font-semibold">
              {contact.phone}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Subject
            </p>

            <p className="font-semibold">
              {contact.subject}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">
              Requirement
            </p>

            <div className="mt-2 rounded-lg border p-4 bg-gray-50">
              {contact.message}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Status
            </p>

            <Badge
              variant={
                contact.status === "Read"
                  ? "success"
                  : "warning"
              }
            >
              {contact.status}
            </Badge>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Submitted
            </p>

            <p>
              {new Date(
                contact.createdAt
              ).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              IP Address
            </p>

            <p>
              {contact.ipAddress || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Browser
            </p>

            <p>
              {contact.browser || "-"}
            </p>
          </div>

        </div>

        <div className="mt-8 flex gap-3">

          {contact.status === "Unread" && (
            <Button
              variant="success"
              onClick={markAsRead}
            >
              Mark as Read
            </Button>
          )}

          <Button
            variant="danger"
            onClick={deleteContact}
          >
            Delete Contact
          </Button>

        </div>

      </Card>
    </div>
  );
}