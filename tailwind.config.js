/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          900: "#00152e",
          700: "#001F3F",
          500: "#003366",
          300: "#336699",
          200: "#6699CC",
          100: "#B3CDE0",
        },
        secondary: {
          900: "#d90429",
          700: "#ef233c",
          500: "#ff4b5c",
          300: "#ff758f",
          200: "#ff99a6",
          100: "#ffc3cc",
        },
        neutral: {
          900: "#424242",
          700: "#757575",
          500: "#9E9E9E",
          300: "#E0E0E0",
          200: "#EEEEEE",
          100: "#F5F5F5",
        },
        background: {
          100: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
