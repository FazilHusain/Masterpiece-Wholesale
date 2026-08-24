import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchCategories } from "../../../redux/category/categoryThunk";
import { Card, Input } from "../../../components/ui";

import CategoryTable from "./CategoryTable";
import PageHeader from "../../../components/common/PageHeader";
import { deleteCategory } from "../../../redux/category";
import toast from "react-hot-toast";
import { DeleteModal } from "../../../components/ui";

export default function Categories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading } = useSelector((state) => state.category);

  const [search, setSearch] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedCategory, setselectedCategory] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories;

    return categories.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [categories, search]);

  const handleDelete = (collection) => {
    setselectedCategory(collection);

    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);

      await dispatch(deleteCategory(selectedCategory._id)).unwrap();

      toast.success("Category deleted successfully.");

      setDeleteModal(false);
      setselectedCategory(null);
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
        actionText="+ Create Category"
        onAction={() => navigate("/admin/categories/create")}
      />

      <Card className="overflow-hidden">
        <div className="mb-5 w-full md:max-w-sm">
          <Input
            placeholder="Search Category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <CategoryTable
          loading={loading}
          categories={filteredCategories}
          onDelete={handleDelete}
        />
      </Card>
      <DeleteModal
        open={deleteModal}
        loading={deleteLoading}
        title="Delete Category"
        description={`Are you sure you want to permanently delete "${selectedCategory?.name}"?`}
        onClose={() => {
          setDeleteModal(false);
          setselectedCategory(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
