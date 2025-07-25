import pluginNext from "@next/eslint-plugin-next";
import zjutjh from "@zjutjh/eslint-config";

export default zjutjh(
  {
    prettier: {
      prettierSelfOptions: {
        printWidth: 80
      }
    },
    ignores: [".next", "out", "dist-crx"]
  },
  {
    plugins: {
      "@next/next": pluginNext
    }
  }
);
