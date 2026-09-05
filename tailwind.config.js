/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/index.tsx", "./src/components/**/*.{js,jsx,ts,tsx}"],
  presets: [
    require("nativewind/preset"),
    require("react-native-fieldops-ui/preset"),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
