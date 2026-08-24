import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchBanner
} from "../../../redux/banner";
import { clearBanner } from "../../../redux/banner/bannerSlice";

import { Loader } from "../../../components/ui";
import PageHeader from "../../../components/common/PageHeader";

import HeroCard from "./components/details/HeroCard";
import BasicInformationCard from "./components/details/BasicInformationCard";
import SystemCard from "./components/details/SystemCard";

export default function BannerDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { banner, loading } = useSelector(
    (state) => state.banner
  );

  useEffect(() => {
    dispatch(fetchBanner(id));

    return () => {
      dispatch(clearBanner());
    };
  }, [dispatch, id]);

  if (loading && !banner) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Banner Details"
        subtitle="View banner details."
        action
        actionText="Edit Banner"
        onAction={() =>
          navigate(`/admin/banner/${id}/edit`)
        }
      />

      <HeroCard banner={banner} />

      <BasicInformationCard
        banner={banner}
      />

      <SystemCard banner={banner} />
    </div>
  );
}