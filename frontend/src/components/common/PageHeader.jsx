import { useLocation } from "react-router-dom";
import Button from "../ui/Button";

const pageConfig = {
  "/admin/dashboard": {
    title: "Dashboard",
    subtitle: "Welcome back to His Masterpiece",
  },
  "/admin/collections": {
    title: "Collections",
    subtitle: "Manage your product collections",
  },
  "/admin/collections/create": {
    title: "Create Collection",
    subtitle: "Add a new luxury collection",
  },
  "/admin/categories": {
    title: "Categories",
    subtitle: "Manage product categories",
  },
  "/admin/products": {
    title: "Products",
    subtitle: "Manage luxury products",
  },
};

export default function PageHeader({
  action,
  actionText,
  onAction,
}) {
  const { pathname } = useLocation();

  const page = pageConfig[pathname] || {
    title: "Dashboard",
    subtitle: "",
  };

  return (
    <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-[#12312B]">
          {page.title}
        </h1>

        <p className="mt-2 text-gray-500">
          {page.subtitle}
        </p>
      </div>

      {action && (
        <Button
          onClick={onAction}
          className="w-full md:w-auto"
        >
          {actionText}
        </Button>
      )}
    </div>
  );
}