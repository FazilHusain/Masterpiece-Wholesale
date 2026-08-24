import { Menu, Bell, Search, ChevronDown } from "lucide-react";

export default function Header({
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <header className="sticky top-0 z-40 flex h-16 md:h-20 items-center justify-between border-b border-[#E8E2D9] bg-white px-4 md:px-6 lg:px-8 shadow-sm">

      {/* Left */}
      <div className="flex items-center gap-3 md:gap-5 min-w-0">

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-xl border border-[#E8E2D9] p-2 hover:bg-[#F8F6F2] lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold text-[#12312B] md:text-2xl">
            Dashboard
          </h1>

          <p className="hidden text-sm text-gray-500 md:block">
            Welcome back to His Masterpiece
          </p>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-2 md:gap-4">

        {/* Search */}
        <div className="relative hidden xl:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            placeholder="Search..."
            className="h-11 w-72 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] pl-11 pr-4 outline-none focus:border-[#B68C2F]"
          />
        </div>

        {/* Notification */}

        <button className="relative hidden sm:flex h-11 w-11 items-center justify-center rounded-xl border border-[#E8E2D9] hover:bg-[#FAF8F5]">

          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

        </button>

        {/* Profile */}

        <button className="flex items-center gap-2 rounded-xl border border-[#E8E2D9] px-2 py-2 md:px-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#12312B] text-sm font-semibold text-white">
            A
          </div>

          <div className="hidden lg:block text-left">
            <p className="text-sm font-semibold text-[#12312B]">
              Admin
            </p>

            <p className="text-xs text-gray-500">
              Super Admin
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden lg:block"
          />

        </button>

      </div>

    </header>
  );
}