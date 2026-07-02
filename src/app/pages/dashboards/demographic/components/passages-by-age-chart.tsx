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
	female: number
	male: number
	total: number
}

interface PassagesByAgeChartProps {
	data: ChartItem[]
}

function getHighestPassagesIndex(data: ChartItem[]) {
	if (data.length === 0) {
		return -1
	}

	return data.reduce((highestIndex, currentItem, currentIndex, array) => {
		return currentItem.total > array[highestIndex].total ? currentIndex : highestIndex
	}, 0)
}

type ChartView = 'default' | 'by_gender'

export function PassagesByAgeChart({ data }: PassagesByAgeChartProps) {
	const { t } = useTranslation()
	const activeIndex = getHighestPassagesIndex(data)

	const [view, setView] = useState<ChartView>('default')

	const chartConfig = {
		total: {
			label: t('dashboards.demographic.charts.age.passages'),
			color: 'var(--primary)',
		},
		male: {
			label: t('dashboards.demographic.charts.gender.male'),
			color: '#0370ec',
		},
		female: {
			label: t('dashboards.demographic.charts.gender.female'),
			color: '#f43f5e',
		},
	} satisfies ChartConfig

	return (
		<Card className="flex col-span-3 min-h-0 flex-col overflow-hidden">
			<CardHeader className="flex justify-between">
				<div>
					<CardTitle>{t('dashboards.demographic.charts.age.title')}</CardTitle>
					<CardDescription>{t('dashboards.demographic.charts.age.subtitle')}</CardDescription>
				</div>

				<div>
					<Select value={view} onValueChange={(value) => setView(value as ChartView)}>
						<SelectTrigger className="hidden w-42 sm:ml-auto sm:flex">
							<SelectValue placeholder={t('dashboards.demographic.charts.age.views.select')} />
						</SelectTrigger>

						<SelectContent className="border">
							<SelectGroup>
								<SelectLabel>{t('dashboards.demographic.charts.age.views.label')}</SelectLabel>
								<SelectSeparator />

								<SelectItem value="default">
									{t('dashboards.demographic.charts.age.views.default')}
								</SelectItem>

								<SelectItem value="by_gender">
									{t('dashboards.demographic.charts.age.views.by_gender')}
								</SelectItem>
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
								dataKey="total"
								fill="var(--color-total)"
								shape={({ index, ...props }: BarShapeProps) =>
									index === activeIndex ? (
										<Rectangle {...props} fill="var(--color-total)" fillOpacity={1} radius={4} />
									) : (
										<Rectangle {...props} fill="var(--color-total)" fillOpacity={0.45} radius={4} />
									)
								}
							>
								<LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
							</Bar>
						)}

						{view === 'by_gender' && (
							<>
								<Bar dataKey="male" stackId="age" fill="var(--color-male)" radius={[0, 0, 4, 4]} />

								<Bar
									dataKey="female"
									stackId="age"
									fill="var(--color-female)"
									radius={[4, 4, 0, 0]}
								/>
							</>
						)}
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
