export default {
  plugins: {
    "@unocss/postcss": {
      content: ["**/*.{html,js,ts,jsx,tsx}"]
    },
    /**
     * Use `import "xxx" layer(reset)` in nextjs
     * @see https://github.com/vercel/next.js/issues/55763#issuecomment-1749603833
     */
    "postcss-import": {},

    /**
     * Inherit nextjs builtin transformations
     * @see https://nextjs.org/docs/pages/guides/post-css#customizing-plugins
     */
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      content: ["**/*.{html,js,ts,jsx,tsx}"],
      autoprefixer: {
        flexbox: "no-2009"
      },
      stage: 3,
      features: {
        "custom-properties": false
      }
    }
    /** --- */
  }
};
