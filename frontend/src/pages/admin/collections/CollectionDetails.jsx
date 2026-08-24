import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchCollection,
  clearCollection,
} from "../../../redux/collection";

import PageHeader from "../../../components/common/PageHeader";
import { Loader } from "../../../components/ui";

import BasicInformationCard from "./components/details/BasicInformationCard";
import ImagesCard from "./components/details/ImagesCard";
import StoryCard from "./components/details/StoryCard";
import SeoCard from "./components/details/SeoCard";
import SystemCard from "./components/details/SystemCard";

export default function CollectionDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { collection, loading } = useSelector(
    (state) => state.collection
  );

  useEffect(() => {
    dispatch(fetchCollection(id));

    return () => {
      dispatch(clearCollection());
    };
  }, [dispatch, id]);

  if (loading && !collection) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">

      <PageHeader
        title="Collection Details"
        subtitle="View collection information."
        action
        actionText="Edit Collection"
        onAction={() =>
          navigate(
            `/admin/collections/${id}/edit`
          )
        }
      />

      <ImagesCard collection={collection} />

      <BasicInformationCard
        collection={collection}
      />

      <StoryCard collection={collection} />

      <SeoCard collection={collection} />

      <SystemCard collection={collection} />

    </div>
  );
}