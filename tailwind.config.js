const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./app/routes/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      teal: colors.teal,
      current: "currentColor",
      transparent: "transparent",
      black: "#000",
      fushia: "hsl(282, 83%, 52%)",
      white: "white",
      blue: "hsl(230, 76%, 59%)",
      "blue-dark": "hsl(230, 31%, 31%)",
      turquoise: "hsl(204, 94%, 68%)",
      "gray-100": "hsl(230, 100%, 97%)",
      "gray-100-lighter": "hsl(230, 100%, 91%)",
      "gray-200": "hsl(230, 86%, 97%)",
      "gray-300": "hsla(230, 60%, 98%, 1)",
      "gray-500": "hsla(224, 20%, 49%, 1)",
      "gray-700": "hsla(231, 33%, 34%, 1)",
      orange: "hsla(14, 83%, 74%, 1)",
      "fushia-light": "hsl(282, 90%, 66%)",
      "blue-light": "hsla(230, 91%, 73%, 1)",
      "gray-700-lighter": "hsla(231, 26%, 52%, 1)",
      red: "hsla(0, 67%, 53%, 1)",
      "red-lighter": "hsla(0, 69%, 72%, 1)",
      "red-lighter": "hsla(0, 69%, 72%, 1)",
    },
    extend: {
      borderRadius: {
        DEFAULT: "0.63rem",
        input: "5px",
      },
      backgroundImage: {
        "theme-gradient-lg":
          "url('/assets/suggestions/desktop/background-header.png')",
        "theme-gradient-md":
          "url('/assets/suggestions/tablet/background-header.png')",
        "theme-gradient":
          "url('/assets/suggestions/mobile/background-header.png')",
      },
      height: {
        "100-offset": "calc(100% - 3.5rem)",
      },
      fontFamily: {
        sans: ["Jost", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant("aria-selected", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `aria-selected${separator}${className}`
          )}[aria-selected='true']`;
        });
      });
      addVariant("aria-expanded", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `aria-expanded${separator}${className}`
          )}[aria-expanded='true']`;
        });
      });
    }),
  ],
};
