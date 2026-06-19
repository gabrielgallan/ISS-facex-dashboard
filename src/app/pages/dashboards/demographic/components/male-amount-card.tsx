import { Mars } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MaleAmountCardProps {
	amount: number
	percentOfTotal: number
}

export function MaleAmountCard({ amount, percentOfTotal }: MaleAmountCardProps) {
	const { t, i18n } = useTranslation()
	const language = i18n.resolvedLanguage ?? i18n.language

	return (
		<Card className="gap-4 border-blue-500/10 bg-linear-to-br from-card to-blue-500/5">
			<CardHeader className="flex flex-row items-start justify-between space-y-0">
				<div className="space-y-1">
					<CardTitle className="text-base font-semibold">
						{t('dashboards.demographic.cards.male.title')}
					</CardTitle>
					<p className="text-xs text-muted-foreground">
						{t('dashboards.demographic.cards.male.subtitle')}
					</p>
				</div>

				<div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-500">
					<Mars className="size-5" />
				</div>
			</CardHeader>

			<CardContent className="flex flex-col gap-3">
				<div className="flex items-end gap-2">
					<span className="text-3xl font-bold tracking-tight">{amount}</span>
					<span className="pb-1 text-sm text-muted-foreground">
						{t('dashboards.demographic.cards.male.passages')}
					</span>
				</div>

				<div className="flex items-center justify-between text-xs">
					<span className="text-muted-foreground">
						{t('dashboards.demographic.cards.male.of_total')}
					</span>
					<span className="font-medium text-blue-500">
						{percentOfTotal.toLocaleString(language, {
							style: 'percent',
						})}
					</span>
				</div>
			</CardContent>
		</Card>
	)
}
