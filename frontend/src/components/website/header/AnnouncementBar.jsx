import { useEffect, useState } from "react";
import {
  ChevronRight,
  Truck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const announcements = [
  {
    icon: <Sparkles size={16} />,
    title: "Luxury Home Furnishings Crafted for Modern Living",
    button: "Explore Collection",
    link: "/collections",
  },
  {
    icon: <Truck size={16} />,
    title: "Worldwide Shipping Available for Wholesale Orders",
    button: "Become a Trade Partner",
    link: "/wholesale",
  },
  {
    icon: <ShieldCheck size={16} />,
    title: "Premium Quality • Secure Payments • Trusted Exporter",
    button: "View Catalogue",
    link: "/catalogue",
  },
];

export default function AnnouncementBar() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % announcements.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden border-b border-[#ece7df] bg-[#0D3A2F] text-white">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-center px-4">

        <div
          key={active}
          className="flex animate-fade items-center gap-3 text-center text-[12px] font-medium"
        >
          <span className="text-[#d4af37]">
            {announcements[active].icon}
          </span>

          <span>{announcements[active].title}</span>

          <Link
            to={announcements[active].link}
            className="group ml-2 flex items-center gap-1 font-semibold text-[#d4af37] transition-all hover:text-white"
          >
            {announcements[active].button}

            <ChevronRight
              size={15}
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}