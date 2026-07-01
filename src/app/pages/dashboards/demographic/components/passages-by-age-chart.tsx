import { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export const description = 'A stacked bar chart with a legend'

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

type ChartView = 'default' | 'by_genders'

export function PassagesByAgeChart({ data }: PassagesByAgeChartProps) {
	const { t } = useTranslation()
	const activeIndex = getHighestPassagesIndex(data)

	const [view, setView] = useState<ChartView>('default')

	const chartConfig = {
		passages: {
			label: t('dashboards.demographic.charts.age.passages'),
			color: 'var(--primary)',
		},
	} satisfies ChartConfig

	return (
		<Card className="flex md:col-span-4 min-h-0 flex-col overflow-hidden">
			<CardHeader className="flex justify-between">
				<div>
					<CardTitle>{t('dashboards.demographic.charts.age.title')}</CardTitle>
					<CardDescription>{t('dashboards.demographic.charts.age.subtitle')}</CardDescription>
				</div>

				<div>
					<Select value={view} onValueChange={(value) => setView(value as ChartView)}>
						<SelectTrigger className="hidden w-42 sm:ml-auto sm:flex">
							<SelectValue placeholder="Selecione a view" />
						</SelectTrigger>

						<SelectContent className="border">
							<SelectGroup>
								<SelectLabel>View</SelectLabel>
								<SelectSeparator />

								<SelectItem value="default">Default</SelectItem>

								<SelectItem value="by_gender">By gender</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</CardHeader>
			<CardContent className="min-h-0 flex-1">
				<ChartContainer config={chartConfig} className="h-full min-h-0 w-full">
					<BarChart
						accessibilityLayer
						data={data}
						margin={{
							top: 24,
						}}
					>
						<CartesianGrid vertical={false} />

						<XAxis dataKey="age" tickMargin={10} tickLine={false} axisLine={false} />

						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

						{view === 'default' && (
							<Bar
								dataKey="passages"
								fill="var(--color-passages)"
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
						)}

						{view === 'by_genders' && <></>}
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
