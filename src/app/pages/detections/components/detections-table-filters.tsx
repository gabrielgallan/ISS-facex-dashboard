import { subDays } from 'date-fns'
import { Search, X } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { DateRangePicker } from '@/components/date-range-picker'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export function DetectionsTableFilters() {
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: subDays(new Date(), 7),
		to: new Date(),
	})

	function handleFilter(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		if (!dateRange?.from || !dateRange?.to) {
			throw new Error('Date range not defined!')
		}

		const filters = {
			min_timestamp: dateRange.from,
			max_timestamp: dateRange.to,
		}

		console.log(filters)
	}

	return (
		<form onSubmit={handleFilter}>
			<div className="flex gap-4 w-full md:w-fit md:items-center">
				<Label className="hidden md:block">Filtros</Label>

				<div className="md:flex grid gap-2">
					<DateRangePicker value={dateRange} onChange={setDateRange} />

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
