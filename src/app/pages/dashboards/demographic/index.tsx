import { useQuery } from '@tanstack/react-query'
import { endOfDay, format, parseISO, startOfDay } from 'date-fns'
import { Download } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { listDetections } from '@/api/facex/list-detections'
import { getCameras } from '@/api/server/get-cameras'
import { DashboardFilters } from '@/components/dashboard-filters'
import { CardSkeleton } from '@/components/skeletons/card-skeleton'
import { Button } from '@/components/ui/button'
import { useDemographicDashboardCards } from '@/hooks/use-demographic-dashboard-cards'
import { useDemographicDashboardCharts } from '@/hooks/use-demographic-dashboard-charts'
import { formatDashboardDateRange } from '@/utils/format-dashboard-date-range'
import { DashboardViewToggle } from '../../../../components/dashboard-view-toggle'
import { ConfidenceCard } from './components/confidence-card'
import { DetectionsAmountCard } from './components/detections-amount-card'
import { FemaleAmountCard } from './components/female-amout-card'
import { MaleAmountCard } from './components/male-amount-card'
import { PassagesByAgeChart } from './components/passages-by-age-chart'
import { PassagesByGenderChart } from './components/passages-by-gender-chart'
import { chartMock } from './dashboard.mock'

export type DashboardViews = 'daily' | 'monthly' | 'weekly'

export function DemographicDashboardPage() {
	const [searchParams, _setSearchParams] = useSearchParams()
	const { t } = useTranslation()

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

	function handleDownloadReport() {
		toast('Feature not implemented yet!', { position: 'top-right' })
	}

	return (
		<div className="flex flex-col gap-4 w-full p-4">
			<DashboardViewToggle />

			<div className="flex justify-between">
				{view === 'daily' && <DashboardFilters hasDayPicker isLoading={isLoading} />}

				{view === 'weekly' && <DashboardFilters isLoading={isLoading} />}

				{view === 'monthly' && <DashboardFilters isLoading={isLoading} />}

				<Button onClick={handleDownloadReport} variant="secondary">
					<Download className="size-4" />
					{t('dashboards.buttons.download_report')}
				</Button>
			</div>

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
				<PassagesByGenderChart data={chartMock.gender} />
				<PassagesByAgeChart data={chartMock.age} />
			</div>
		</div>
	)
}
