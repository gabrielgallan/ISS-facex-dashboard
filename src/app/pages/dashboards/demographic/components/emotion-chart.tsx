import { useTranslation } from 'react-i18next'
import { Pie, PieChart } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import { emotionBreakdownMock } from './demographic-breakdown.mock'

export function EmotionChart() {
	const { t } = useTranslation()

	const chartConfig = {
		neutral: {
			label: t('detections.labels.emotion.neutral'),
			color: 'var(--chart-1)',
		},
		happiness: {
			label: t('detections.labels.emotion.happiness'),
			color: 'var(--chart-2)',
		},
		surprise: {
			label: t('detections.labels.emotion.surprise'),
			color: 'var(--chart-3)',
		},
		sadness: {
			label: t('detections.labels.emotion.sadness'),
			color: 'var(--chart-4)',
		},
		anger: {
			label: t('detections.labels.emotion.anger'),
			color: 'var(--chart-5)',
		},
		fear: {
			label: t('detections.labels.emotion.fear'),
			color: '#8b5cf6',
		},
		unknown: {
			label: t('detections.labels.emotion.unknown'),
			color: 'var(--muted-foreground)',
		},
	} satisfies ChartConfig

	return (
		<Card className="flex min-h-0 flex-col overflow-hidden lg:col-span-3">
			<CardHeader>
				<CardTitle>{t('dashboards.demographic.charts.emotion.title')}</CardTitle>
				<CardDescription>{t('dashboards.demographic.charts.emotion.subtitle')}</CardDescription>
			</CardHeader>

			<CardContent className="min-h-0 flex-1">
				<ChartContainer config={chartConfig} className="h-full min-h-0 w-full">
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent nameKey="key" hideLabel />}
						/>

						<Pie
							data={emotionBreakdownMock}
							dataKey="detections"
							nameKey="key"
							labelLine={false}
							label={({ payload, ...props }) => (
								<text
									cx={props.cx}
									cy={props.cy}
									x={props.x}
									y={props.y}
									textAnchor={props.textAnchor}
									dominantBaseline={props.dominantBaseline}
									fill="var(--foreground)"
								>
									{payload.detections}
								</text>
							)}
							innerRadius="55%"
							outerRadius="78%"
							paddingAngle={3}
							strokeWidth={0}
						/>

						<ChartLegend
							layout="vertical"
							verticalAlign="bottom"
							align="left"
							className="flex-col items-start gap-2"
							content={<ChartLegendContent nameKey="key" />}
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
