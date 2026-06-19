import { useTranslation } from 'react-i18next'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'

interface ChartItem {
	label: string
	female: number
	male: number
}

interface PassagesByGenderChartProps {
	data: ChartItem[]
}

export function PassagesByGenderChart({ data }: PassagesByGenderChartProps) {
	const { t } = useTranslation()
	const chartConfig = {
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
		<Card className="flex col-span-5 min-h-0 flex-col overflow-hidden">
			<CardHeader>
				<CardTitle>{t('dashboards.demographic.charts.gender.title')}</CardTitle>
				<CardDescription>{t('dashboards.demographic.charts.gender.subtitle')}</CardDescription>
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
							<linearGradient id="fillfemale" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="var(--color-female)" stopOpacity={0.8} />
								<stop offset="95%" stopColor="var(--color-female)" stopOpacity={0.1} />
							</linearGradient>

							<linearGradient id="fillmale" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="var(--color-male)" stopOpacity={0.8} />
								<stop offset="95%" stopColor="var(--color-male)" stopOpacity={0.1} />
							</linearGradient>
						</defs>

						<Area
							dataKey="male"
							type="monotone"
							fill="url(#fillmale)"
							fillOpacity={0.4}
							stroke="var(--color-male)"
						/>

						<Area
							dataKey="female"
							type="monotone"
							fill="url(#fillfemale)"
							fillOpacity={0.4}
							stroke="var(--color-female)"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
