'use client'

import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import { type ChartConfig, ChartContainer } from '@/components/ui/chart'

const item = {
	name: 'Male',
	capacity: 20,
	current: 1,
	allowed: 5,
	fill: 'var(--primary)',
}

const chartConfig = {
	capacity: {
		label: 'Capacity',
		color: 'hsl(var(--primary))',
	},
} satisfies ChartConfig

export default function Stats07() {
	return (
		<Card key={item.name} className="p-4">
			<CardContent className="p-0 flex items-center space-x-4">
				<div className="relative flex items-center justify-center">
					<ChartContainer config={chartConfig} className="h-20 w-20">
						<RadialBarChart
							data={[item]}
							innerRadius="70%"
							outerRadius="95%"
							barSize={6}
							startAngle={90}
							endAngle={-270}
						>
							<PolarAngleAxis
								type="number"
								domain={[0, 100]}
								angleAxisId={0}
								tick={false}
								axisLine={false}
							/>
							<RadialBar
								dataKey="capacity"
								background
								cornerRadius={10}
								fill="var(--primary)"
								angleAxisId={0}
							/>
						</RadialBarChart>
					</ChartContainer>
					<div className="absolute inset-0 flex items-center justify-center">
						<span className="text-base font-medium text-foreground">{item.capacity}%</span>
					</div>
				</div>
				<div>
					<dt className="text-sm font-medium text-foreground">{item.name}</dt>
					<dd className="text-sm text-muted-foreground">129 of 230</dd>
				</div>
			</CardContent>
		</Card>
	)
}
