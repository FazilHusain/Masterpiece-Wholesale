import {
  LayoutDashboard,
  ClipboardList,
  User,
  LogOut,
} from "lucide-react";

import { tradeLogout } from "../../../../services/trade.service";

const menus = [
  {
    key: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "quick-order",
    title: "My Quick Orders",
    icon: ClipboardList,
  },
  {
    key: "sample-order",
    title: "My Sample Orders",
    icon: ClipboardList,
  },
  {
    key: "profile",
    title: "My Profile",
    icon: User,
  },
];

export default function TradeSidebar({
  user,
  activeTab,
  setActiveTab,
}) {
  return (
    <aside className="w-full lg:w-[270px] bg-white border-r border-[#E8DFD2] lg:min-h-screen">

      {/* Header */}

      <div className="border-b border-[#E8DFD2] p-6">
        <h2 className="font-cormorant text-4xl text-[#173724]">
          Trade Portal
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Welcome back,
        </p>

        <h3 className="font-semibold text-[#173724]">
          {user?.firstName}
        </h3>
      </div>

      {/* Menu */}

      <div className="p-5">

        <div className="flex flex-col gap-2">

          {menus.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition ${
                  activeTab === item.key
                    ? "bg-[#173724] text-white"
                    : "text-[#173724] hover:bg-[#F6F2EA]"
                }`}
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.title}
                </span>

              </button>
            );
          })}

        </div>

        <button
          onClick={tradeLogout}
          className="mt-10 flex w-full items-center gap-3 rounded-lg border border-red-200 px-4 py-3 text-red-600 hover:bg-red-50"
        >
          <LogOut size={20} />

          Logout
        </button>

      </div>

      {/* Footer */}

      <div className="border-t border-[#E8DFD2] p-5">

        <div className="rounded-lg bg-[#F8F5EF] p-4">

          <p className="text-xs uppercase tracking-widest text-gray-500">
            Account Status
          </p>

          <p className="mt-2 font-semibold text-green-700">
            Active Trade Member
          </p>

        </div>

      </div>

    </aside>
  );
}