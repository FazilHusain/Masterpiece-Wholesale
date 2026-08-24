import { useEffect, useState } from "react";
import {
  X,
  ChevronDown,
  ChevronRight,
  Phone,
  MessageCircle,
  User,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchWebsiteCollections,
} from "../../../redux/websiteCollection";

import {
  fetchWebsiteCategories,
} from "../../../redux/websiteCategory";

import { fetchWebsiteProducts } from "../../../redux/websiteProduct/websiteProductThunk";

export default function MobileDrawer({ open, onClose }) {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(null);

  const { collections } = useSelector(
    (state) => state.websiteCollection
  );

  const { categories } = useSelector(
    (state) => state.websiteCategory
  );

  const { products } = useSelector(
    (state) => state.websiteProduct
  );

  useEffect(() => {
    dispatch(fetchWebsiteCollections());
    dispatch(fetchWebsiteCategories());
    dispatch(fetchWebsiteProducts());
  }, [dispatch]);

  if (!open) return null;

  const navigation = [
    {
      label: "Collections",
      path: "/collections",
      megaMenu: true,
    },
    {
      label: "Products",
      path: "/products",
      megaMenu: true,
    },
    {
      label: "Categories",
      path: "/categories",
      megaMenu: true,
    },
    {
      label: "About",
      path: "/about",
    },
    {
      label: "Journal",
      path: "/journal",
    },
    {
      label: "Wholesale",
      path: "/wholesale",
    },
    {
      label: "Contact",
      path: "/contact",
    },
  ];

  const toggleMenu = (label) => {
    setExpanded(expanded === label ? null : label);
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm"
      />

      <div className="fixed left-0 top-0 z-[999] h-screen w-[330px] overflow-y-auto bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-200 p-5">

          <img
            src="/admin/logo/logo.jpeg"
            alt="His Masterpiece"
            className="h-11"
          />

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Menu */}

        <div className="p-5">

          <ul className="space-y-1">

            {navigation.map((item) => (
              <li key={item.label}>

                {item.megaMenu ? (
                  <>
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-[13px] font-medium hover:bg-[#f8f6f2]"
                    >
                      {item.label}

                      <ChevronDown
                        size={18}
                        className={`transition ${
                          expanded === item.label
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {expanded === item.label && (
                      <div className="ml-3 mt-2 border-l border-[#ece7df] pl-4">

                        {(item.label === "Collections"
                          ? collections
                          : item.label === "Categories"
                          ? categories
                          : products.slice(0, 10)
                        ).map((data) => (
                          <Link
                            key={data._id}
                            to={`${item.path}/${data.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-2 py-2 text-[12px] text-[#555] transition hover:text-[#9d7748]"
                          >
                            <ChevronRight size={14} />
                            {data.name}
                          </Link>
                        ))}

                        <Link
                          to={item.path}
                          onClick={onClose}
                          className="mt-3 inline-block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9d7748]"
                        >
                          View All →
                        </Link>

                      </div>
                    )}

                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-3 text-[13px] transition ${
                        isActive
                          ? "bg-[#f8f6f2] text-[#9d7748]"
                          : "hover:bg-[#f8f6f2]"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )}

              </li>
            ))}

          </ul>

          <Link
            to="/trade-login"
            onClick={onClose}
            className="mt-8 block rounded-full bg-[#123d32] py-3 text-center text-[13px] font-semibold text-white transition hover:bg-[#9d7748]"
          >
            Trade Portal
          </Link>

          <div className="mt-8 border-t border-[#ece7df] pt-6">

            <Link
              to="/profile"
              onClick={onClose}
              className="mb-4 flex items-center gap-3 text-[13px]"
            >
              <User size={18} />
              My Account
            </Link>

            <a
              href="tel:+919876543210"
              className="mb-4 flex items-center gap-3 text-[13px]"
            >
              <Phone size={18} />
              +91 98765 43210
            </a>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-[13px]"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>

          </div>

        </div>

      </div>
    </>
  );
}