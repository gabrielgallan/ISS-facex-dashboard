import { DetectionsTable } from './components/detections-table'
import { DetectionsTableFilters } from './components/detections-table-filters'

export function DetectionsPage() {
	return (
		<div className="space-y-4 gap-4">
			<DetectionsTableFilters />

			<DetectionsTable />
		</div>
	)
}
