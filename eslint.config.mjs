import zjutjh from "@zjutjh/eslint-config";

export default zjutjh({
  prettier: {
    prettierSelfOptions: {
      printWidth: 80
    }
  },
  ignores: ["dist", "dist-crx", "node_modules"]
});
