import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginNext from "@next/eslint-plugin-next";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**"]
  },
  {
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  {
    plugins: {
      "@next/next": pluginNext
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules
    }
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react/react-in-jsx-scope": "off", 
      "@typescript-eslint/no-unused-vars": "off",
      "react/no-unknown-property": "off",
      "react/no-unescaped-entities": "off"
    }
  }
];
