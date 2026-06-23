import { useTranslation } from 'react-i18next'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
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
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

interface ChartItem {
	label: string
	passages: number
}

interface MovementTimelineChartProps {
	data: ChartItem[]
}

export function MovementTimelineChart({ data }: MovementTimelineChartProps) {
	const { t } = useTranslation()
	const chartConfig = {
		passages: {
			label: t('dashboards.movement.charts.timeline.passages'),
			color: '#0891b2',
		},
	} satisfies ChartConfig

	return (
		<Card className="flex col-span-5 min-h-0 flex-col overflow-hidden">
			<CardHeader className="flex justify-between">
				<div>
					<CardTitle>{t('dashboards.movement.charts.timeline.title')}</CardTitle>
					<CardDescription>{t('dashboards.movement.charts.timeline.description')}</CardDescription>
				</div>

				<div>
					<Select>
						<SelectTrigger className="hidden w-40 sm:ml-auto sm:flex" aria-label="Select a value">
							<SelectValue placeholder="Last 3 months" />
						</SelectTrigger>
						<SelectContent className="rounded-xl">
							<SelectItem value="90d" className="rounded-lg">
								Last 3 months
							</SelectItem>
							<SelectItem value="30d" className="rounded-lg">
								Last 30 days
							</SelectItem>
							<SelectItem value="7d" className="rounded-lg">
								Last 7 days
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
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
