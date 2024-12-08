import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginJest from "eslint-plugin-jest";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["jest.config.json", "dist", "mocks", "coverage"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { jest: pluginJest },
  },
  {
    languageOptions: {
      globals: {
        ...pluginJest.environments.globals.globals,
        ...globals.browser,
      },
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
