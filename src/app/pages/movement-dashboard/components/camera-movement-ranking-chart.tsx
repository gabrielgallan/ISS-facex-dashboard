import { Pie, PieChart, type PieSectorShapeProps, Sector } from 'recharts'
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
		color: 'var(--primary)',
	},
} satisfies ChartConfig

interface CameraMovementRankingItem {
	cameraName: string
	passages: number
}

type CameraMovementRankingChartItem = CameraMovementRankingItem & {
	fill: string
}

const cameraMovementRanking: CameraMovementRankingItem[] = [
	{ cameraName: 'Câmera 1', passages: 742 },
	{ cameraName: 'Câmera 2', passages: 618 },
	{ cameraName: 'Câmera 3', passages: 482 },
]

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

export function CameraMovementRankingChart() {
	const activeIndex = getActiveIndex(cameraMovementRanking)
	const data: CameraMovementRankingChartItem[] = cameraMovementRanking.map((camera, index) => ({
		...camera,
		fill: getPrimaryFill(index, activeIndex),
	}))

	return (
		<Card className="flex col-span-4 min-h-0 flex-col overflow-hidden">
			<CardHeader>
				<CardTitle>Ranking de movimentação</CardTitle>
				<CardDescription>Volume de passagens agrupado por câmera monitorada.</CardDescription>
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
							label
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
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
