import {
	Bar,
	BarChart,
	type BarShapeProps,
	CartesianGrid,
	LabelList,
	Rectangle,
	XAxis,
} from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'A stacked bar chart with a legend'

const chartConfig = {
	passages: {
		label: 'Passagens',
		color: 'var(--primary)',
	},
} satisfies ChartConfig

interface ChartItem {
	age: string
	passages: number
}

interface PassagesByAgeChartProps {
	data: ChartItem[]
}

function getHighestPassagesIndex(data: ChartItem[]) {
	if (data.length === 0) {
		return -1
	}

	return data.reduce((highestIndex, currentItem, currentIndex, array) => {
		return currentItem.passages > array[highestIndex].passages ? currentIndex : highestIndex
	}, 0)
}

export function PassagesByAgeChart({ data }: PassagesByAgeChartProps) {
	const activeIndex = getHighestPassagesIndex(data)

	return (
		<Card className="flex md:col-span-4 min-h-0 flex-col overflow-hidden">
			<CardHeader>
				<CardTitle>Distribuição por faixa etária</CardTitle>
				<CardDescription>Quantidade de detecções agrupadas por idade estimada.</CardDescription>
			</CardHeader>
			<CardContent className="min-h-0 flex-1">
				<ChartContainer config={chartConfig} className="h-full min-h-0 w-full">
					<BarChart accessibilityLayer data={data}>
						<CartesianGrid vertical={false} />

						<XAxis dataKey="age" tickMargin={10} tickLine={false} axisLine={false} />

						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

						<Bar
							dataKey="passages"
							fill="var(--color-passages)"
							radius={8}
							shape={({ index, ...props }: BarShapeProps) =>
								index === activeIndex ? (
									<Rectangle
										{...props}
										fill="var(--color-passages)"
										fillOpacity={1}
										stroke="var(--foreground)"
										strokeWidth={2}
										strokeDasharray={4}
										radius={8}
									/>
								) : (
									<Rectangle
										{...props}
										fill="var(--color-passages)"
										fillOpacity={0.45}
										radius={8}
									/>
								)
							}
						>
							<LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
