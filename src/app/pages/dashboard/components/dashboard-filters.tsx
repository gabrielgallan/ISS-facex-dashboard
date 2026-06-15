import { Search, X } from 'lucide-react'
import { DatePicker } from '@/components/date-picker'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export function DashboardFilters() {
	return (
		<form>
			<div className="flex gap-4 w-full md:w-fit md:items-center">
				<Label className="hidden md:block">Filtros</Label>

				<div className="md:flex grid gap-2">
					<DatePicker />

					<Button type="submit" variant="secondary" className="gap-2">
						<Search className="size-4" />
						<span className="text-sm">Pesquisar</span>
					</Button>

					<Button type="button" variant="ghost" className="gap-2">
						<X className="size-4" />
						<span className="text-sm">Limpar filtros</span>
					</Button>
				</div>
			</div>
		</form>
	)
}
