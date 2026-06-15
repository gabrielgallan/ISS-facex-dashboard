import { useQuery } from '@tanstack/react-query'
import { endOfDay, format, parseISO, startOfDay } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { listDetections } from '@/api/list-detections'
import { useDashboardCards } from '@/hooks/use-dashboard-cards'
import { useDashboardCharts } from '@/hooks/use-dashboard-charts'
import { ConfidenceCard } from './components/confidence-card'
import { DashboardFilters } from './components/dashboard-filters'
import { DetectionsAmountCard } from './components/detections-amount-card'
import { FemaleAmountCard } from './components/female-amout-card'
import { MaleAmountCard } from './components/male-amount-card'
import { PassagesByAgeChart } from './components/passages-by-age-chart'
import { PassagesByGenderChart } from './components/passages-by-gender-chart'
import { ChartSkeleton } from './components/skeletons/chart-skeleton'
import { MetricsCardSkeleton } from './components/skeletons/metrics-card-skeleton'

export function DashbaordPage() {
	const [searchParams, _setSearchParams] = useSearchParams()

	const date = searchParams.get('date') ?? format(new Date(), 'yyyy-MM-dd')

	const dateISO = parseISO(date)

	const min_timestamp = format(startOfDay(dateISO), "yyyy-MM-dd'T'HH:mm:ssxxx")
	const max_timestamp = format(endOfDay(dateISO), "yyyy-MM-dd'T'HH:mm:ssxxx")

	const { data: result, isLoading } = useQuery({
		queryKey: ['detections', date],
		queryFn: () =>
			listDetections({
				body: {
					feeds: ['1'],
					min_timestamp,
					max_timestamp,
				},
				params: { limit: 1000, offset: 0 },
			}),
	})

	const { cards } = useDashboardCards(result?.detections)
	const { charts } = useDashboardCharts(result?.detections)

	return (
		<div className="space-y-4 py-4">
			<div>
				<DashboardFilters />
			</div>

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
						<DetectionsAmountCard amount={cards.detections.amount} />
						<ConfidenceCard confidence={cards.confidence.amount} />
						<MaleAmountCard amount={cards.male.amount} percentOfTotal={cards.male.percent} />
						<FemaleAmountCard amount={cards.female.amount} percentOfTotal={cards.female.percent} />
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
