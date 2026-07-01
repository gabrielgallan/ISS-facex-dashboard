import { CartesianGrid, LabelList, Line, LineChart } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'

type EthnicityDTO = 'CAUCASIAN' | 'BLACK' | 'EAST_INDIAN' | 'UNKNOWN'

interface ChartItem {
	ethnicity: EthnicityDTO
	detections: number
	fill: string
}

const chartData: ChartItem[] = [
	{ ethnicity: 'CAUCASIAN', detections: 275, fill: 'var(--color-caucasian)' },
	{ ethnicity: 'BLACK', detections: 200, fill: 'var(--color-black)' },
	{ ethnicity: 'EAST_INDIAN', detections: 187, fill: 'var(--color-east-indian)' },
	{ ethnicity: 'UNKNOWN', detections: 90, fill: 'var(--color-unknown)' },
]

const chartConfig = {
	detections: {
		label: 'Detecções',
		color: 'var(--chart-2)',
	},
	caucasian: {
		label: 'Caucasiana',
		color: 'var(--chart-1)',
	},
	black: {
		label: 'Negra',
		color: 'var(--chart-2)',
	},
	east_indian: {
		label: 'Indiana oriental',
		color: 'var(--chart-3)',
	},
	unknown: {
		label: 'Desconhecida',
		color: 'var(--chart-4)',
	},
} satisfies ChartConfig

const ethnicityConfigKeyMap: Record<EthnicityDTO, keyof typeof chartConfig> = {
	CAUCASIAN: 'caucasian',
	BLACK: 'black',
	EAST_INDIAN: 'east_indian',
	UNKNOWN: 'unknown',
}

export function EthnicityChart() {
	return (
		<Card className="flex flex-col col-span-2 min-h-0 overflow-hidden">
			<CardHeader>
				<CardTitle>Detecções por etnia</CardTitle>
				<CardDescription>Distribuição de reconhecimento facial por etnia</CardDescription>
			</CardHeader>

			<CardContent className="min-h-0 flex-1">
				<ChartContainer config={chartConfig} className="h-full min-h-0 w-full">
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							top: 24,
							left: 30,
							right: 24,
						}}
					>
						<CartesianGrid vertical={false} />

						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" nameKey="detections" hideLabel />}
						/>

						<Line
							dataKey="detections"
							type="natural"
							stroke="var(--color-detections)"
							strokeWidth={2}
							dot={{
								fill: 'var(--color-detections)',
							}}
							activeDot={{
								r: 6,
							}}
						>
							<LabelList
								position="top"
								offset={12}
								className="fill-foreground"
								fontSize={12}
								dataKey="ethnicity"
								formatter={(value: EthnicityDTO) => {
									const configKey = ethnicityConfigKeyMap[value]

									return chartConfig[configKey]?.label
								}}
							/>
						</Line>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
