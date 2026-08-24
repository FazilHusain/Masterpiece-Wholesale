import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function WebsiteFavicon() {
  const favicon = useSelector(
    (state) => state.websiteSetting.settings?.favicon
  );

  useEffect(() => {
    if (!favicon) return;

    let faviconLink = document.querySelector(
      "link[rel='icon']"
    );

    if (!faviconLink) {
      faviconLink = document.createElement("link");
      faviconLink.rel = "icon";
      document.head.appendChild(faviconLink);
    }

    faviconLink.type = "image/png";
    faviconLink.href = favicon;
  }, [favicon]);

  return null;
}