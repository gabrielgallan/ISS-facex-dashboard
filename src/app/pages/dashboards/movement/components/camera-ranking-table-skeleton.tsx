import { Hash } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function CameraRankingTableSkeleton({ rows = 2 }: { rows?: number }) {
	const { t } = useTranslation()

	return (
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

				{Array.from({ length: rows }).map((_, index) => (
					<TableRow key={index}>
						<TableCell />

						<TableCell>
							<Skeleton className="w-4 h-4 rounded" />
						</TableCell>

						<TableCell>
							<Skeleton className="w-26 h-4 rounded" />
						</TableCell>

						<TableCell>
							<Skeleton className="w-8 h-4 rounded" />
						</TableCell>

						<TableCell>
							<Skeleton className="w-12 h-4 rounded ml-auto" />
						</TableCell>

						<TableCell>
							<Skeleton className="w-12 h-4 rounded ml-auto" />
						</TableCell>
					</TableRow>
				))}
			</Table>
		</div>
	)
}
