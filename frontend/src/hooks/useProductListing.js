import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useProductListing = (products = []) => {
  /*
   * ============================================================
   * NORMALIZE PRODUCTS
   * ============================================================
   *
   * Hook ko direct array bhi mil sakta hai:
   *
   * [
   *   { name: "Product 1" },
   *   { name: "Product 2" }
   * ]
   *
   * Ya API se object aa sakta hai:
   *
   * {
   *   collection: {...},
   *   products: [...]
   * }
   *
   * Ya:
   *
   * {
   *   data: [...]
   * }
   *
   * Ya:
   *
   * {
   *   data: {
   *     products: [...]
   *   }
   * }
   *
   * Har case mein hook internally array use karega.
   */

  const safeProducts = useMemo(() => {
    // Already an array
    if (Array.isArray(products)) {
      return products;
    }

    // { products: [...] }
    if (Array.isArray(products?.products)) {
      return products.products;
    }

    // { data: [...] }
    if (Array.isArray(products?.data)) {
      return products.data;
    }

    // { data: { products: [...] } }
    if (Array.isArray(products?.data?.products)) {
      return products.data.products;
    }

    // Anything else
    return [];
  }, [products]);

  const [searchParams, setSearchParams] = useSearchParams();

  const [filterOpen, setFilterOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(() => {
    const page = Number(searchParams.get("page"));
    return Number.isFinite(page) && page > 0 ? page : 1;
  });

  const [search, setSearch] = useState(
    () => searchParams.get("search") || "",
  );

  const [sort, setSort] = useState(
    () => searchParams.get("sort") || "latest",
  );

  const [filters, setFilters] = useState(() => ({
    collections: searchParams.get("collection")
      ? searchParams.get("collection").split(",").filter(Boolean)
      : [],

    categories: searchParams.get("category")
      ? searchParams.get("category").split(",").filter(Boolean)
      : [],

    materials: searchParams.get("material")
      ? searchParams.get("material").split(",").filter(Boolean)
      : [],

    colors: searchParams.get("color")
      ? searchParams.get("color").split(",").filter(Boolean)
      : [],
  }));

  /*
   * ============================================================
   * FILTERED PRODUCTS
   * ============================================================
   */

  const filteredProducts = useMemo(() => {
    let filtered = [...safeProducts];

    // Search
    if (search.trim()) {
      const searchValue = search.trim().toLowerCase();

      filtered = filtered.filter((product) =>
        (product?.name || "")
          .toLowerCase()
          .includes(searchValue),
      );
    }

    // Collection
    if (filters.collections.length) {
      filtered = filtered.filter((product) =>
        filters.collections.includes(
          product?.collection?.name || "",
        ),
      );
    }

    // Category
    if (filters.categories.length) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(
          product?.category?.name || "",
        ),
      );
    }

    // Material
    if (filters.materials.length) {
      filtered = filtered.filter((product) =>
        filters.materials.includes(
          product?.material || "",
        ),
      );
    }

    // Color
    if (filters.colors.length) {
      filtered = filtered.filter((product) =>
        filters.colors.includes(
          product?.colorFamily || "",
        ),
      );
    }

    // Sort
    switch (sort) {
      case "az":
        filtered.sort((a, b) =>
          (a?.name || "").localeCompare(
            b?.name || "",
          ),
        );
        break;

      case "za":
        filtered.sort((a, b) =>
          (b?.name || "").localeCompare(
            a?.name || "",
          ),
        );
        break;

      case "latest":
      default:
        filtered.sort(
          (a, b) =>
            new Date(b?.createdAt || 0) -
            new Date(a?.createdAt || 0),
        );
        break;
    }

    return filtered;
  }, [
    safeProducts,
    search,
    sort,
    filters.collections,
    filters.categories,
    filters.materials,
    filters.colors,
  ]);

  /*
   * ============================================================
   * FILTER OPTIONS
   * ============================================================
   */

  const collections = useMemo(() => {
    return [
      ...new Set(
        safeProducts
          .map((product) => product?.collection?.name)
          .filter(Boolean),
      ),
    ];
  }, [safeProducts]);

  const categories = useMemo(() => {
    return [
      ...new Set(
        safeProducts
          .map((product) => product?.category?.name)
          .filter(Boolean),
      ),
    ];
  }, [safeProducts]);

  const materials = useMemo(() => {
    return [
      ...new Set(
        safeProducts
          .map((product) => product?.material)
          .filter(Boolean),
      ),
    ];
  }, [safeProducts]);

  const colors = useMemo(() => {
    return [
      ...new Set(
        safeProducts
          .map((product) => product?.colorFamily)
          .filter(Boolean),
      ),
    ];
  }, [safeProducts]);

  /*
   * ============================================================
   * URL PARAMS SYNC
   * ============================================================
   */

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    if (sort !== "latest") {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }

    if (filters.collections.length) {
      params.set(
        "collection",
        filters.collections.join(","),
      );
    } else {
      params.delete("collection");
    }

    if (filters.categories.length) {
      params.set(
        "category",
        filters.categories.join(","),
      );
    } else {
      params.delete("category");
    }

    if (filters.materials.length) {
      params.set(
        "material",
        filters.materials.join(","),
      );
    } else {
      params.delete("material");
    }

    if (filters.colors.length) {
      params.set(
        "color",
        filters.colors.join(","),
      );
    } else {
      params.delete("color");
    }

    if (currentPage > 1) {
      params.set("page", String(currentPage));
    } else {
      params.delete("page");
    }

    setSearchParams(params, {
      replace: true,
    });
  }, [
    search,
    sort,
    filters.collections,
    filters.categories,
    filters.materials,
    filters.colors,
    currentPage,
    searchParams,
    setSearchParams,
  ]);

  /*
   * ============================================================
   * RESET PAGE WHEN FILTERS CHANGE
   * ============================================================
   */

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    sort,
    filters.collections,
    filters.categories,
    filters.materials,
    filters.colors,
  ]);

  /*
   * ============================================================
   * RESET ALL FILTERS
   * ============================================================
   */

  const resetFilters = () => {
    setSearch("");
    setSort("latest");

    setFilters({
      collections: [],
      categories: [],
      materials: [],
      colors: [],
    });

    setCurrentPage(1);
  };

  /*
   * ============================================================
   * RETURN
   * ============================================================
   */

  return {
    filteredProducts,

    search,
    setSearch,

    sort,
    setSort,

    filters,
    setFilters,

    filterOpen,
    setFilterOpen,

    currentPage,
    setCurrentPage,

    collections,
    categories,
    materials,
    colors,

    resetFilters,
  };
};

export default useProductListing;