import { Check, Minus, TrendingDown, TrendingUp, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ConfidenceCardProps {
	confidence: number
}

export function getConfidenceLabel(percent: number) {
	if (percent >= 0.7) {
		return (
			<span className="flex items-center gap-2">
				<TrendingUp className="size-4" />
				Alta
			</span>
		)
	}

	if (percent >= 0.5) {
		return (
			<span className="flex items-center gap-2">
				<Minus className="size-4" />
				Média
			</span>
		)
	}

	if (percent >= 0.3) {
		return (
			<span className="flex items-center gap-2">
				<TrendingDown className="size-4" />
				Baixa
			</span>
		)
	}

	return (
		<span className="flex items-center gap-2">
			<X className="size-4" />
			Muito baixa
		</span>
	)
}

export function ConfidenceCard({ confidence }: ConfidenceCardProps) {
	return (
		<Card className="gap-4 border-emerald-500/10 bg-linear-to-br from-card to-emerald-500/5">
			<CardHeader className="flex flex-row items-start justify-between space-y-0">
				<div className="space-y-1">
					<CardTitle className="text-base font-semibold">Confiança média</CardTitle>
					<p className="text-xs text-muted-foreground">Das detecções faciais</p>
				</div>

				<div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-500">
					<Check className="size-5" />
				</div>
			</CardHeader>

			<CardContent className="flex flex-col gap-3">
				<div className="flex items-end gap-2">
					<span className="text-3xl font-bold tracking-tight">
						{confidence.toLocaleString('en-US', { style: 'percent' })}
					</span>
					<span className="pb-1 text-sm text-muted-foreground">média</span>
				</div>

				<div className="flex items-center justify-between text-xs">
					<span className="text-muted-foreground">Baseada no score da API</span>
					<span className="font-medium text-emerald-400">{getConfidenceLabel(confidence)}</span>
				</div>
			</CardContent>
		</Card>
	)
}
