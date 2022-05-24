module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
            },
            boxShadow: {
                "3xl": "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                "4xl": "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
            },
        },
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#f7c02d",
                    secondary: "#1e1e1e",
                    accent: "#37cdbe",
                    neutral: "#4c4d43",
                    "base-100": "#f1f1f1",
                },
            },
        ],
    },
    plugins: [require("daisyui")],
};
