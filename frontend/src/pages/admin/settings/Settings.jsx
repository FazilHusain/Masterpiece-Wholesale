import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import { Button } from "../../../components/ui";

import CompanySection from "./components/CompanySection";
import ContactSection from "./components/ContactSection";
import SocialSection from "./components/SocialSection";
import BrandingSection from "./components/BrandingSection";
import SeoSection from "./components/SeoSection";
import BusinessSection from "./components/BusinessSection";
import MaintenanceSection from "./components/MaintenanceSection";
import { fetchSettings, updateSettings } from "../../../redux/setting";

export default function Settings() {
  const dispatch = useDispatch();

  const { settings, loading } = useSelector((state) => state.setting);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateSettings(formData)).unwrap();

      toast.success("Settings updated.");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PageHeader title="Settings" subtitle="Manage website settings." />

      <CompanySection formData={formData} handleChange={handleChange} />

      <BrandingSection
        formData={formData}
        setFormData={setFormData}
        dispatch={dispatch}
      />

      <ContactSection formData={formData} handleChange={handleChange} />

      <SocialSection formData={formData} handleChange={handleChange} />

      <SeoSection formData={formData} handleChange={handleChange} />

      <BusinessSection formData={formData} handleChange={handleChange} />

      <MaintenanceSection formData={formData} setFormData={setFormData} />

      <div className="sticky bottom-0 z-10 flex justify-end rounded-2xl border border-[#E8E2D9] bg-white p-5 shadow-lg">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  );
}
