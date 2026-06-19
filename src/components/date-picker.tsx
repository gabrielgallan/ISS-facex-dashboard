import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getLocaleModules } from '@/utils/get-locale-modules'

interface DatePickerProps {
	value: Date
	onChange: (value: Date) => void
}

export function DatePicker({ value, onChange }: DatePickerProps) {
	const { i18n } = useTranslation()

	const { dayPicker, dateFns } = getLocaleModules(i18n.language)

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className="w-48 justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
				>
					{format(value, 'PPP', {
						locale: dateFns,
					})}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					locale={dayPicker}
					mode="single"
					required={true}
					selected={value}
					onSelect={onChange}
				/>
			</PopoverContent>
		</Popover>
	)
}
