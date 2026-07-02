export interface DemographicBreakdownItem {
	key: string
	labelKey: string
	detections: number
	percentage: number
	averageConfidence: number
	fill: string
}

export const ethnicityBreakdownMock: DemographicBreakdownItem[] = [
	{
		key: 'caucasian',
		labelKey: 'detections.labels.ethnicity.caucasian',
		detections: 418,
		percentage: 0.39,
		averageConfidence: 0.94,
		fill: 'var(--chart-1)',
	},
	{
		key: 'black',
		labelKey: 'detections.labels.ethnicity.black',
		detections: 286,
		percentage: 0.27,
		averageConfidence: 0.91,
		fill: 'var(--chart-2)',
	},
	{
		key: 'east_indian',
		labelKey: 'detections.labels.ethnicity.east_indian',
		detections: 214,
		percentage: 0.2,
		averageConfidence: 0.89,
		fill: 'var(--chart-3)',
	},
	{
		key: 'unknown',
		labelKey: 'detections.labels.ethnicity.unknown',
		detections: 148,
		percentage: 0.14,
		averageConfidence: 0.72,
		fill: 'var(--muted-foreground)',
	},
]

export const emotionBreakdownMock: DemographicBreakdownItem[] = [
	{
		key: 'neutral',
		labelKey: 'detections.labels.emotion.neutral',
		detections: 512,
		percentage: 0.48,
		averageConfidence: 0.93,
		fill: 'var(--chart-1)',
	},
	{
		key: 'happiness',
		labelKey: 'detections.labels.emotion.happiness',
		detections: 238,
		percentage: 0.22,
		averageConfidence: 0.9,
		fill: 'var(--chart-2)',
	},
	{
		key: 'surprise',
		labelKey: 'detections.labels.emotion.surprise',
		detections: 116,
		percentage: 0.11,
		averageConfidence: 0.86,
		fill: 'var(--chart-3)',
	},
	{
		key: 'sadness',
		labelKey: 'detections.labels.emotion.sadness',
		detections: 82,
		percentage: 0.08,
		averageConfidence: 0.84,
		fill: 'var(--chart-4)',
	},
	{
		key: 'anger',
		labelKey: 'detections.labels.emotion.anger',
		detections: 57,
		percentage: 0.05,
		averageConfidence: 0.82,
		fill: 'var(--chart-5)',
	},
	{
		key: 'fear',
		labelKey: 'detections.labels.emotion.fear',
		detections: 34,
		percentage: 0.03,
		averageConfidence: 0.8,
		fill: '#8b5cf6',
	},
	{
		key: 'unknown',
		labelKey: 'detections.labels.emotion.unknown',
		detections: 27,
		percentage: 0.03,
		averageConfidence: 0.69,
		fill: 'var(--muted-foreground)',
	},
]
