import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { Loader } from "../../../components/ui";
import PageHeader from "../../../components/common/PageHeader";
import JournalForm from "./JournalForm";

import {
  fetchJournal,
  updateJournal,
  clearJournal,
  uploadJournalFeaturedImage,
} from "../../../redux/journal";

export default function EditJournal() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { journal, loading } = useSelector((state) => state.journal);

  useEffect(() => {
    dispatch(fetchJournal(id));

    return () => {
      dispatch(clearJournal());
    };
  }, [dispatch, id]);

  const handleSubmit = async (data) => {
    try {
      const featuredImage = data?.featuredImage;

      await dispatch(
        updateJournal({
          id,
          data: {
            ...data,
            featuredImage: undefined,
          },
        }),
      ).unwrap();

      if (featuredImage instanceof File) {
        await dispatch(
          uploadJournalFeaturedImage({
            id,
            image: featuredImage,
          }),
        ).unwrap();
      }

      toast.success("Journal updated successfully.");

      navigate("/admin/journal");
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Something went wrong",
      );
    }
  };

  if (loading && !journal) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader title="Edit Journal" subtitle="Update journal details." />

      <JournalForm
        mode="edit"
        initialValues={journal}
        onSubmit={handleSubmit}
      />
    </>
  );
}
