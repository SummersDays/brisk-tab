/* eslint-disable camelcase */
import { defineManifest } from "@crxjs/vite-plugin";

import { description, name, version } from "./package.json";

export default defineManifest({
  manifest_version: 3,
  name,
  version,
  description,
  chrome_url_overrides: {
    newtab: "index.html"
  },
  action: {
    default_popup: "crx-popup.html"
  },
  permissions: ["activeTab", "scripting", "bookmarks"],
  background: {
    service_worker: "chrome/index.ts",
    type: "module"
  }
});
