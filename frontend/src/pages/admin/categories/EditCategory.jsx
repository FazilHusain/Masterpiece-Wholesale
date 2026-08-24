import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  fetchCategory,
  updateCategory,
} from "../../../redux/category";

import { clearCategory } from "../../../redux/category/categorySlice";

import { Loader } from "../../../components/ui";
import PageHeader from "../../../components/common/PageHeader";
import CategoryForm from "./CategoryForm";
import { fetchCollections } from "../../../redux/collection";

export default function EditCategory() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { category, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCollections());

    if (id) {
      dispatch(fetchCategory(id));
    }

    return () => {
      dispatch(clearCategory());
    };
  }, [dispatch, id]);

  const handleSubmit = async (data) => {
    try {
      await dispatch(
        updateCategory({
          id,
          data,
        }),
      ).unwrap();

      toast.success("Category updated successfully.");

      navigate("/admin/categories");
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Something went wrong",
      );
    }
  };

  if (loading && !category) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader />

      <CategoryForm
        mode="edit"
        initialValues={category}
        onSubmit={handleSubmit}
      />
    </>
  );
}
