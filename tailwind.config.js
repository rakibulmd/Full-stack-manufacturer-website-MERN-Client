module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
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
