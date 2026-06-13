import { DetectionsAmountCard } from './components/detections-amount-card'
import { FemaleAmountCard } from './components/female-amout-card'
import { MaleAmountCard } from './components/male-amount-card'
import { PassagesByGenderChart } from './components/passages-by-gender-chart'

export function HomePage() {
	return (
		<div className="space-y-4 p-6">
			<div className="grid grid-cols-4 gap-4">
				<DetectionsAmountCard />
				<MaleAmountCard />
				<FemaleAmountCard />
			</div>

			<div className="h-120">
				<PassagesByGenderChart />
			</div>
		</div>
	)
}
