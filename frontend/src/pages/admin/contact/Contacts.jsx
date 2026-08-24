import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Card } from "../../../components/ui";
import { Select } from "../../../components/ui";
import { Input } from "../../../components/ui";
import { DeleteModal } from "../../../components/ui";
import PageHeader from "../../../components/common/PageHeader";

import {
  fetchContacts,
  changeContactStatus,
  removeContact,
} from "../../../redux/contact";
import ContactDataTable from "./ContactDataTable";

export default function Contacts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { contacts, loading } = useSelector((state) => state.contact);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [selectedContact, setSelectedContact] = useState(null);
  const [actionType, setActionType] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  console.log("REDUX CONTACTS:", contacts);

  const filteredContacts = useMemo(() => {
    return contacts.filter((item) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        item.name?.toLowerCase().includes(keyword) ||
        item.email?.toLowerCase().includes(keyword) ||
        item.phone?.toLowerCase().includes(keyword) ||
        item.subject?.toLowerCase().includes(keyword);

      const matchesStatus = !status || item.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [contacts, search, status]);

  const handleAction = (contact, type) => {
    setSelectedContact(contact);
    setActionType(type);
  };

  const confirmAction = async () => {
    try {
      setLoadingAction(true);

      if (actionType === "read") {
        await dispatch(
          changeContactStatus({
            id: selectedContact._id,
            payload: {
              status: "Read",
            },
          }),
        ).unwrap();

        toast.success("Contact marked as read.");
      }

      if (actionType === "delete") {
        await dispatch(removeContact(selectedContact._id)).unwrap();

        toast.success("Contact deleted.");
      }

      dispatch(fetchContacts());

      setSelectedContact(null);
      setActionType("");
    } catch (error) {
      toast.error(error);
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Contacts" subtitle="Manage all customer inquiries." />

      <Card>
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Search name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              {
                label: "All Status",
                value: "",
              },
              {
                label: "Unread",
                value: "Unread",
              },
              {
                label: "Read",
                value: "Read",
              },
            ]}
          />
        </div>

        <div className="mt-6">
          <ContactDataTable
            contacts={filteredContacts}
            loading={loading}
            onRead={(row) => handleAction(row, "read")}
            onDelete={(row) => handleAction(row, "delete")}
            onView={(row) => navigate(`/admin/contact/${row._id}`)}
          />
        </div>
      </Card>

      <DeleteModal
        open={!!selectedContact}
        loading={loadingAction}
        title={actionType === "read" ? "Mark as Read" : "Delete Contact"}
        description={
          actionType === "read"
            ? `Mark "${selectedContact?.name}" as read?`
            : `Delete "${selectedContact?.name}"?`
        }
        onClose={() => {
          setSelectedContact(null);
          setActionType("");
        }}
        onConfirm={confirmAction}
      />
    </div>
  );
}
