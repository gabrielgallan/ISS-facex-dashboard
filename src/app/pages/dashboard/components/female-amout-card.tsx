import { Venus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function FemaleAmountCard() {
	return (
		<Card className="gap-4 border-rose-500/10 bg-linear-to-br from-card to-rose-500/5">
			<CardHeader className="flex flex-row items-start justify-between space-y-0">
				<div className="space-y-1">
					<CardTitle className="text-base font-semibold">Mulheres</CardTitle>
					<p className="text-xs text-muted-foreground">Gênero estimado</p>
				</div>

				<div className="rounded-xl bg-rose-500/10 p-2.5 text-rose-500">
					<Venus className="size-5" />
				</div>
			</CardHeader>

			<CardContent className="flex flex-col gap-3">
				<div className="flex items-end gap-2">
					<span className="text-3xl font-bold tracking-tight">148</span>
					<span className="pb-1 text-sm text-muted-foreground">passagens</span>
				</div>

				<div className="flex items-center justify-between text-xs">
					<span className="text-muted-foreground">Do total detectado</span>
					<span className="font-medium text-rose-500">44%</span>
				</div>
			</CardContent>
		</Card>
	)
}
