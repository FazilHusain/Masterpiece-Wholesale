import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { fetchJournals, deleteJournal } from "../../../redux/journal";

import PageHeader from "../../../components/common/PageHeader";
import { Card, Input, Select } from "../../../components/ui";
import { DeleteModal } from "../../../components/ui";

import JournalTable from "./JournalTable";

export default function Journal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { journals, loading } = useSelector(
    (state) => state.journal
  );

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [status, setStatus] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedJournal, setSelectedJournal] =
    useState(null);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  useEffect(() => {
    dispatch(fetchJournals());
  }, [dispatch]);

  const filteredJournals = useMemo(() => {
    return journals.filter((item) => {
      const matchesSearch =
        item.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.author
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        !category || item.category === category;

      const matchesStatus =
        status === ""
          ? true
          : item.isActive.toString() === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    journals,
    search,
    category,
    status,
  ]);

  const handleDelete = (journal) => {
    setSelectedJournal(journal);

    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);

      await dispatch(
        deleteJournal(selectedJournal._id)
      ).unwrap();

      toast.success(
        "Journal deleted successfully."
      );

      setDeleteModal(false);

      setSelectedJournal(null);
    } catch (error) {
      toast.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Journal"
        subtitle="Manage all journal articles."
        action
        actionText="+ Create Journal"
        onAction={() =>
          navigate("/admin/journal/create")
        }
      />

      <Card>
        <div className="grid gap-4 lg:grid-cols-3">
          <Input
            placeholder="Search Journal..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <Select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            options={[
              {
                label: "All Categories",
                value: "",
              },
              {
                label: "Craft Process",
                value: "Craft Process",
              },
              {
                label: "Design Story",
                value: "Design Story",
              },
              {
                label: "Retail Guide",
                value: "Retail Guide",
              },
              {
                label: "Sustainability",
                value: "Sustainability",
              },
              {
                label: "Collections",
                value: "Collections",
              },
            ]}
          />

          <Select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            options={[
              {
                label: "All Status",
                value: "",
              },
              {
                label: "Active",
                value: "true",
              },
              {
                label: "Inactive",
                value: "false",
              },
            ]}
          />
        </div>

        <div className="mt-6">
          <JournalTable
            journals={filteredJournals}
            loading={loading}
            onDelete={handleDelete}
          />
        </div>
      </Card>

      <DeleteModal
        open={deleteModal}
        loading={deleteLoading}
        title="Delete Journal"
        description={`Are you sure you want to permanently delete "${selectedJournal?.title}"?`}
        onClose={() => {
          setDeleteModal(false);
          setSelectedJournal(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}