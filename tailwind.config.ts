import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--josefin-sans)", "sans-serif"],
      },
      colors: {
        // Primary
        Primary: "hsl(220, 98%, 61%)",
        // Light theme
        L_VeryLightGray: "hsl(0, 0%, 98%)",
        L_VeryLightGrayishBlue: "hsl(236, 33%, 92%)",
        L_LightGrayishBlue: "hsl(233, 11%, 84%)",
        L_DarkGrayishBlue: "hsl(236, 9%, 61%)",
        L_VeryDarkGrayishBlue: "hsl(235, 19%, 35%)",
        // Dark Mode
        D_VeryDarkBlue: "hsl(235, 21%, 11%)",
        D_VeryDarkDesaturatedBlue: "hsl(235, 24%, 19%)",
        D_LightGrayishBlue: "hsl(234, 39%, 85%)",
        D_LightGrayishBlueHover: "hsl(236, 33%, 92%)",
        D_DarkGrayishBlue: "hsl(234, 11%, 52%)",
        D_VeryDarkGrayishBlue: "hsl(233, 14%, 35%)",
        D_VeryDarkGrayishBlueDarker: "hsl(233, 14%, 35%)",
        // Check mark
        CheckFrom: "hsl(192, 100%, 67%)",
        CheckTo: "hsl(280, 87%, 65%)",
      },
      backgroundImage: {
        "mobile-light": "url('/bg-mobile-light.jpg')",
        "mobile-dark": "url('/bg-mobile-dark.jpg')",
        "desktop-light": "url('/bg-desktop-light.jpg')",
        "desktop-dark": "url('/bg-desktop-dark.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
