import { RadarIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MovementAmountCardProps {
	amount: number
}

export function MovementAmountCard({ amount }: MovementAmountCardProps) {
	return (
		<Card className="gap-4">
			<CardHeader className="flex flex-row items-start justify-between space-y-0">
				<div className="space-y-1">
					<CardTitle className="text-base font-semibold">Movimentação total</CardTitle>
					<p className="text-xs text-muted-foreground">Período monitorado</p>
				</div>

				<div className="rounded-xl p-2.5 bg-muted">
					<RadarIcon className="size-5" />
				</div>
			</CardHeader>

			<CardContent className="flex flex-col gap-3">
				<div className="flex items-end gap-2">
					<span className="text-3xl font-bold tracking-tight">{amount}</span>
				</div>

				<div className="flex items-center justify-between text-xs">
					<span className="text-muted-foreground">Passagens consolidadas</span>
				</div>
			</CardContent>
		</Card>
	)
}
