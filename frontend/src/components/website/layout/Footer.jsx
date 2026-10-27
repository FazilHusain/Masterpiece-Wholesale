import { useEffect } from "react";

import {
  MapPin,
  MessageCircle,
  Phone,
  Mail,
  PinIcon,
  ExternalLink,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPinterestP,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchWebsiteSettings } from "../../../redux/websiteSetting/websiteSettingThunk";
import { fetchWebsiteCollections } from "../../../redux/websiteCollection";

export default function Footer() {
  const dispatch = useDispatch();

  const { settings = {} } = useSelector((state) => state.websiteSetting);

  const { collections = [] } = useSelector((state) => state.websiteCollection);

  /*
   * Fetch data if it is not already available.
   *
   * If DesktopHeader has already fetched these APIs,
   * Redux state will already contain the data.
   */
  useEffect(() => {
    if (!settings || Object.keys(settings).length === 0) {
      dispatch(fetchWebsiteSettings());
    }

    if (!collections?.length) {
      dispatch(fetchWebsiteCollections());
    }
  }, [dispatch, settings, collections?.length]);

  /*
   * ==========================
   * Dynamic Settings
   * ==========================
   */

  const websiteName = settings?.websiteName || "HIS MASTERPIECE";

  const websiteTagline =
    settings?.websiteTagline || "Design-led handcrafted home furnishings.";

  const logo =
    settings?.footerLogo || settings?.logo || "/admin/logo/logo.jpeg";

  const phone = settings?.phone || "";

  const email = settings?.email || "";

  const whatsapp = settings?.whatsapp || phone || "";

  const address = settings?.address || "";

  const googleMap = settings?.googleMap || "";

  const facebook = settings?.facebook || "";

  const instagram = settings?.instagram || "";

  const linkedin = settings?.linkedin || "";

  const youtube = settings?.youtube || "";

  const pinterest = settings?.pinterest || "";

  /*
   * ==========================
   * WhatsApp Number
   * ==========================
   */

  const getWhatsAppNumber = (value) => {
    if (!value) return "";

    let digits = value.replace(/\D/g, "");

    /*
     * If admin enters 10 digit Indian number,
     * automatically add India country code.
     */
    if (digits.length === 10) {
      digits = `91${digits}`;
    }

    return digits;
  };

  const whatsappNumber = getWhatsAppNumber(whatsapp);

  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}` : "#";

  /*
   * ==========================
   * Phone URL
   * ==========================
   */

  const phoneUrl = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#";

  /*
   * ==========================
   * Email URL
   * ==========================
   */

  const emailUrl = email ? `mailto:${email}` : "#";

  /*
   * ==========================
   * Social Links
   * ==========================
   */

  const socialLinks = [
    {
      name: "Instagram",
      url: instagram,
      icon: FaInstagram,
    },
    {
      name: "Facebook",
      url: facebook,
      icon: FaFacebookF,
    },
    {
      name: "LinkedIn",
      url: linkedin,
      icon: FaLinkedinIn,
    },
    {
      name: "YouTube",
      url: youtube,
      icon: FaYoutube,
    },
    {
      name: "Pinterest",
      url: pinterest,
      icon: FaPinterestP,
    },
  ].filter((item) => item.url);

  /*
   * ==========================
   * Collections
   * ==========================
   */

  const dynamicCollections = collections?.slice(0, 6) || [];

  return (
    <footer className="bg-[#173724] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-14">
        {/* ==========================
            Main Footer
        ========================== */}

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          {/* ==========================
              Company
          ========================== */}

          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <img
                src={logo}
                alt={websiteName}
                className="mb-5 h-14 w-auto max-w-[220px] object-contain"
              />
            </Link>

            <h2 className="sr-only">{websiteName}</h2>

            <p className="max-w-md text-[13px] leading-6 text-gray-300">
              {websiteTagline}
            </p>

            {/* ==========================
                Social
            ========================== */}

            {socialLinks.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2.5">
                {socialLinks.map(({ name, url, icon: Icon }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="rounded border border-white/15 p-2.5 text-white transition hover:border-[#B48A2C] hover:bg-[#B48A2C]"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            )}

            {/* ==========================
                Trade Line
            ========================== */}

            {phone && (
              <a
                href={phoneUrl}
                className="mt-6 block max-w-sm rounded border border-[#29513a] bg-[#1b432d] p-3.5 transition hover:border-[#B48A2C]"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle
                    className="shrink-0 text-[#B48A2C]"
                    size={20}
                  />

                  <span className="text-[13px] font-semibold">
                    Trade Line: {phone}
                  </span>
                </div>
              </a>
            )}
          </div>

          {/* ==========================
              Collections
          ========================== */}

          <div>
            <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B48A2C]">
              Collections
            </h3>

            <ul className="space-y-2.5 text-[13px] text-gray-300">
              {dynamicCollections.length > 0 ? (
                dynamicCollections.map((collection) => (
                  <li key={collection._id}>
                    <Link
                      to={`/collections/${collection.slug}`}
                      className="transition hover:text-white"
                    >
                      {collection.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No collections available</li>
              )}
            </ul>
          </div>

          {/* ==========================
              Trade
          ========================== */}

          <div>
            <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B48A2C]">
              Trade
            </h3>

            <ul className="space-y-2.5 text-[13px] text-gray-300">
              <li>
                <Link to="/wholesale" className="transition hover:text-white">
                  Wholesale
                </Link>
              </li>

              <li>
                <Link to="/trade-login" className="transition hover:text-white">
                  Trade Login
                </Link>
              </li>

              <li>
                <Link to="/catalog" className="transition hover:text-white">
                  View Catalog
                </Link>
              </li>

              <li>
                <Link to="/look-books" className="transition hover:text-white">
                  Look Books
                </Link>
              </li>

              <li>
                <Link
                  to="/style-guides"
                  className="transition hover:text-white"
                >
                  Style Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* ==========================
    Customer Care
========================== */}

          <div>
            <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B48A2C]">
              Customer Care
            </h3>

            <ul className="space-y-2.5 text-[13px] text-gray-300">
              <li>
                <Link to="/shipping" className="transition hover:text-white">
                  Shipping Information
                </Link>
              </li>

              <li>
                <Link
                  to="/returns-exchanges"
                  className="transition hover:text-white"
                >
                  Returns & Exchanges
                </Link>
              </li>

              <li>
                <Link
                  to="/terms-and-conditions"
                  className="transition hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy-policy"
                  className="transition hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link to="/faqs" className="transition hover:text-white">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* ==========================
              Contact
          ========================== */}

          <div>
            <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B48A2C]">
              Contact
            </h3>

            <ul className="space-y-3 text-[13px] text-gray-300">
              {/* Phone */}

              {phone && (
                <li>
                  <a
                    href={phoneUrl}
                    className="flex items-start gap-3 transition hover:text-white"
                  >
                    <Phone size={16} className="mt-0.5 shrink-0" />

                    <span>{phone}</span>
                  </a>
                </li>
              )}

              {/* Email */}

              {email && (
                <li>
                  <a
                    href={emailUrl}
                    className="flex items-start gap-3 break-all transition hover:text-white"
                  >
                    <Mail size={16} className="mt-0.5 shrink-0" />

                    <span>{email}</span>
                  </a>
                </li>
              )}

              {/* Address */}

              {address && (
                <li>
                  {googleMap ? (
                    <a
                      href={googleMap}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 transition hover:text-white"
                    >
                      <MapPin size={16} className="mt-0.5 shrink-0" />

                      <span>{address}</span>

                      <ExternalLink
                        size={12}
                        className="mt-1 shrink-0 opacity-60"
                      />
                    </a>
                  ) : (
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="mt-0.5 shrink-0" />

                      <span>{address}</span>
                    </div>
                  )}
                </li>
              )}

              {/* WhatsApp */}

              {whatsappNumber && (
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 transition hover:text-white"
                  >
                    <MessageCircle size={16} className="mt-0.5 shrink-0" />

                    <span>WhatsApp Us</span>
                  </a>
                </li>
              )}

              {/* Trade Access */}

              <li>
                <Link
                  to="/trade-login"
                  className="flex items-start gap-3 transition hover:text-white"
                >
                  <PinIcon size={16} className="mt-0.5 shrink-0" />

                  <span>Apply for Trade Access</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ==========================
            Bottom
        ========================== */}

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-[11px] text-gray-400">
          © {new Date().getFullYear()} {websiteName}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
