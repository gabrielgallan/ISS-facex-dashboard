import { format } from 'date-fns'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export function DatePicker() {
	const [date, setDate] = React.useState<Date>(new Date())

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					data-empty={!date}
					className="w-70 justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
				>
					{date ? format(date, 'PPP') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar mode="single" required={true} selected={date} onSelect={setDate} />
			</PopoverContent>
		</Popover>
	)
}
