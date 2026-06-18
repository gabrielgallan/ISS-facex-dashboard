import { useQuery } from '@tanstack/react-query'
import { endOfDay, format, parseISO, startOfDay } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { listDetections } from '@/api/facex/list-detections'
import { getCameras } from '@/api/server/get-cameras'
import { CardSkeleton } from '@/components/skeletons/card-skeleton'
import { ChartSkeleton } from '@/components/skeletons/chart-skeleton'
import { useDemographicDashboardCards } from '@/hooks/use-demographic-dashboard-cards'
import { useDemographicDashboardCharts } from '@/hooks/use-demographic-dashboard-charts'
import { formatDashboardDateRange } from '@/utils/format-dashboard-date-range'
import { ConfidenceCard } from './components/confidence-card'
import { DashboardDailyFilters } from './components/dashboard-daily-filters'
import { DashboardViewToggle } from './components/dashboard-view-toggle'
import { DetectionsAmountCard } from './components/detections-amount-card'
import { FemaleAmountCard } from './components/female-amout-card'
import { MaleAmountCard } from './components/male-amount-card'
import { PassagesByAgeChart } from './components/passages-by-age-chart'
import { PassagesByGenderChart } from './components/passages-by-gender-chart'

export type DashboardViews = 'daily' | 'monthly' | 'weekly'

export function DemographicDashboardPage() {
	const [searchParams, _setSearchParams] = useSearchParams()

	const view = (searchParams.get('view') as DashboardViews) ?? 'daily'

	const { start, end } = formatDashboardDateRange(view, searchParams)

	const startDateISO = parseISO(start)
	const endDateISO = parseISO(end)

	const min_timestamp = format(startOfDay(startDateISO), "yyyy-MM-dd'T'HH:mm:ssxxx")
	const max_timestamp = format(endOfDay(endDateISO), "yyyy-MM-dd'T'HH:mm:ssxxx")

	const selectedCameraIds = searchParams.getAll('cameraId')

	const {
		data: cameras,
		isLoading: isLoadingCameras,
		isFetching: isFetchingCameras,
	} = useQuery({
		queryKey: ['cameras'],
		queryFn: getCameras,
		enabled: selectedCameraIds.length === 0,
	})

	const cameraIds =
		selectedCameraIds.length > 0 ? selectedCameraIds : (cameras?.map((camera) => camera.id) ?? [])

	const canFetchDetections =
		selectedCameraIds.length > 0 ||
		(!isLoadingCameras && !isFetchingCameras && cameraIds.length > 0)

	const { data: result, isLoading: isLoadingDetections } = useQuery({
		queryKey: ['detections', min_timestamp, max_timestamp, cameraIds.join(','), view],
		queryFn: () =>
			listDetections({
				body: {
					feeds: cameraIds,
					min_timestamp,
					max_timestamp,
				},
				params: { limit: 10000, offset: 0 },
			}),
		enabled: canFetchDetections,
	})

	const isLoading = isLoadingCameras || isLoadingDetections

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
						<DetectionsAmountCard amount={cards.detections.amount} activeCams={cameraIds.length} />
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
