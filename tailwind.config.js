const path = require("path");

// resolves correctly in monorepos, pnpm and hoisted node_modules alike.
const fieldopsUi = path.dirname(
  require.resolve("react-native-fieldops-ui/package.json"),
);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // "./node_modules/react-native-fieldops-ui/lib/module/**/*.{js,jsx,ts,tsx}", // load react-native-fieldops-ui libraries component
    `${fieldopsUi}/lib/**/*.{js,jsx,ts,tsx}`,
  ],
  presets: [
    require("nativewind/preset"),
    require("react-native-fieldops-ui/preset"),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
