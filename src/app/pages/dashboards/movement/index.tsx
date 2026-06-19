import { useQuery } from '@tanstack/react-query'
import { endOfDay, format, parseISO, startOfDay } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { listDetections } from '@/api/facex/list-detections'
import { getCameras } from '@/api/server/get-cameras'
import { DashboardFilters } from '@/components/dashboard-filters'
import { CardSkeleton } from '@/components/skeletons/card-skeleton'
import { ChartSkeleton } from '@/components/skeletons/chart-skeleton'
import { useMovementDashboardCameraRanking } from '@/hooks/use-movement-dashboard-camera-ranking'
import { useMovementDashboardCards } from '@/hooks/use-movement-dashboard-cards'
import { useMovementDashboardCharts } from '@/hooks/use-movement-dashboard-charts'
import { formatDashboardDateRange } from '@/utils/format-dashboard-date-range'
import { CameraMovementRankingChart } from './components/camera-movement-ranking-chart'
import { CameraRankingTable } from './components/camera-raking-table'
import { CameraRankingTableSkeleton } from './components/camera-ranking-table-skeleton'
import { MostActiveCameraCard } from './components/most-active-camera-card'
import { MovementAmountCard } from './components/movement-amount-card'
import { MovementTimelineChart } from './components/movement-timeline-chart'
import { NoMatchRateCard } from './components/no-match-rate-card'
import { PeakHourCard } from './components/peak-hour-card'

export function MovementDashboardPage() {
	const [searchParams, _setSearchParams] = useSearchParams()

	const { start, end } = formatDashboardDateRange('daily', searchParams)

	const startDateISO = parseISO(start)
	const endDateISO = parseISO(end)

	const min_timestamp = format(startOfDay(startDateISO), "yyyy-MM-dd'T'HH:mm:ssxxx")
	const max_timestamp = format(endOfDay(endDateISO), "yyyy-MM-dd'T'HH:mm:ssxxx")

	const { data: camerasResult, isLoading: isLoadingCameras } = useQuery({
		queryKey: ['cameras'],
		queryFn: getCameras,
	})

	const cameraIds = camerasResult?.map((camera) => camera.id) ?? []

	const canFetchDetections = cameraIds.length > 0

	const { data: detectionsResult, isLoading: isLoadingDetections } = useQuery({
		queryKey: ['detections', min_timestamp, max_timestamp, cameraIds.join(','), 'daily'],
		queryFn: () =>
			listDetections({
				body: {
					feeds: cameraIds,
					min_timestamp,
					max_timestamp,
				},
				params: {
					limit: 10000,
					offset: 0,
				},
			}),
		enabled: canFetchDetections,
	})

	const isLoading = isLoadingCameras || isLoadingDetections

	const { cards } = useMovementDashboardCards(detectionsResult?.detections, camerasResult)
	const { charts } = useMovementDashboardCharts(detectionsResult?.detections, camerasResult)
	const { cameraRanking } = useMovementDashboardCameraRanking(
		detectionsResult?.detections,
		camerasResult
	)

	return (
		<div className="space-y-4 p-4">
			<DashboardFilters hasCamerasFilter={false} hasDayPicker isLoading={isLoading} />

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
						<MovementAmountCard amount={cards.movement.amount} />
						<MostActiveCameraCard {...cards.mostActiveCamera} />
						<PeakHourCard {...cards.peakHour} />
						<NoMatchRateCard percent={cards.noMatchRate.percent} />
					</>
				)}
			</div>

			<div className="grid gap-4 md:grid-cols-9 md:h-100">
				{isLoading ? (
					<>
						<ChartSkeleton className="col-span-4" />
						<ChartSkeleton className="col-span-5" />
					</>
				) : (
					<>
						<MovementTimelineChart data={charts.timeline} />
						<CameraMovementRankingChart data={charts.cameraRanking} />
					</>
				)}
			</div>

			{isLoading ? <CameraRankingTableSkeleton /> : <CameraRankingTable cameras={cameraRanking} />}
		</div>
	)
}
