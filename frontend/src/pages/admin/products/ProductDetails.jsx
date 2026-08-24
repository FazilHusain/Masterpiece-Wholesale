import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchProduct,
  clearProduct,
} from "../../../redux/product";

import { Loader } from "../../../components/ui";
import PageHeader from "../../../components/common/PageHeader";

import HeroCard from "./components/details/HeroCard";
import BasicInformationCard from "./components/details/BasicInformationCard";
import ProductInformationCard from "./components/details/ProductInformationCard";
import StoryCard from "./components/details/StoryCard";
import VariantCard from "./components/details/VariantCard";
import SampleCard from "./components/details/SampleCard";
import DownloadCard from "./components/details/DownloadCard";
import SeoCard from "./components/details/SeoCard";
import SystemCard from "./components/details/SystemCard";

export default function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchProduct(id));

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id]);

  if (loading && !product) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">

      <PageHeader
        title="Product Details"
        subtitle="View complete product information."
        action
        actionText="Edit Product"
        onAction={() =>
          navigate(`/admin/products/${id}/edit`)
        }
      />

      <HeroCard product={product} />

      <BasicInformationCard product={product} />

      <ProductInformationCard product={product} />

      <StoryCard product={product} />

      <VariantCard product={product} />

      <SampleCard product={product} />

      <DownloadCard product={product} />

      <SeoCard product={product} />

      <SystemCard product={product} />

    </div>
  );
}