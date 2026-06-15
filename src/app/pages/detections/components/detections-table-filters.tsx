import { format, subDays } from 'date-fns'
import { Search } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { useSearchParams } from 'react-router-dom'
import { DateRangePicker } from '@/components/date-range-picker'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export function DetectionsTableFilters() {
	const [_searchParams, setSearchParams] = useSearchParams()

	const [dateRange, setDateRange] = useState<DateRange>({
		from: subDays(new Date(), 7),
		to: new Date(),
	})

	function handleFilter(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const { from, to } = dateRange

		if (!from || !to) {
			throw new Error('Date range not defined!')
		}

		setSearchParams((url) => {
			url.set('start', format(from, 'yyyy-MM-dd'))
			url.set('end', format(to, 'yyyy-MM-dd'))

			return url
		})
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
				</div>
			</div>
		</form>
	)
}
