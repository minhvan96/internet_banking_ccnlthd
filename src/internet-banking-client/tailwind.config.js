module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        backgroundColor: (theme) => ({
          ...theme("colors"),
          "orange-hover" : "#fb923c",
        }),
        maxHeight: {
          128: "32rem",
        },
        width: {
          128: "32rem",
          almost: "95vw",
          login: "500px",
        },
        height: {
          mid: "45vh",
          fill: "100vh",
        },
        scale: {
          300: "3.00",
        },
        keyframes: {
          "fade-in-out": {
            "0%": {
              opacity: "0",
            },
            "50%": {
              opacity: "1",
            },
            "100%": {
              opacity: "0",
            },
          },
        },
        animation: {
          "fade-in-out": "fade-in-out 2s infinite",
        },
      },
    },
    plugins: [],
  };
  