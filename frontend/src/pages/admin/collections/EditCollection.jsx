import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  fetchCollection,
  updateCollection,
  clearCollection,
} from "../../../redux/collection";

import PageHeader from "../../../components/common/PageHeader";
import { Loader } from "../../../components/ui";
import CollectionForm from "./CollectionForm";

export default function EditCollection() {
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

  const handleSubmit = async (data) => {
    try {
      await dispatch(
        updateCollection({
          id,
          data,
        })
      ).unwrap();

      toast.success("Collection updated successfully.");

      navigate("/admin/collections");
    } catch (error) {
      toast.error(error);
    }
  };

  if (loading && !collection) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader />

      <CollectionForm
        mode="edit"
        initialValues={collection}
        onSubmit={handleSubmit}
      />
    </>
  );
}