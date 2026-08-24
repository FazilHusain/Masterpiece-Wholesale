import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { fetchProducts, deleteProduct } from "../../../redux/product";

import PageHeader from "../../../components/common/PageHeader";
import { Card, Input, Select } from "../../../components/ui";
import { DeleteModal } from "../../../components/ui";

import ProductTable from "./ProductTable";

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading } = useSelector(
    (state) => state.product
  );

  const { collections } = useSelector(
    (state) => state.collection
  );

  const { categories } = useSelector(
    (state) => state.category
  );

  const [search, setSearch] = useState("");

  const [collection, setCollection] = useState("");

  const [category, setCategory] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase());

      const matchesCollection =
        !collection ||
        item.collection?._id === collection;

      const matchesCategory =
        !category ||
        item.category?._id === category;

      return (
        matchesSearch &&
        matchesCollection &&
        matchesCategory
      );
    });
  }, [
    products,
    search,
    collection,
    category,
  ]);

  const handleDelete = (product) => {
    setSelectedProduct(product);

    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);

      await dispatch(
        deleteProduct(selectedProduct._id)
      ).unwrap();

      toast.success(
        "Product deleted successfully."
      );

      setDeleteModal(false);

      setSelectedProduct(null);
    } catch (error) {
      toast.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      <PageHeader
        title="Products"
        subtitle="Manage all products."
        action
        actionText="+ Create Product"
        onAction={() =>
          navigate("/admin/products/create")
        }
      />

      <Card>

        <div className="grid gap-4 lg:grid-cols-4">

          <Input
            placeholder="Search Product..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <Select
            value={collection}
            onChange={(e) =>
              setCollection(e.target.value)
            }
            options={[
              {
                label: "All Collections",
                value: "",
              },

              ...collections.map((item) => ({
                label: item.name,
                value: item._id,
              })),
            ]}
          />

          <Select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            options={[
              {
                label: "All Categories",
                value: "",
              },

              ...categories.map((item) => ({
                label: item.name,
                value: item._id,
              })),
            ]}
          />

        </div>

        <div className="mt-6">

          <ProductTable
            products={filteredProducts}
            loading={loading}
            onDelete={handleDelete}
          />

        </div>

      </Card>

      <DeleteModal
        open={deleteModal}
        loading={deleteLoading}
        title="Delete Product"
        description={`Are you sure you want to permanently delete "${selectedProduct?.name}"?`}
        onClose={() => {
          setDeleteModal(false);
          setSelectedProduct(null);
        }}
        onConfirm={confirmDelete}
      />

    </div>
  );
}