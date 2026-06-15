import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'A stacked bar chart with a legend'

const chartData = [
	{ age: '0-17', passages: 32 },
	{ age: '18-24', passages: 118 },
	{ age: '25-34', passages: 186 },
	{ age: '35-44', passages: 142 },
	{ age: '45-54', passages: 84 },
	{ age: '55+', passages: 46 },
]

const chartConfig = {
	passages: {
		label: 'Passagens',
		color: 'var(--chart-1)',
	},
} satisfies ChartConfig

export function PassagesByAgeChart() {
	return (
		<Card className="flex md:col-span-3 min-h-0 flex-col overflow-hidden">
			<CardHeader>
				<CardTitle>Distribuição por faixa etária</CardTitle>
				<CardDescription>Quantidade de detecções agrupadas por idade estimada.</CardDescription>
			</CardHeader>
			<CardContent className="min-h-0 flex-1">
				<ChartContainer config={chartConfig} className="h-full min-h-0 w-full">
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />

						<XAxis dataKey="age" tickMargin={10} tickLine={false} axisLine={false} />

						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

						<Bar dataKey="passages" fill="var(--color-passages)" radius={8}>
							<LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
