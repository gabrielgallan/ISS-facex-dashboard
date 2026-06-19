import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import type { DateRange } from 'react-day-picker'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Field } from '@/components/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getLocaleModules } from '@/utils/get-locale-modules'

interface DateRangePickerProps {
	value: DateRange
	onChange: (value: DateRange) => void
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
	const { i18n } = useTranslation()

	const { dayPicker } = getLocaleModules(i18n.language)

	return (
		<Field>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						type="button"
						variant="outline"
						id="date-picker-range"
						className="justify-start px-2.5 font-normal"
					>
						<CalendarIcon className="size-4" />

						{value?.from ? (
							value.to ? (
								<>
									{format(value.from, 'dd/MM/yyyy')} - {format(value.to, 'dd/MM/yyyy')}
								</>
							) : (
								format(value.from, 'dd/MM/yyyy')
							)
						) : (
							<span>Selecionar período</span>
						)}
					</Button>
				</PopoverTrigger>

				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						locale={dayPicker}
						mode="range"
						required
						defaultMonth={value?.from}
						selected={value}
						onSelect={onChange}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</Field>
	)
}
