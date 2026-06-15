import { format, parseISO } from 'date-fns'
import { ChartArea } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DatePicker } from '@/components/date-picker'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export function DashboardFilters() {
	const [searchParams, setSearchParams] = useSearchParams()

	const initialDateValue = searchParams.get('date') ?? format(new Date(), 'yyyy-MM-dd')

	const dateISO = parseISO(initialDateValue)

	const [date, setDate] = useState<Date>(dateISO)

	function handleFilter(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		setSearchParams((url) => {
			url.set('date', format(date, 'yyyy-MM-dd'))

			return url
		})
	}

	return (
		<form onSubmit={handleFilter}>
			<div className="flex gap-4 w-full md:w-fit md:items-center">
				<Label className="hidden md:block">Filtros</Label>

				<div className="md:flex grid gap-2">
					<DatePicker value={date} onChange={setDate} />

					<Button type="submit" variant="secondary" className="gap-2">
						<ChartArea className="size-4" />
						<span className="text-sm">Gerar Dashboard</span>
					</Button>
				</div>
			</div>
		</form>
	)
}
