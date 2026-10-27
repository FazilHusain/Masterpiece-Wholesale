import { useRef, useEffect, useState } from "react";
import { Search, User, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { fetchWebsiteCollections } from "../../../redux/websiteCollection";

import { fetchWebsiteCategories } from "../../../redux/websiteCategory";

import { fetchWebsiteProducts } from "../../../redux/websiteProduct/websiteProductThunk";

import { fetchWebsiteSettings } from "../../../redux/websiteSetting/websiteSettingThunk";

const navigation = [
  { label: "About", path: "/about" },
  { label: "Journal", path: "/journal" },
  { label: "Wholesale", path: "/wholesale" },
  { label: "Contact", path: "/contact" },
];
const preferredCategories = ["bed linen", "bedsheet", "bed sheet", "table runner", "cushion", "curtain", "table linen", "bedding"];
const norm = (v) => String(v || "").toLowerCase().replace(/[^a-z0-9]/g, "");
const linked = (item, key, target) => {
  const values = [item?.[key], ...(Array.isArray(item?.[`${key}s`]) ? item[`${key}s`] : [])];
  return values.some(v => String(v?._id || v?.id || v || "") === String(target?._id || target?.id || target || ""));
};
const asArray = (value) => Array.isArray(value) ? value : [];
const refId = (value) => String(value?._id || value?.id || value || "");
const belongsTo = (item, field, id) => refId(item?.[field]) === refId(id);
const imageOf = (item) => {
  const image = item?.image || item?.featuredImage || item?.thumbnail || item?.gallery?.[0];
  return typeof image === "string" ? image : image?.url || image?.secure_url || "";
};
const categoryUrl = (item) => `/categories/${item.slug}`;
const productUrl = (item) => `/products/${item.slug}`;

export default function DesktopHeader({ onSearchOpen }) {
  const [sticky, setSticky] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const closeTimeout = useRef(null);

  const closeTimer = useRef(null);
  const dispatch = useDispatch();

  const { collections } = useSelector((state) => state.websiteCollection);

  const { categories } = useSelector((state) => state.websiteCategory);

  const { products } = useSelector((state) => state.websiteProduct);

  const menuCollections = asArray(collections);
  const menuCategories = asArray(categories);
  const menuProducts = asArray(products);
  // Preferred names are display priorities, NOT verified sales rankings.
  const topCategories = [...menuCategories].sort((a, b) => {
    const rank = (c) => { const i = preferredCategories.findIndex(x => norm(c.name).includes(norm(x))); return i < 0 ? 999 : i; };
    return rank(a) - rank(b);
  }).slice(0, 5);
  const menuItems = [...topCategories.map(category => ({ label: category.name, path: categoryUrl(category), megaMenu: true, category })), ...navigation];


  const { settings } = useSelector((state) => state.websiteSetting); // 👈 ADD

  const phone = settings?.phone || "+91 98765 43210"; // 👈 ADD
  const waPhone = (
    settings?.whatsapp ||
    settings?.phone ||
    "919876543210"
  ).replace(/[^0-9]/g, ""); // 👈 ADD

  const logo =
    settings?.footerLogo || settings?.logo || "/admin/logo/logo.jpeg";

  const websiteTagline =
    settings?.websiteTagline || "Luxury Home Decor Manufacturer";

  const websiteName = settings?.websiteName || "HIS MASTERPIECE";

  const openMega = (label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMega(label);
  };

  const closeMega = () => {
    closeTimer.current = setTimeout(() => {
      setActiveMega(null);
    }, 200);
  };

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    dispatch(fetchWebsiteCollections());

    dispatch(fetchWebsiteCategories());

    dispatch(fetchWebsiteProducts());

    dispatch(fetchWebsiteSettings());
  }, [dispatch]);

  const handleEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }

    setShowUser(true);
  };

  const handleLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setShowUser(false);
    }, 500); // 500ms, chahe to 800 bhi kar sakte ho
  };

  return (
    <header
      className={`hidden lg:block w-full z-50 transition-all duration-300 ${
        sticky
          ? "fixed top-0 left-0 bg-white/95 backdrop-blur-md border-b border-[#ece7df] shadow-sm animate-in slide-in-from-top duration-300"
          : "relative bg-[#fdfcf9]"
      }`}
    >
      <div className="border-b border-gray-200">
        <div className="max-w-[1500px] mx-auto h-[82px] px-8 flex items-center justify-between gap-10">
          {/* LEFT */}

          <div className="flex items-center gap-4 shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="His Masterpiece"
                className="h-18 w-18 rounded-full object-cover border border-[#e7dfd2]"
              />

              <div className="leading-tight">
                <h2
                  className="text-[30px] font-normal tracking-[0.22em]"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  {websiteName}
                </h2>

                <p className="text-[10px] uppercase tracking-[0.42em] text-gray-500">
                  {websiteTagline}
                </p>
              </div>
            </Link>
          </div>
          {/* CENTER */}

          <div className="flex-1 max-w-[380px]">
            <div className="relative">
              <input
                type="text"
                readOnly
                onFocus={onSearchOpen}
                placeholder="Search collections, categories & products..."
                className="
    w-full
    rounded-full
    border
    border-[#E6DED2]
    bg-white
    px-5
    py-[10px]
    pr-12
    text-[14px]
    text-[#183425]
    placeholder:text-[13px]
    placeholder:text-[#9A9488]
    outline-none
    transition-all
    focus:border-[#B68C2F]
    focus:ring-2
    focus:ring-[#B68C2F]/10
  "
              />

              <button
                onClick={onSearchOpen}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#111]
hover:bg-[#b38b59] text-white flex items-center justify-center transition-all duration-300 hover:bg-[#b38b59] hover:scale-105"
              >
                <Search size={18} />
              </button>
            </div>
          </div>
          {/* RIGHT */}

          <div className="flex items-center gap-5 shrink-0">
            <a
              href={`https://wa.me/${waPhone}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[15px] text-[#183425] hover:text-[#b38b59] transition"
            >
              <FaWhatsapp className="text-[#25D366]" size={22} />
              <span className="font-medium">{phone}</span>
            </a>

            {/* <Link
              to="/trade-login"
              className="rounded-full bg-[#111]
hover:bg-[#b38b59] text-white px-6 py-3 font-semibold transition-all duration-300 hover:bg-[#b38b59]"
            >
              Trade Portal
            </Link> */}

            <div
              className="relative"
              onMouseEnter={() => setShowUser(true)}
              onMouseLeave={() => setShowUser(false)}
            >
              <button className="h-11 w-11 rounded-full border-[#ece7df] flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                <User size={20} />
              </button>

              {showUser && (
                <div
                  className="absolute right-0 top-full pt-3 w-60 z-50"
                  onMouseEnter={handleEnter}
                  onMouseLeave={handleLeave}
                >
                  <div className="rounded-2xl bg-[#fdfcf9] shadow-2xl border border-gray-200 overflow-hidden">
                    <Link
                      to="/trade-login"
                      className="block px-5 py-4 hover:bg-gray-50"
                    >
                      Trade Login
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="border-b border-[#ece7df]">
          <nav className="relative border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
              <ul className="flex justify-center items-center gap-8 h-[48px]">
                {menuItems.map((item) => (
                  <li
                    key={item.label}
                    className="static"
                    onMouseEnter={() => item.megaMenu && openMega(item.label)}
                    onMouseLeave={closeMega}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `group relative flex items-center gap-1 py-3 text-[12px] uppercase tracking-[0.12em] font-medium transition-all duration-300 ${
                          isActive
                            ? "text-[#b38b59]"
                            : "text-[#2b2b2b] hover:text-[#b38b59]"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {item.label}

                          <span
                            className={`absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-[#b38b59] transition-all duration-300 ${
                              isActive
                                ? "w-8 h-[1.5px]"
                                : "w-0 h-[1.5px] group-hover:w-8"
                            }`}
                          />
                        </>
                      )}
                    </NavLink>

                    {item.megaMenu && activeMega === item.label && (
                      <div className="absolute left-0 top-full z-50 w-full pt-0" onMouseEnter={() => openMega(item.label)} onMouseLeave={closeMega}>
                        <div className="mx-auto max-h-[min(72vh,620px)] max-w-[1440px] overflow-y-auto border border-[#e9e4dc] bg-white p-5 shadow-[0_22px_45px_rgba(0,0,0,0.12)]">
                          <div className="mb-4 flex items-center justify-between border-b border-[#eee] pb-3">
                            <h3 className="text-sm font-semibold uppercase tracking-widest">{item.label}</h3>
                            <Link to={item.path} onClick={() => setActiveMega(null)} className="text-xs text-[#9d7748]">View category →</Link>
                          </div>
                          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5">
                            {menuCollections.map((collection) => {
                              const cats = menuCategories.filter(cat => linked(cat, "collection", collection) || linked(collection, "category", cat));
                              const relatedCats = cats.filter(cat => refId(cat) === refId(item.category));
                              const relatedProducts = menuProducts.filter(product => linked(product, "collection", collection) && (linked(product, "category", item.category) || relatedCats.some(cat => linked(product, "category", cat))));
                              if (!relatedCats.length && !relatedProducts.length) return null;
                              return <section key={collection._id} className="min-w-0 border-r border-[#eee] pr-3 last:border-0">
                                <Link to={`/collections/${collection.slug}`} onClick={() => setActiveMega(null)} className="mb-2 block text-[11px] font-bold uppercase tracking-wide">{collection.name}</Link>
                                {imageOf(collection) && <Link to={`/collections/${collection.slug}`} onClick={() => setActiveMega(null)}><img src={imageOf(collection)} alt={collection.name} className="mb-3 h-28 w-full object-cover" loading="lazy" /></Link>}
                                {relatedCats.map(cat => <div key={cat._id} className="mb-3">
                                  <Link to={categoryUrl(cat)} onClick={() => setActiveMega(null)} className="block text-xs font-semibold text-[#343434]">{cat.name}</Link>
                                  {imageOf(cat) && <Link to={categoryUrl(cat)} onClick={() => setActiveMega(null)}><img src={imageOf(cat)} alt={cat.name} loading="lazy" className="my-2 h-20 w-full object-cover" /></Link>}
                                </div>)}
                                <div className="space-y-1">{relatedProducts.slice(0, 6).map(product => <Link key={product._id} to={productUrl(product)} onClick={() => setActiveMega(null)} className="block truncate text-[11px] text-[#666] hover:text-[#9d7748]">{product.name}</Link>)}</div>
                              </section>;
                            })}
                          </div>
                          {!menuCollections.some(collection => menuCategories.some(cat => refId(cat) === refId(item.category) && (linked(cat, "collection", collection) || linked(collection, "category", cat))) || menuProducts.some(product => linked(product, "collection", collection) && linked(product, "category", item.category))) && <p className="py-6 text-sm text-gray-500">No linked collections found for this category.</p>}
                          <div className="mt-4 border-t border-[#eee] pt-3 text-right"><Link to={item.path} onClick={() => setActiveMega(null)} className="text-xs font-semibold text-[#9d7748]">Explore category →</Link></div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
