import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor:{
        "asGray" : "#384B52",
        "gray" : "#5D7581",
        "skyBlue" : "#D8E6EF",
        "yellow" : "#FCEDB2",
        "peach" : "#F4BC9B",
      },
      textColor:{
        "white": "#F5F5F5",
        "black": "#0F0E0E"
      },
    },
    fontFamily: {
      'JotiOne': ['Logo', 'sans-serif'],

      'regular': ['MontserratRegular', 'sans-serif'],
      'medium': ['MontserratMedium', 'sans-serif'],
      'semiBold': ['MontserratSemiBold', 'sans-serif'],
      'bold': ['MontserratBold', 'sans-serif'],
      'black': ['MontserratBlack', 'sans-serif'],
      
      'robotoBlack': ['robotoBlack', 'sans-serif'],
      'robotoMedium': ['robotoMeduim', 'sans-serif'],
      'robotoRegular': ['robotoRegular', 'sans-serif'],
    }
  },
  plugins: [
    require('tailwind-scrollbar')({ preferredStrategy: 'pseudoelements' }),
  ],
};
export default config;
