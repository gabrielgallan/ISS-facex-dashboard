import { TriangleAlert } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface NoMatchRateCardProps {
	percent: number
}

export function NoMatchRateCard({ percent }: NoMatchRateCardProps) {
	return (
		<Card className="gap-4">
			<CardHeader className="flex flex-row items-start justify-between space-y-0">
				<div className="space-y-1">
					<CardTitle className="text-base font-semibold">Taxa de desconhecidos</CardTitle>
					<p className="text-xs text-muted-foreground">Detecções sem match</p>
				</div>

				<div className="rounded-xl p-2.5 bg-amber-500/10 text-amber-500">
					<TriangleAlert className="size-5" />
				</div>
			</CardHeader>

			<CardContent className="flex flex-col gap-3">
				<div className="flex items-end gap-2">
					<span className="text-3xl font-bold tracking-tight">
						{percent.toLocaleString('en-US', { style: 'percent' })}
					</span>
				</div>

				<div className="flex items-center justify-between text-xs">
					<span className="text-muted-foreground">Sinal operacional de atenção</span>
				</div>
			</CardContent>
		</Card>
	)
}
