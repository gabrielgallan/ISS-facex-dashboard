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
import { useDashboardCards } from '@/hooks/use-dashboard-cards'
import { useDashboardCharts } from '@/hooks/use-dashboard-charts'
import { ConfidenceCard } from './components/confidence-card'
import { DashboardDailyFilters } from './components/dashboard-daily-filters'
import { DashboardViewToggle } from './components/dashboard-view-toggle'
import { DetectionsAmountCard } from './components/detections-amount-card'
import { FemaleAmountCard } from './components/female-amout-card'
import { MaleAmountCard } from './components/male-amount-card'
import { PassagesByAgeChart } from './components/passages-by-age-chart'
import { PassagesByGenderChart } from './components/passages-by-gender-chart'
import { ChartSkeleton } from './components/skeletons/chart-skeleton'
import { MetricsCardSkeleton } from './components/skeletons/metrics-card-skeleton'

type DashboardViews = 'daily' | 'monthly' | 'weekly'

const dashboardViews = ['daily', 'weekly', 'monthly'] as const

function parseDashboardView(view: string | null): DashboardViews {
	if (dashboardViews.includes(view as DashboardViews)) {
		return view as DashboardViews
	}

	return 'daily'
}

export function DashboardPage() {
	const [searchParams, _setSearchParams] = useSearchParams()

	const view = parseDashboardView(searchParams.get('view'))

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

	const { cards } = useDashboardCards(result?.detections)

	const { charts } = useDashboardCharts(result?.detections, view)

	return (
		<div className="space-y-4 p-4">
			<DashboardViewToggle />

			{view === 'daily' && <DashboardDailyFilters />}

			<div className="grid gap-4 md:grid-cols-4">
				{isLoading ? (
					<>
						<MetricsCardSkeleton />
						<MetricsCardSkeleton />
						<MetricsCardSkeleton />
						<MetricsCardSkeleton />
					</>
				) : (
					<>
						<DetectionsAmountCard amount={cards.detections.amount} activeCams={cameraIds.length} />
						<MaleAmountCard amount={cards.male.amount} percentOfTotal={cards.male.percent} />
						<FemaleAmountCard amount={cards.female.amount} percentOfTotal={cards.female.percent} />
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
