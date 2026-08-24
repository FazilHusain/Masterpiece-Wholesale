import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createCategory } from "../../../redux/category";
import PageHeader from "../../../components/common/PageHeader";
import CategoryForm from "./CategoryForm";
import { useEffect } from "react";
import { fetchCollections } from "../../../redux/collection";

export default function CreateCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await dispatch(createCategory(data)).unwrap();

      toast.success("Category created successfully.");

      navigate("/admin/categories");
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Something went wrong",
      );
    }
  };

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  return (
    <>
      <PageHeader />

      <CategoryForm mode="create" onSubmit={handleSubmit} />
    </>
  );
}
