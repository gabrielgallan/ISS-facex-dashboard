import { CameraMovementRankingChart } from './components/camera-movement-ranking-chart'
import { MostActiveCameraCard } from './components/most-active-camera-card'
import { MovementAmountCard } from './components/movement-amount-card'
import { MovementDashboardFilters } from './components/movement-dashboard-filters'
import { MovementTimelineChart } from './components/movement-timeline-chart'
import { NoMatchRateCard } from './components/no-match-rate-card'
import { PeakHourCard } from './components/peak-hour-card'

export function MovementDashboardPage() {
	return (
		<div className="space-y-4 p-4">
			<MovementDashboardFilters />

			<div className="grid gap-4 md:grid-cols-4">
				<MovementAmountCard />
				<MostActiveCameraCard cameraName="Camera 1" passages={800} />
				<PeakHourCard />
				<NoMatchRateCard />
			</div>

			<div className="grid gap-4 md:grid-cols-9 h-100">
				<CameraMovementRankingChart />
				<MovementTimelineChart />
			</div>
		</div>
	)
}
