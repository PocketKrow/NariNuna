// Apply Vue template linting and TypeScript parsing together; formatting exceptions preserve authored markup without disabling correctness rules.
import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import vue from "eslint-plugin-vue";
import astro from "eslint-plugin-astro";

export default tseslint.config(
  { ignores: ["dist/**", "node_modules/**", ".npm-cache/**", ".astro/**"] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs["flat/recommended"],
  ...astro.configs.recommended,
  {
    files: ["**/*.{js,mjs}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    }
  },
  {
    files: ["**/*.{ts,vue,astro}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { parser: tseslint.parser }
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/attributes-order": "off",
      "vue/max-attributes-per-line": "off",
      "vue/html-self-closing": "off",
      "vue/singleline-html-element-content-newline": "off"
    }
  }
);
