import { useQuery } from '@tanstack/react-query'
import { CameraMovementRankingChart } from './components/camera-movement-ranking-chart'
import { MostActiveCameraCard } from './components/most-active-camera-card'
import { MovementAmountCard } from './components/movement-amount-card'
import { MovementTimelineChart } from './components/movement-timeline-chart'
import { NoMatchRateCard } from './components/no-match-rate-card'
import { PeakHourCard } from './components/peak-hour-card'
import { listDetections } from '@/api/facex/list-detections'
import { endOfDay, format, startOfDay } from 'date-fns'
import { getCameras } from '@/api/server/get-cameras'
import { useMovementDashboardCards } from '@/hooks/use-movement-dashboard-cards'
import { useMovementDashboardCharts } from '@/hooks/use-movement-dashboard-charts'
import { ChartSkeleton } from '@/components/skeletons/chart-skeleton'
import { CardSkeleton } from '@/components/skeletons/card-skeleton'

export function MovementDashboardPage() {
	const min_timestamp = format(startOfDay(new Date()), "yyyy-MM-dd'T'HH:mm:ssxxx")
	const max_timestamp = format(endOfDay(new Date()), "yyyy-MM-dd'T'HH:mm:ssxxx")

const {
	data: camerasResult,
	isLoading: isLoadingCameras
} = useQuery({
	queryKey: ['cameras'],
	queryFn: getCameras,
})

const cameraIds = camerasResult?.map((camera) => camera.id) ?? []

const canFetchDetections = cameraIds.length > 0

const {
	data: detectionsResult,
	isLoading: isLoadingDetections
} = useQuery({
	queryKey: ['detections', min_timestamp, max_timestamp, cameraIds.join(',')],
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

	return (
		<div className="space-y-4 p-4">
			<div className="grid gap-4 md:grid-cols-4">
				{isLoading ? (<>
										<CardSkeleton />
										<CardSkeleton />
										<CardSkeleton />
										<CardSkeleton />
									</>): (<><MovementAmountCard amount={cards.movement.amount} />
				<MostActiveCameraCard {...cards.mostActiveCamera} />
				<PeakHourCard {...cards.peakHour} />
				<NoMatchRateCard percent={cards.noMatchRate.percent} /></>)}
			</div>

			<div className="grid gap-4 md:grid-cols-9 md:h-100">
				{isLoading ? (<><ChartSkeleton className='col-span-4' /><ChartSkeleton className='col-span-5' /></>) : (<><CameraMovementRankingChart data={charts.cameraRanking} />
				<MovementTimelineChart data={charts.timeline} /></>)}
			</div>
		</div>
	)
}
