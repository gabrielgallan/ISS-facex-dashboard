import { useQuery } from '@tanstack/react-query'
import {
	endOfDay,
	endOfMonth,
	endOfWeek,
	format,
	parseISO,
	startOfDay,
	startOfMonth,
	startOfWeek,
} from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { listDetections } from '@/api/list-detections'
import { CardSkeleton } from '@/components/skeletons/card-skeleton'
import { ChartSkeleton } from '@/components/skeletons/chart-skeleton'
import { useDemographicDashboardCards } from '@/hooks/use-demographic-dashboard-cards'
import { useDemographicDashboardCharts } from '@/hooks/use-demographic-dashboard-charts'
import { ConfidenceCard } from './components/confidence-card'
import { DashboardDailyFilters } from './components/dashboard-daily-filters'
import { DashboardViewToggle } from './components/dashboard-view-toggle'
import { DetectionsAmountCard } from './components/detections-amount-card'
import { FemaleAmountCard } from './components/female-amout-card'
import { MaleAmountCard } from './components/male-amount-card'
import { PassagesByAgeChart } from './components/passages-by-age-chart'
import { PassagesByGenderChart } from './components/passages-by-gender-chart'

type DashboardViews = 'daily' | 'monthly' | 'weekly'

export function DemographicDashboardPage() {
	const [searchParams, _setSearchParams] = useSearchParams()

	const view = (searchParams.get('view') as DashboardViews) ?? 'daily'

	let start: string
	let end: string

	const now = new Date()

	if (view === 'daily') {
		start = searchParams.get('start') ?? format(now, 'yyyy-MM-dd')
		end = searchParams.get('end') ?? format(now, 'yyyy-MM-dd')
	} else if (view === 'weekly') {
		start = format(startOfWeek(now), 'yyyy-MM-dd')
		end = format(endOfWeek(now), 'yyyy-MM-dd')
	} else {
		start = format(startOfMonth(now), 'yyyy-MM-dd')
		end = format(endOfMonth(now), 'yyyy-MM-dd')
	}

	const startDateISO = parseISO(start)
	const endDateISO = parseISO(end)

	const min_timestamp = format(startOfDay(startDateISO), "yyyy-MM-dd'T'HH:mm:ssxxx")
	const max_timestamp = format(endOfDay(endDateISO), "yyyy-MM-dd'T'HH:mm:ssxxx")

	const cameraIds = searchParams.getAll('cameraId')

	const { data: result, isLoading } = useQuery({
		queryKey: ['detections', view, min_timestamp, max_timestamp],
		queryFn: () =>
			listDetections({
				body: {
					feeds: cameraIds.length > 0 ? cameraIds : ['1'],
					min_timestamp,
					max_timestamp,
				},
				params: { limit: 1000, offset: 0 },
			}),
	})

	const { cards } = useDemographicDashboardCards(result?.detections)

	const { charts } = useDemographicDashboardCharts(result?.detections, view, {
		startDate: startDateISO,
		endDate: endDateISO,
	})

	return (
		<div className="space-y-4 p-4">
			<DashboardViewToggle />

			{view === 'daily' && <DashboardDailyFilters />}

			<div className="grid gap-4 md:grid-cols-4">
				{isLoading ? (
					<>
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
					</>
				) : (
					<>
						<DetectionsAmountCard
							amount={cards.detections.amount}
							activeCams={cameraIds.length}
						/>
						<MaleAmountCard amount={cards.male.amount} percentOfTotal={cards.male.percent} />
						<FemaleAmountCard
							amount={cards.female.amount}
							percentOfTotal={cards.female.percent}
						/>
						<ConfidenceCard confidence={cards.confidence.amount} />
					</>
				)}
			</div>

			<div className="grid gap-4 md:grid-cols-9 h-100">
				{isLoading ? (
					<>
						<ChartSkeleton className="col-span-5" />
						<ChartSkeleton className="col-span-4" />
					</>
				) : (
					<>
						<PassagesByGenderChart data={charts.gender} />
						<PassagesByAgeChart data={charts.age} />
					</>
				)}
			</div>
		</div>
	)
}
