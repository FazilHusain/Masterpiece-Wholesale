import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const ProductBreadcrumb = ({ product }) => {
  return (
    <section className="border-b border-gray-200 bg-white">

      <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-5 text-sm text-gray-500">

        <Link
          to="/"
          className="transition hover:text-[#183425]"
        >
          Home
        </Link>

        <ChevronRight size={16} />

        <Link
          to="/collections"
          className="transition hover:text-[#183425]"
        >
          Collections
        </Link>

        <ChevronRight size={16} />

        <Link
          to={`/collections/${product.collection.slug}`}
          className="transition hover:text-[#183425]"
        >
          {product.collection.name}
        </Link>

        <ChevronRight size={16} />

        <Link
          to={`/categories/${product.category.slug}`}
          className="transition hover:text-[#183425]"
        >
          {product.category.name}
        </Link>

        <ChevronRight size={16} />

        <span className="font-medium text-[#183425]">
          {product.name}
        </span>

      </div>

    </section>
  );
};

export default ProductBreadcrumb;