import { useTranslation } from 'react-i18next'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { ethnicityBreakdownMock } from './demographic-breakdown.mock'

export function EthnicityTable() {
	const { i18n, t } = useTranslation()

	return (
		<div className="overflow-hidden rounded-xl border lg:col-span-5">
			<Table>
				<TableHeader className="bg-muted/55">
					<TableRow>
						<TableHead className="w-16">
							<span className="font-medium">#</span>
						</TableHead>
						<TableHead>{t('dashboards.demographic.breakdown_table.columns.ethnicity')}</TableHead>
						<TableHead className="text-right">
							{t('dashboards.demographic.breakdown_table.columns.passages')}
						</TableHead>
						<TableHead className="text-right">
							{t('dashboards.demographic.breakdown_table.columns.percent_of_total')}
						</TableHead>
						<TableHead className="text-right">
							{t('dashboards.demographic.breakdown_table.columns.average_confidence')}
						</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{ethnicityBreakdownMock.map((item, index) => (
						<TableRow key={item.key}>
							<TableCell className="font-medium"># {index + 1}</TableCell>
							<TableCell>
								<div className="flex items-center gap-2">
									<span className="size-2 rounded-xs" style={{ backgroundColor: item.fill }} />
									<span className="font-medium">{t(item.labelKey)}</span>
								</div>
							</TableCell>
							<TableCell className="text-right tabular-nums">
								{item.detections.toLocaleString(i18n.language)}
							</TableCell>
							<TableCell className="text-right">
								<div className="flex items-center justify-end gap-2">
									<div className="h-2 w-24 md:w-28 overflow-hidden rounded-xs bg-muted">
										<div
											className="h-full rounded-xs"
											style={{
												width: `${item.percentage * 100}%`,
												backgroundColor: item.fill,
											}}
										/>
									</div>
									<span className="w-12 tabular-nums">
										{item.percentage.toLocaleString(i18n.language, {
											style: 'percent',
											maximumFractionDigits: 0,
										})}
									</span>
								</div>
							</TableCell>
							<TableCell className="text-right tabular-nums">
								{item.averageConfidence.toLocaleString(i18n.language, {
									style: 'percent',
									maximumFractionDigits: 0,
								})}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
