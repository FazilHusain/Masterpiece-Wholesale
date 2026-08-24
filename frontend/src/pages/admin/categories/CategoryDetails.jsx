import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchCategory,
} from "../../../redux/category";
import { clearCategory } from "../../../redux/category/categorySlice";
import { Loader } from "../../../components/ui";
import PageHeader from "../../../components/common/PageHeader";

import ImagesCard from "./components/details/ImagesCard";
import BasicInformationCard from "./components/details/BasicInformationCard";
import SeoCard from "./components/details/SeoCard";
import SystemCard from "./components/details/SystemCard";

export default function CategoryDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product: category, loading } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategory(id));

    return () => {
      dispatch(clearCategory());
    };
  }, [dispatch, id]);

  if (loading && !category) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">

      <PageHeader
        title="Category Details"
        subtitle="View category information."
        action
        actionText="Edit Category"
        onAction={() =>
          navigate(`/admin/categories/${id}/edit`)
        }
      />

      <ImagesCard category={category} />

      <BasicInformationCard category={category} />

      <SeoCard category={category} />

      <SystemCard category={category} />

    </div>
  );
}