import { BadgeCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ConfidenceCard() {
	return (
		<Card className="gap-4 border-[color-mix(in_srgb,var(--confidence)_10%,transparent)] bg-linear-to-br from-card to-[color-mix(in_srgb,var(--confidence)_5%,transparent)]">
			<CardHeader className="flex flex-row items-start justify-between space-y-0">
				<div className="space-y-1">
					<CardTitle className="text-base font-semibold">Confiança média</CardTitle>
					<p className="text-xs text-muted-foreground">Das detecções faciais</p>
				</div>

				<div className="rounded-xl bg-[color-mix(in_srgb,var(--confidence)_10%,transparent)] p-2.5 text-[var(--confidence)]">
					<BadgeCheck className="size-5" />
				</div>
			</CardHeader>

			<CardContent className="flex flex-col gap-3">
				<div className="flex items-end gap-2">
					<span className="text-3xl font-bold tracking-tight">94%</span>
					<span className="pb-1 text-sm text-muted-foreground">média</span>
				</div>

				<div className="flex items-center justify-between text-xs">
					<span className="text-muted-foreground">Baseada no score da API</span>
					<span className="font-medium text-[var(--confidence)]">Alta</span>
				</div>
			</CardContent>
		</Card>
	)
}
