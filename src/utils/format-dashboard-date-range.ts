import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from 'date-fns'
import type { DashboardViews } from '@/app/pages/dashboards/demographic'

interface DateRange {
	start: string
	end: string
}

export function formatDashboardDateRange(view: DashboardViews, url: URLSearchParams): DateRange {
	const now = new Date()

	switch (view) {
		case 'daily': {
			const start = url.get('start') ?? format(now, 'yyyy-MM-dd')
			const end = url.get('end') ?? format(now, 'yyyy-MM-dd')

			return { start, end }
		}

		case 'weekly': {
			const start = format(startOfWeek(now), 'yyyy-MM-dd')
			const end = format(endOfWeek(now), 'yyyy-MM-dd')

			return { start, end }
		}

		case 'monthly': {
			const start = format(startOfMonth(now), 'yyyy-MM-dd')
			const end = format(endOfMonth(now), 'yyyy-MM-dd')

			return { start, end }
		}
	}
}
