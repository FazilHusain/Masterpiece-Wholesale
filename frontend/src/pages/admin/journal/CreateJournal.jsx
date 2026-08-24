import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import JournalForm from "./JournalForm";

import {
  createJournal,
  uploadJournalFeaturedImage,
} from "../../../redux/journal";

export default function CreateJournal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      // =========================================
      // 1. FEATURED IMAGE
      // =========================================

      const featuredImage = Array.isArray(data?.featuredImage)
        ? data.featuredImage[0]
        : data?.featuredImage;

      // =========================================
      // 2. CREATE JOURNAL DATA
      // IMAGE KO CREATE API ME MAT BHEJO
      // =========================================

      const journalData = {
        ...data,
        featuredImage: undefined,
      };

      // =========================================
      // 3. CREATE JOURNAL
      // =========================================

      const result = await dispatch(
        createJournal(journalData)
      ).unwrap();

      const createdJournal = result?.data;

      const journalId = createdJournal?._id;

      if (!journalId) {
        throw new Error(
          "Journal created but journal ID was not returned."
        );
      }

      // =========================================
      // 4. UPLOAD FEATURED IMAGE
      // =========================================

      if (featuredImage instanceof File) {
        await dispatch(
          uploadJournalFeaturedImage({
            id: journalId,
            image: featuredImage,
          })
        ).unwrap();
      }

      // =========================================
      // 5. SUCCESS
      // =========================================

      toast.success("Journal created successfully.");

      navigate("/admin/journal");

    } catch (error) {
      console.error(
        "CREATE JOURNAL ERROR:",
        error
      );

      toast.error(
        typeof error === "string"
          ? error
          : error?.message ||
              "Something went wrong"
      );
    }
  };

  return (
    <>
      <PageHeader
        title="Create Journal"
        subtitle="Create a new journal article."
      />

      <JournalForm
        mode="create"
        onSubmit={handleSubmit}
      />
    </>
  );
}