import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchJournal,
  clearJournal,
} from "../../../redux/journal";

import { Loader } from "../../../components/ui";
import PageHeader from "../../../components/common/PageHeader";

import HeroCard from "./components/details/HeroCard";
import BasicInformationCard from "./components/details/BasicInformationCard";
import ContentCard from "./components/details/ContentCard";
import SeoCard from "./components/details/SeoCard";
import SystemCard from "./components/details/SystemCard";

export default function JournalDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { journal, loading } = useSelector(
    (state) => state.journal
  );

  useEffect(() => {
    dispatch(fetchJournal(id));

    return () => {
      dispatch(clearJournal());
    };
  }, [dispatch, id]);

  if (loading && !journal) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">

      <PageHeader
        title="Journal Details"
        subtitle="View complete journal information."
        action
        actionText="Edit Journal"
        onAction={() =>
          navigate(`/admin/journal/${id}/edit`)
        }
      />

      <HeroCard journal={journal} />

      <BasicInformationCard
        journal={journal}
      />

      <ContentCard journal={journal} />

      <SeoCard journal={journal} />

      <SystemCard journal={journal} />

    </div>
  );
}