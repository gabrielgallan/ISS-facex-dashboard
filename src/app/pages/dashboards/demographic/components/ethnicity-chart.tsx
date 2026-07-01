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

type EthnicityOptions = 'caucasian' | 'black' | 'east_indian' | 'unknown'

interface ChartItem {
	ethnicity: EthnicityOptions
	detections: number
	fill: string
}

const chartData: ChartItem[] = [
	{ ethnicity: 'caucasian', detections: 275, fill: 'var(--color-caucasian)' },
	{ ethnicity: 'black', detections: 200, fill: 'var(--color-black)' },
	{ ethnicity: 'east_indian', detections: 187, fill: 'var(--color-east_indian)' },
	{ ethnicity: 'unknown', detections: 90, fill: 'var(--color-unknown)' },
]

const chartConfig = {
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

export function EthnicityChart() {
	return (
		<Card className="flex flex-col col-span-2 min-h-0 overflow-hidden">
			<CardHeader>
				<CardTitle>Detecções por etnia</CardTitle>
				<CardDescription>Distribuição de reconhecimento facial por etnia</CardDescription>
			</CardHeader>

			<CardContent className="min-h-0 flex-1">
				<ChartContainer config={chartConfig} className="h-full min-h-0 w-full">
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent nameKey="ethnicity" hideLabel />}
						/>

						<Pie
							data={chartData}
							dataKey="detections"
							nameKey="ethnicity"
							labelLine={false}
							label={({ payload, ...props }) => {
								return (
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
								)
							}}
							innerRadius="50%"
							outerRadius="75%"
							paddingAngle={3}
							strokeWidth={0}
						/>

						<ChartLegend
							layout="vertical"
							verticalAlign="bottom"
							align="left"
							className="flex-col items-start gap-2"
							content={<ChartLegendContent nameKey="ethnicity" />}
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
