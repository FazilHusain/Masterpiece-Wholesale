import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import {Select} from "../../../components/ui";
import {Card} from "../../../components/ui";
import {Input} from "../../../components/ui";
import { DeleteModal } from "../../../components/ui";

import BannerTable from "./BannerTable";

import {
  fetchBanners,
  deleteBanner,
} from "../../../redux/banner";

export default function Banner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { banners, loading } = useSelector(
    (state) => state.banner
  );

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const [selectedBanner, setSelectedBanner] =
    useState(null);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  const handleDelete = async () => {
    try {
      await dispatch(
        deleteBanner(selectedBanner._id)
      ).unwrap();

      toast.success(
        "Banner deleted successfully."
      );

      setDeleteOpen(false);
    } catch (error) {
      toast.error(error);
    }
  };

  const filtered = banners.filter((item) => {
    const searchMatch =
      item.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const typeMatch =
      !type || item.type === type;

    return searchMatch && typeMatch;
  });

  return (
    <div className="space-y-6">

      <PageHeader
        title="Banner Management"
        subtitle="Manage website banners."
        action
        actionText="Create Banner"
        onAction={() =>
          navigate("/admin/banner/create")
        }
      />

      <Card>

        <div className="mb-6 grid gap-4 md:grid-cols-3">

          <Input
            placeholder="Search Banner"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <Select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
            options={[
              {
                label: "All Types",
                value: "",
              },
              {
                label: "Hero",
                value: "Hero",
              },
              {
                label: "Middle",
                value: "Middle",
              },
              {
                label: "Bottom",
                value: "Bottom",
              },
              {
                label: "Offer",
                value: "Offer",
              },
            ]}
          />

        </div>

        <BannerTable
          banners={filtered}
          loading={loading}
          onDelete={(banner) => {
            setSelectedBanner(banner);
            setDeleteOpen(true);
          }}
        />

      </Card>

      <DeleteModal
        open={deleteOpen}
        title="Delete Banner"
        description="Are you sure you want to delete this banner?"
        onClose={() =>
          setDeleteOpen(false)
        }
        onConfirm={handleDelete}
      />

    </div>
  );
}