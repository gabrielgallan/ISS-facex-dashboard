import { format, parseISO } from 'date-fns'
import { ChartArea } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCameras } from '@/api/server/get-cameras'
import { CameraFilter } from '@/components/camera-filter'
import { DatePicker } from '@/components/date-picker'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export function DashboardDailyFilters() {
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
			<div className="flex gap-2 w-full md:w-fit md:items-center">
				<Label className="hidden md:block text-xs">Filtros</Label>

				<div className="md:flex grid gap-2">
					<DatePicker value={date} onChange={setDate} />

					<CameraFilter
						options={cameraOptions}
						value={cameraIds}
						onValueChange={setCameraIds}
						isLoading={isLoadingCameras}
					/>

					<Button type="submit" variant="secondary" className="gap-2">
						<ChartArea className="size-4" />
						<span className="text-sm">Gerar Dashboard</span>
					</Button>
				</div>
			</div>
		</form>
	)
}
