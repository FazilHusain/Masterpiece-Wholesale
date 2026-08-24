import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../../components/ui";

import CustomerInformation from "./components/CustomerInformation";
import ProductInformation from "./components/ProductInformation";
import ShippingInformation from "./components/ShippingInformation";
import StatusSection from "./components/StatusSection";
import NotesSection from "./components/NotesSection";

export default function SampleOrderForm({
  initialValues = {},
  mode = "edit",
  onSubmit,
}) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: "",
    companyName: "",
    email: "",
    phone: "",
    country: "",

    product: "",
    variant: "",
    sku: "",
    quantity: 1,

    shippingAddress: "",
    city: "",
    state: "",
    postalCode: "",

    status: "Pending",

    message: "",
    adminNote: "",

    ...initialValues,
  });

  const [errors, setErrors] =
    useState({});

  useEffect(() => {
    if (
      mode === "edit" &&
      initialValues?._id
    ) {
      setFormData((prev) => ({
        ...prev,
        ...initialValues,
      }));
    }
  }, [initialValues, mode]);

  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName =
        "Customer name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Email is required.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone is required.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length ===
      0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    await onSubmit?.(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <CustomerInformation
        formData={formData}
        errors={errors}
        handleChange={handleChange}
      />

      <ProductInformation
        formData={formData}
        errors={errors}
        handleChange={handleChange}
      />

      <ShippingInformation
        formData={formData}
        errors={errors}
        handleChange={handleChange}
      />

      <StatusSection
        formData={formData}
        handleChange={handleChange}
      />

      <NotesSection
        formData={formData}
        handleChange={handleChange}
      />

      <div className="sticky bottom-0 z-10 flex justify-end gap-3 rounded-2xl border border-[#E8E2D9] bg-white p-5 shadow-lg">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            navigate(
              "/admin/sample-orders"
            )
          }
        >
          Cancel
        </Button>

        <Button type="submit">
          Update Sample Order
        </Button>
      </div>
    </form>
  );
}