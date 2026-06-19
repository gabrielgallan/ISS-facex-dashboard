import { Hash } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pagination } from '@/components/pagination'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import type { CameraRank } from '@/hooks/use-movement-dashboard-camera-ranking'

function CameraRankingTableRow({ camera }: { camera: CameraRank }) {
	const { i18n } = useTranslation()

	const formatedPercent = camera.percentOfTotal.toLocaleString('en-US', { style: 'percent' })

	return (
		<TableRow>
			<TableCell>
				<Checkbox />
			</TableCell>

			<TableCell className="font-medium">{camera.rank}</TableCell>

			<TableCell>{camera.name}</TableCell>

			<TableCell className="text-muted-foreground">[{camera.id}]</TableCell>

			<TableCell className="text-right tabular-nums">
				{camera.passages.toLocaleString(i18n.language)}
			</TableCell>

			<TableCell className="text-right">
				<div className="flex items-center justify-end gap-2">
					<div className="h-2 w-30 overflow-hidden rounded-xs bg-muted">
						<div
							className="h-full rounded-xs bg-cyan-500"
							style={{ width: `${formatedPercent}` }}
						/>
					</div>

					<span className="w-10 tabular-nums">{formatedPercent}</span>
				</div>
			</TableCell>
		</TableRow>
	)
}

interface CameraRankingTableProps {
	cameras: CameraRank[]
}

export function CameraRankingTable({ cameras }: CameraRankingTableProps) {
	const { t } = useTranslation()
	const [page, setPage] = useState<number>(1)

	const limit = 10

	const camerasPaginated = cameras.slice(limit * (page - 1), limit * page)

	return (
		<>
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader className="bg-muted/55">
						<TableRow>
							<TableHead className="w-8">
								<Checkbox />
							</TableHead>
							<TableHead className="w-20">
								<div className="flex items-center gap-2">
									<Hash className="size-3 text-muted-foreground" />
									<span>{t('dashboards.movement.camera_ranking_table.columns.rank')}</span>
								</div>
							</TableHead>

							<TableHead className="w-36">{t('dashboards.movement.camera_ranking_table.columns.camera_name')}</TableHead>
							<TableHead className="w-32">{t('dashboards.movement.camera_ranking_table.columns.camera_id')}</TableHead>
							<TableHead className="text-right w-64">{t('dashboards.movement.camera_ranking_table.columns.passages')}</TableHead>
							<TableHead className="text-right w-42">{t('dashboards.movement.camera_ranking_table.columns.percent_of_total')}</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{camerasPaginated.map((cam) => (
							<CameraRankingTableRow key={cam.id} camera={cam} />
						))}
					</TableBody>
				</Table>
			</div>

			{cameras && (
				<Pagination limit={limit} page={page} total={cameras.length} onPageChange={setPage} />
			)}
		</>
	)
}
