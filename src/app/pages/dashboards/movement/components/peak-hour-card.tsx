import { TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface PeakHourCardProps {
	hour: string
	passages: number
}

export function PeakHourCard({ hour, passages }: PeakHourCardProps) {
	return (
		<Card className="gap-4">
			<CardHeader className="flex flex-row items-start justify-between space-y-0">
				<div className="space-y-1">
					<CardTitle className="text-base font-semibold">Horário de pico</CardTitle>
					<p className="text-xs text-muted-foreground">Maior concentração</p>
				</div>

				<div className="rounded-xl p-2.5 bg-cyan-500/10 text-cyan-500">
					<TrendingUp className="size-5" />
				</div>
			</CardHeader>

			<CardContent className="flex flex-col gap-3">
				<div className="flex items-end gap-2">
					<span className="text-3xl font-bold tracking-tight">{hour}</span>
				</div>

				<div className="flex items-center justify-between text-xs">
					<span className="text-muted-foreground">{passages} passagens</span>
				</div>
			</CardContent>
		</Card>
	)
}
