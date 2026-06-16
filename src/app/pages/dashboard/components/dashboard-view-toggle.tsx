import { useSearchParams } from 'react-router-dom'
import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const dashboardViews = [
	{
		value: 'daily',
		label: 'Diária',
	},
	{
		value: 'weekly',
		label: 'Semanal',
	},
	{
		value: 'monthly',
		label: 'Mensal',
	},
] as const

type DashboardView = (typeof dashboardViews)[number]['value']

export function DashboardViewToggle() {
	const [searchParams, setSearchParams] = useSearchParams()

	const currentView = (searchParams.get('view') ?? 'daily') as DashboardView

	function handleChange(value: string) {
		if (!value) return

		setSearchParams((url) => {
			url.set('view', value)

			url.delete('start')
			url.delete('end')

			return url
		})
	}

	return (
		<div className="flex items-center gap-2">
			<Label className="text-xs">Frequência</Label>

			<ToggleGroup
				type="single"
				value={currentView}
				onValueChange={handleChange}
				className="justify-start"
			>
				{dashboardViews.map((view) => (
					<ToggleGroupItem key={view.value} value={view.value} className="text-xs font-medium">
						{view.label}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
		</div>
	)
}
