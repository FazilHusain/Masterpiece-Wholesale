import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchCollections } from "../../../redux/collection";
import { Input, Card } from "../../../components/ui";

import CollectionTable from "./CollectionTable";
import PageHeader from "../../../components/common/PageHeader";
import { deleteCollection } from "../../../redux/collection";
import toast from "react-hot-toast";
import { DeleteModal } from "../../../components/ui";

export default function Collections() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { collections, loading } = useSelector((state) => state.collection);

  const [search, setSearch] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedCollection, setSelectedCollection] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  const filteredCollections = useMemo(() => {
    if (!search.trim()) return collections;

    return collections.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [collections, search]);

  const handleDelete = (collection) => {
    setSelectedCollection(collection);

    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);

      await dispatch(deleteCollection(selectedCollection._id)).unwrap();

      toast.success("Collection deleted successfully.");

      setDeleteModal(false);
      setSelectedCollection(null);
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Something went wrong",
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        action
        actionText="+ Create Collection"
        onAction={() => navigate("/admin/collections/create")}
      />

      <Card className="overflow-hidden">
        <div className="mb-5 w-full md:max-w-sm">
          <Input
            placeholder="Search Collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <CollectionTable
          loading={loading}
          collections={filteredCollections}
          onDelete={handleDelete}
        />
      </Card>
      <DeleteModal
        open={deleteModal}
        loading={deleteLoading}
        title="Delete Collection"
        description={`Are you sure you want to permanently delete "${selectedCollection?.name}"?`}
        onClose={() => {
          setDeleteModal(false);
          setSelectedCollection(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
