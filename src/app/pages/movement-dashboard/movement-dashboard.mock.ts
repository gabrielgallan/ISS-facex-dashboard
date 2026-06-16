export const movementMetrics = {
	totalMovements: 1842,
	peakCamera: {
		name: 'Câmera 1',
		area: 'Entrada principal',
		movements: 742,
	},
	peakHour: {
		label: '12:00',
		movements: 286,
	},
	unknownRate: 18.4,
}

export const cameraMovementRanking = [
	{ camera: 'Câmera 1', area: 'Entrada principal', movements: 742 },
	{ camera: 'Câmera 2', area: 'Recepção', movements: 618 },
	{ camera: 'Câmera 3', area: 'Estacionamento', movements: 482 },
]

export const movementTimeline = []

export const cameraActivityHeatmap = {
	camera: 'Câmera 1',
	area: 'Entrada principal',
	cells: [
		12, 18, 24, 30, 20, 14, 16, 38, 62, 76, 44, 19, 21, 58, 91, 100, 69, 28, 18, 42, 78, 84, 51, 23,
		10, 22, 34, 39, 25, 12,
	],
}

export const movementComposition = [
	{
		camera: 'Câmera 1',
		area: 'Entrada principal',
		movements: 742,
		variation: 12.8,
		averageConfidence: 96.2,
		status: 'Alta atividade',
	},
	{
		camera: 'Câmera 2',
		area: 'Recepção',
		movements: 618,
		variation: 4.6,
		averageConfidence: 94.7,
		status: 'Fluxo estável',
	},
	{
		camera: 'Câmera 3',
		area: 'Estacionamento',
		movements: 482,
		variation: -3.1,
		averageConfidence: 92.4,
		status: 'Menor fluxo',
	},
]
