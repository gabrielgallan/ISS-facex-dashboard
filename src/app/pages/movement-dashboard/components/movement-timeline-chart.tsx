import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'

const chartConfig = {
	passages: {
		label: 'Passagens',
		color: '#0891b2',
	},
} satisfies ChartConfig

interface ChartItem {
	label: string
	passages: number
}

interface MovementTimelineChartProps {
	data?: ChartItem[]
}

const mock = [
	{ label: '08:00', passages: 96 },
	{ label: '09:00', passages: 132 },
	{ label: '10:00', passages: 178 },
	{ label: '11:00', passages: 214 },
	{ label: '12:00', passages: 286 },
	{ label: '13:00', passages: 241 },
	{ label: '14:00', passages: 203 },
	{ label: '15:00', passages: 186 },
	{ label: '16:00', passages: 171 },
	{ label: '17:00', passages: 135 },
]

export function MovementTimelineChart({ data = mock }: MovementTimelineChartProps) {
	return (
		<Card className="flex col-span-5 min-h-0 flex-col overflow-hidden">
			<CardHeader>
				<CardTitle>Tendência operacional</CardTitle>
				<CardDescription>Evolução do fluxo total ao longo do período monitorado.</CardDescription>
			</CardHeader>
			<CardContent className="min-h-0 flex-1">
				<ChartContainer config={chartConfig} className="h-full min-h-0 w-full">
					<AreaChart
						accessibilityLayer
						data={data}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />

						<XAxis
							dataKey="label"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							padding={{ left: 8, right: 8 }}
						/>

						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />

						<defs>
							<linearGradient id="fillpassages" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="var(--color-passages)" stopOpacity={0.8} />
								<stop offset="95%" stopColor="var(--color-passages)" stopOpacity={0.1} />
							</linearGradient>
						</defs>

						<Area
							dataKey="passages"
							type="bump"
							fill="url(#fillpassages)"
							fillOpacity={0.4}
							stroke="var(--color-passages)"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
