import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind3
} from "unocss";

export default defineConfig({
  presets: [presetWind3(), presetAttributify(), presetIcons()],
  theme: {
    colors: {
      brand: {
        primary: "#617d71",
        secondary: "#f1f5f4",
        background: "#f9fafa",
        error: "#9d2e13"
      }
    }
  },
  shortcuts: {
    "text-cut": "text-ellipsis overflow-hidden whitespace-nowrap",
    "brand-btn":
      "rounded-sm cursor-pointer p-2 hover:text-brand-primary hover:bg-brand-secondary",
    "form-item": "focus:outline-none focus:ring-1 focus:ring-brand-primary"
  }
});
