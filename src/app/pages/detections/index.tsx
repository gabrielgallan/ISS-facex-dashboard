import { useQuery } from '@tanstack/react-query'
import { endOfDay, format, parseISO, startOfDay } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { listDetections } from '@/api/list-detections'
import { Pagination } from '@/components/pagination'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DetectionsTableRow } from './components/detection-table-row'
import { DetectionsTableFilters } from './components/detections-table-filters'

export function DetectionsPage() {
	const [searchParams, setSearchParams] = useSearchParams()

	const start = searchParams.get('start') ?? format(new Date(), 'yyyy-MM-dd')
	const end = searchParams.get('end') ?? format(new Date(), 'yyyy-MM-dd')

	const startDateISO = parseISO(start)
	const endDateISO = parseISO(end)

	const min_timestamp = format(startOfDay(startDateISO), "yyyy-MM-dd'T'HH:mm:ssxxx")
	const max_timestamp = format(endOfDay(endDateISO), "yyyy-MM-dd'T'HH:mm:ssxxx")

	const pageIndex = searchParams.get('page')

	const page = pageIndex ? Number(pageIndex) : 1
	const limit = 4
	const offset = (page - 1) * limit

	const { data: result } = useQuery({
		queryKey: ['detections', page, limit, min_timestamp, max_timestamp],
		queryFn: () =>
			listDetections({
				body: {
					feeds: ['1'],
					min_timestamp,
					max_timestamp,
				},
				params: { limit, offset },
			}),
	})

	function handlePaginate(page: number) {
		setSearchParams((url) => {
			url.set('page', page.toString())

			return url
		})
	}

	return (
		<div className="space-y-4 gap-4 p-4">
			<DetectionsTableFilters />

			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-16">Face</TableHead>
							<TableHead>Perfil estimado</TableHead>
							<TableHead>Atributos faciais</TableHead>
							<TableHead>Emoção estimada</TableHead>
							<TableHead>Câmera</TableHead>
							<TableHead className="w-62 text-right">Data/Horário</TableHead>
							<TableHead className="text-right">Confiança</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{result?.detections.map((detection) => (
							<DetectionsTableRow key={detection.id} detection={detection} />
						))}
					</TableBody>
				</Table>
			</div>

			{result && (
				<Pagination
					onPageChange={handlePaginate}
					page={page}
					limit={10}
					total={result._pagination.total_records}
				/>
			)}
		</div>
	)
}
