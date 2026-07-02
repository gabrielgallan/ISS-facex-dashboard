import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
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

interface ChartItem {
	label: string
	female: number
	male: number
}

interface PassagesByGenderChartProps {
	data: ChartItem[]
}

type GenderFilter = 'all' | 'male' | 'female'

export function PassagesByGenderChart({ data }: PassagesByGenderChartProps) {
	const { t } = useTranslation()
	const [genderFilter, setGenderFilter] = useState<GenderFilter>('all')

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

	const shouldShowMale = genderFilter === 'all' || genderFilter === 'male'
	const shouldShowFemale = genderFilter === 'all' || genderFilter === 'female'

	return (
		<Card className="flex col-span-6 min-h-0 flex-col overflow-hidden">
			<CardHeader className="flex justify-between">
				<div>
					<CardTitle>{t('dashboards.demographic.charts.gender.title')}</CardTitle>
					<CardDescription>{t('dashboards.demographic.charts.gender.subtitle')}</CardDescription>
				</div>

				<div>
					<Select
						value={genderFilter}
						onValueChange={(value) => setGenderFilter(value as GenderFilter)}
					>
						<SelectTrigger className="hidden w-56 sm:ml-auto sm:flex">
							<SelectValue placeholder="Selecione o gênero" />
						</SelectTrigger>

						<SelectContent className="border">
							<SelectGroup>
								<SelectLabel>{t('dashboards.demographic.charts.gender.views.genders')}</SelectLabel>
								<SelectSeparator />

								<SelectItem value="male">
									<div className="flex items-center gap-2">
										<span className="size-2 rounded-xs bg-blue-500" />
										{t('dashboards.demographic.charts.gender.views.only_male')}
									</div>
								</SelectItem>

								<SelectItem value="female">
									<div className="flex items-center gap-2">
										<span className="size-2 rounded-xs bg-rose-500" />
										{t('dashboards.demographic.charts.gender.views.only_female')}
									</div>
								</SelectItem>

								<SelectItem value="all">
									{t('dashboards.demographic.charts.gender.views.all_genders')}
								</SelectItem>
							</SelectGroup>
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
							<linearGradient id="fillfemale" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="var(--color-female)" stopOpacity={0.8} />
								<stop offset="95%" stopColor="var(--color-female)" stopOpacity={0.1} />
							</linearGradient>

							<linearGradient id="fillmale" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="var(--color-male)" stopOpacity={0.8} />
								<stop offset="95%" stopColor="var(--color-male)" stopOpacity={0.1} />
							</linearGradient>
						</defs>

						{shouldShowMale && (
							<Area
								dataKey="male"
								type="monotone"
								fill="url(#fillmale)"
								fillOpacity={0.4}
								stroke="var(--color-male)"
							/>
						)}

						{shouldShowFemale && (
							<Area
								dataKey="female"
								type="monotone"
								fill="url(#fillfemale)"
								fillOpacity={0.4}
								stroke="var(--color-female)"
							/>
						)}

						<ChartLegend content={<ChartLegendContent />} className="flex justify-start" />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
