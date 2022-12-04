/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				greenBlue: "#29ad7d",
				darkBlue: "#1e3144",
				lightWhite: "#f5f5f5",
				darkWhite: "#c1c6c8",
			},

			gridTemplateRows: {
				asideGrid: "auto 1fr auto",
			},

			gridTemplateColumns: {
				profileGrid: "repeat(6, 4rem)",
			},

			borderRadius: {
				senderRadius: "6px 0 6px 6px",
				reciverRadius: "0 6px 6px 6px",
			},
		},
	},
	plugins: [],
};
