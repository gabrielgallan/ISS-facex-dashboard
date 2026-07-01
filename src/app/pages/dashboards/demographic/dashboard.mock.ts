export const cardMock = {
	detections: {
		amount: 1289,
	},
	male: {
		amount: 782,
		percent: 0.7,
	},
	female: {
		amount: 568,
		percent: 0.3,
	},
	confidence: {
		amount: 0.99,
	},
}

export const chartMock = {
	gender: [
		{ label: '7h', male: 42, female: 24 },
		{ label: '8h', male: 86, female: 58 },
		{ label: '9h', male: 114, female: 72 },
		{ label: '10h', male: 98, female: 81 },
		{ label: '11h', male: 126, female: 92 },
		{ label: '12h', male: 148, female: 116 },
		{ label: '13h', male: 132, female: 104 },
		{ label: '14h', male: 121, female: 89 },
		{ label: '15h', male: 103, female: 77 },
		{ label: '16h', male: 92, female: 64 },
		{ label: '17h', male: 74, female: 51 },
		{ label: '18h', male: 48, female: 37 },
	],
	age: [
		{ age: '0-17', male: 49, female: 23, total: 72 },
		{ age: '18-24', male: 112, female: 74, total: 186 },
		{ age: '25-34', male: 201, female: 141, total: 342 },
		{ age: '35-44', male: 246, female: 172, total: 418 },
		{ age: '45-54', male: 138, female: 103, total: 241 },
		{ age: '55+', male: 36, female: 55, total: 91 },
	],
}
