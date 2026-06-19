import { useQuery } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import { Loader2, RefreshCw } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { getCameras } from '@/api/server/get-cameras'
import { CameraFilter } from '@/components/camera-filter'
import { DatePicker } from '@/components/date-picker'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface DashboardFiltersProps {
	isLoading?: boolean
	hasDayPicker?: boolean
	hasCamerasFilter?: boolean
}

export function DashboardFilters({
	isLoading = false,
	hasDayPicker = false,
	hasCamerasFilter = true,
}: DashboardFiltersProps) {
	const { t } = useTranslation()
	const [searchParams, setSearchParams] = useSearchParams()

	const { data: cameras, isLoading: isLoadingCameras } = useQuery({
		queryKey: ['cameras'],
		queryFn: () => getCameras(),
	})

	const initialDateValue = searchParams.get('date') ?? format(new Date(), 'yyyy-MM-dd')

	const initialCameraIds = searchParams.getAll('cameraId')

	const cameraOptions = cameras?.map(({ id, name }) => ({ id, name })) ?? []

	const dateISO = parseISO(initialDateValue)

	const [date, setDate] = useState<Date>(dateISO)
	const [cameraIds, setCameraIds] = useState<string[]>(initialCameraIds)

	function handleFilter(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		setSearchParams((url) => {
			url.set('start', format(date, 'yyyy-MM-dd'))
			url.set('end', format(date, 'yyyy-MM-dd'))
			url.delete('cameraId')

			cameraIds.forEach((id) => {
				url.append('cameraId', id)
			})

			return url
		})
	}

	return (
		<form onSubmit={handleFilter}>
			<div className="flex gap-2 w-fit md:w-fit md:items-center">
				<Label className="hidden md:block text-xs">{t('filters.labels.filters')}</Label>

				<div className="md:flex grid gap-2">
					{hasDayPicker && <DatePicker value={date} onChange={setDate} />}

					{hasCamerasFilter && (
						<CameraFilter
							options={cameraOptions}
							value={cameraIds}
							onValueChange={setCameraIds}
							isLoading={isLoadingCameras}
						/>
					)}

					<Button type="submit" variant="secondary" className="w-38 gap-2" disabled={isLoading}>
						{isLoading ? (
							<Loader2 className="animate-spin" />
						) : (
							<>
								<RefreshCw className="size-4" />

								<span className="text-sm">
									{t('dashboards.filters.buttons.generate_dashboard')}
								</span>
							</>
						)}
					</Button>
				</div>
			</div>
		</form>
	)
}
