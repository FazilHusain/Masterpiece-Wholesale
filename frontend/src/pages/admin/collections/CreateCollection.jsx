import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createCollection } from "../../../redux/collection";

import CollectionForm from "./CollectionForm";
import PageHeader from "../../../components/common/PageHeader";

export default function CreateCollection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await dispatch(createCollection(data)).unwrap();

      toast.success("Collection created successfully.");

      navigate("/admin/collections");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <PageHeader />

      <CollectionForm
        mode="create"
        onSubmit={handleSubmit}
      />
    </>
  );
}