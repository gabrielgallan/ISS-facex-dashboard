import { ConfidenceCard } from './components/confidence-card'
import { DashboardFilters } from './components/dashboard-filters'
import { DetectionsAmountCard } from './components/detections-amount-card'
import { FemaleAmountCard } from './components/female-amout-card'
import { MaleAmountCard } from './components/male-amount-card'
import { PassagesByAgeChart } from './components/passages-by-age-chart'
import { PassagesByGenderChart } from './components/passages-by-gender-chart'

export function DashbaordPage() {
	return (
		<div className="space-y-4">
			<div>
				<DashboardFilters />
			</div>

			<div className="grid md:grid-cols-4 gap-4">
				<DetectionsAmountCard />
				<ConfidenceCard />
				<MaleAmountCard />
				<FemaleAmountCard />
			</div>

			<div className="grid md:grid-cols-9 gap-4 md:h-120">
				<PassagesByGenderChart />
				<PassagesByAgeChart />
			</div>
		</div>
	)
}
