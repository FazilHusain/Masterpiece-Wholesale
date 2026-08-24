import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Shapes,
  ShoppingBag,
  ClipboardList,
  FileText,
  Image,
  Settings,
  Users,
  LogOut,
  Mail,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth/authSlice";

const menuItems = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    title: "Collections",
    path: "/admin/collections",
    icon: FolderTree,
  },
  {
    title: "Categories",
    path: "/admin/categories",
    icon: Shapes,
  },
  {
    title: "Sample Orders",
    path: "/admin/sample-orders",
    icon: ShoppingBag,
  },
  {
    title: "Contacts",
    path: "/admin/contact",
    icon: Mail,
  },
  {
    title: "Wholesale Applications",
    path: "/admin/wholesale",
    icon: ClipboardList,
  },
  {
    title: "Quick Order",
    path: "/admin/quick-orders",
    icon: ShoppingBag,
  },
  {
    title: "Journal",
    path: "/admin/journal",
    icon: FileText,
  },
  {
    title: "Banners",
    path: "/admin/banner",
    icon: Image,
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Admin Management",
    path: "/admin/admins",
    icon: Users,
  },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    dispatch(logout());
    navigate("/admin/login", { replace: true });
  };

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-80 flex-col border-r border-[#E8E2D9] bg-white">
      {/* Logo */}
      <div className="border-b border-[#E8E2D9] px-8 py-6">
        <img
          src="/admin/logo/logo.jpeg"
          alt="His Masterpiece"
          className="mx-auto h-14 w-auto object-contain"
        />

        <h2 className="mt-4 text-center text-xl font-semibold text-[#12312B]">
          His Masterpiece
        </h2>

        <p className="mt-1 text-center text-sm text-gray-500">Admin Panel</p>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                    isActive
                      ? "bg-[#12312B] text-white shadow-md"
                      : "text-gray-700 hover:bg-[#F8F6F2] hover:text-[#12312B]"
                  }`
                }
              >
                <Icon size={20} />

                <span className="text-sm font-medium">{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="border-t border-[#E8E2D9] p-4">
        <button
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut size={20} />

          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
