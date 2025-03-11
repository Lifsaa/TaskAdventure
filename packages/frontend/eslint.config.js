import js from "@eslint/js";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
