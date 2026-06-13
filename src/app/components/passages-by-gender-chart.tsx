import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'

const chartData = [
	{ hour: '7h', female: 92, male: 74 },
	{ hour: '8h', female: 128, male: 96 },
	{ hour: '9h', female: 176, male: 132 },
	{ hour: '10h', female: 221, male: 168 },
	{ hour: '11h', female: 248, male: 182 },
	{ hour: '12h', female: 236, male: 194 },
	{ hour: '13h', female: 214, male: 206 },
	{ hour: '14h', female: 228, male: 218 },
	{ hour: '15h', female: 252, male: 231 },
	{ hour: '16h', female: 274, male: 246 },
	{ hour: '17h', female: 241, male: 223 },
	{ hour: '18h', female: 196, male: 181 },
]

const chartConfig = {
	female: {
		label: 'Homen',
		color: '#086cdd',
	},
	male: {
		label: 'Mulher',
		color: '#eb1656dd',
	},
} satisfies ChartConfig

export function PassagesByGenderChart() {
	return (
		<Card className="flex h-full min-h-0 flex-col overflow-hidden">
			<CardHeader>
				<CardTitle>Fluxo de passagens por horário</CardTitle>
				<CardDescription>
					Tendência de detecções masculinas e femininas ao longo do dia.
				</CardDescription>
			</CardHeader>
			<CardContent className="min-h-0 flex-1">
				<ChartContainer config={chartConfig} className="h-full min-h-0 w-full">
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} />

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
							type="natural"
							fill="url(#fillmale)"
							fillOpacity={0.4}
							stroke="var(--color-male)"
						/>

						<Area
							dataKey="female"
							type="natural"
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
