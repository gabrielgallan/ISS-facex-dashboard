import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface DatePickerProps {
	value: Date
	onChange: (value: Date) => void
}

export function DatePicker({ value, onChange }: DatePickerProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className="w-48 justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
				>
					{format(value, 'PPP', {
						locale: ptBR,
					})}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar mode="single" required={true} selected={value} onSelect={onChange} />
			</PopoverContent>
		</Popover>
	)
}
