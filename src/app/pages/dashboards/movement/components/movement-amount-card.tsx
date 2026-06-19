import { RadarIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MovementAmountCardProps {
	amount: number
}

export function MovementAmountCard({ amount }: MovementAmountCardProps) {
	const { t, i18n } = useTranslation()

	return (
		<Card className="gap-4">
			<CardHeader className="flex flex-row items-start justify-between space-y-0">
				<div className="space-y-1">
					<CardTitle className="text-base font-semibold">
						{t('dashboards.movement.cards.movement.title')}
					</CardTitle>
					<p className="text-xs text-muted-foreground">
						{t('dashboards.movement.cards.movement.subtitle')}
					</p>
				</div>

				<div className="rounded-xl p-2.5 bg-muted">
					<RadarIcon className="size-5" />
				</div>
			</CardHeader>

			<CardContent className="flex flex-col gap-3">
				<div className="flex items-end gap-2">
					<span className="text-3xl font-bold tracking-tight">
						{amount.toLocaleString(i18n.language)}
					</span>
				</div>

				<div className="flex items-center justify-between text-xs">
					<span className="text-muted-foreground">
						{t('dashboards.movement.cards.movement.footer_text')}
					</span>
				</div>
			</CardContent>
		</Card>
	)
}
