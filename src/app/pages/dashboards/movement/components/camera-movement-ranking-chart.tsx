import { useTranslation } from 'react-i18next'
import { Pie, PieChart, type PieSectorShapeProps, Sector } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'

interface CameraMovementRankingItem {
	cameraName: string
	passages: number
}

interface CameraMovementRankingChartProps {
	data: CameraMovementRankingItem[]
}

type CameraMovementRankingChartItem = CameraMovementRankingItem & {
	fill: string
}

function getActiveIndex(data: CameraMovementRankingItem[]) {
	if (data.length === 0) {
		return -1
	}

	return data.reduce((highestIndex, item, index, list) => {
		return item.passages > list[highestIndex].passages ? index : highestIndex
	}, 0)
}

function getPrimaryFill(index: number, activeIndex: number) {
	if (index === activeIndex) {
		return 'var(--primary)'
	}

	const primaryAmount = Math.max(42, 76 - index * 12)

	return `color-mix(in oklch, var(--primary) ${primaryAmount}%, transparent)`
}

export function CameraMovementRankingChart({ data: ranking }: CameraMovementRankingChartProps) {
	const { t } = useTranslation()

	const activeIndex = getActiveIndex(ranking)

	// Precisa vir antes do chartConfig pois é usado no getPrimaryFill
	const data: CameraMovementRankingChartItem[] = ranking.map((camera, index) => ({
		...camera,
		fill: getPrimaryFill(index, activeIndex),
	}))

	const chartConfig = {
		passages: {
			label: t('dashboards.movement.charts.camera_ranking.passages'),
		},
		...Object.fromEntries(
			ranking.map((camera, index) => [
				camera.cameraName,
				{
					label: camera.cameraName,
					color: getPrimaryFill(index, activeIndex),
				},
			])
		),
	} satisfies ChartConfig

	return (
		<Card className="flex col-span-4 min-h-0 flex-col overflow-hidden">
			<CardHeader>
				<CardTitle>{t('dashboards.movement.charts.camera_ranking.title')}</CardTitle>
				<CardDescription>
					{t('dashboards.movement.charts.camera_ranking.description')}
				</CardDescription>
			</CardHeader>

			<CardContent className="min-h-0 flex-1">
				<ChartContainer config={chartConfig} className="h-full min-h-0 w-full">
					<PieChart
						margin={{
							top: 24,
						}}
					>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Pie
							labelLine={false}
							data={data}
							dataKey="passages"
							nameKey="cameraName"
							outerRadius={110}
							innerRadius={60}
							stroke="var(--card)"
							strokeWidth={5}
							shape={({ index, outerRadius = 0, ...props }: PieSectorShapeProps) =>
								index === activeIndex ? (
									<Sector {...props} outerRadius={outerRadius + 10} />
								) : (
									<Sector {...props} outerRadius={outerRadius} />
								)
							}
						/>

						<ChartLegend
							layout="vertical"
							verticalAlign="bottom"
							align="left"
							content={(props) => (
								<ChartLegendContent
									{...props}
									payload={props.payload?.slice(0, 5)}
									nameKey="cameraName"
								/>
							)}
							className="flex-col items-start gap-2"
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
