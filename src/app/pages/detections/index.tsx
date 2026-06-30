import { useQuery } from '@tanstack/react-query'
import { endOfDay, format, parseISO, startOfDay } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { listDetections } from '@/api/facex/list-detections'
import { Pagination } from '@/components/pagination'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DetectionsTableRow } from './components/detection-table-row'
import { DetectionsTableFilters } from './components/detections-table-filters'

export function DetectionsPage() {
	const { t } = useTranslation()
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
		<div className="flex flex-col gap-4 w-full p-4">
			<DetectionsTableFilters />

			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-16">{t('detections.table.columns.face')}</TableHead>
							<TableHead>{t('detections.table.columns.profile')}</TableHead>
							<TableHead>{t('detections.table.columns.facial_attributes')}</TableHead>
							<TableHead>{t('detections.table.columns.emotion')}</TableHead>
							<TableHead>{t('detections.table.columns.camera')}</TableHead>
							<TableHead className="w-62 text-right">
								{t('detections.table.columns.timestamp')}
							</TableHead>
							<TableHead className="text-right">
								{t('detections.table.columns.confidence')}
							</TableHead>
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
					limit={limit}
					total={result._pagination.total_records}
				/>
			)}
		</div>
	)
}
