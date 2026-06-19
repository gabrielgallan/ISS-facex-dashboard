import { TriangleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface NoMatchRateCardProps {
	percent: number
}

export function NoMatchRateCard({ percent }: NoMatchRateCardProps) {
    const { t, i18n } = useTranslation()
	return (
		<Card className="gap-4">
			<CardHeader className="flex flex-row items-start justify-between space-y-0">
				<div className="space-y-1">
					<CardTitle className="text-base font-semibold">{t('dashboards.movement.cards.no_match_rate.title')}</CardTitle>
					<p className="text-xs text-muted-foreground">{t('dashboards.movement.cards.no_match_rate.subtitle')}</p>
				</div>

				<div className="rounded-xl p-2.5 bg-amber-500/10 text-amber-500">
					<TriangleAlert className="size-5" />
				</div>
			</CardHeader>

			<CardContent className="flex flex-col gap-3">
				<div className="flex items-end gap-2">
					<span className="text-3xl font-bold tracking-tight">
						{percent.toLocaleString(i18n.language, { style: 'percent' })}
					</span>
				</div>

				<div className="flex items-center justify-between text-xs">
					<span className="text-muted-foreground">{t('dashboards.movement.cards.no_match_rate.footer_text')}</span>
				</div>
			</CardContent>
		</Card>
	)
}
