import { useState } from "react";

import AnnouncementBar from "../header/AnnouncementBar";
import DesktopHeader from "../header/DesktopHeader";
import MobileHeader from "../header/MobileHeader";
import MobileDrawer from "../header/MobileDrawer";
import SearchOverlay from "../header/SearchOverlay";

export default function WebsiteHeader() {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>

      <AnnouncementBar />

      <DesktopHeader
        onSearchOpen={() => setSearchOpen(true)}
      />

      <MobileHeader
        onMenuOpen={() => setMobileOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
      />

      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

    </>
  );
}