import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { Loader } from "../../../components/ui";
import PageHeader from "../../../components/common/PageHeader";
import SampleOrderForm from "./SampleOrderForm";

import { fetchSampleOrder, updateSampleOrder } from "../../../redux/sampleOrder";
import { clearSampleOrder } from "../../../redux/sampleOrder/sampleOrderSlice";


export default function EditSampleOrder() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { order, loading } = useSelector(
    (state) => state.sampleOrder
  );

  useEffect(() => {
    dispatch(fetchSampleOrder(id));

    return () => dispatch(clearSampleOrder());
  }, [dispatch, id]);

  const handleSubmit = async (data) => {
    try {
      await dispatch(
        updateSampleOrder({
          id,
          data,
        })
      ).unwrap();

      toast.success(
        "Sample order updated successfully."
      );

      navigate("/admin/sample-orders");
    } catch (error) {
      toast.error(
        error?.message ||
          "Something went wrong."
      );
    }
  };

  if (loading && !order) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader
        title="Edit Sample Order"
        subtitle="Update sample order."
      />

      <SampleOrderForm
        mode="edit"
        initialValues={order}
        onSubmit={handleSubmit}
      />
    </>
  );
}