import { Venus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface FemaleAmountCardProps {
	amount: number
	percentOfTotal: number
}

export function FemaleAmountCard({ amount, percentOfTotal }: FemaleAmountCardProps) {
	const { t, i18n } = useTranslation()
	const language = i18n.resolvedLanguage ?? i18n.language

	return (
		<Card className="gap-4 border-rose-500/10 bg-linear-to-br from-card to-rose-500/5">
			<CardHeader className="flex flex-row items-start justify-between space-y-0">
				<div className="space-y-1">
					<CardTitle className="text-base font-semibold">
						{t('dashboards.demographic.cards.female.title')}
					</CardTitle>
					<p className="text-xs text-muted-foreground">
						{t('dashboards.demographic.cards.female.subtitle')}
					</p>
				</div>

				<div className="rounded-xl bg-rose-500/10 p-2.5 text-rose-500">
					<Venus className="size-5" />
				</div>
			</CardHeader>

			<CardContent className="flex flex-col gap-3">
				<div className="flex items-end gap-2">
					<span className="text-3xl font-bold tracking-tight">{amount}</span>
					<span className="pb-1 text-sm text-muted-foreground">
						{t('dashboards.demographic.cards.female.passages')}
					</span>
				</div>

				<div className="flex items-center justify-between text-xs">
					<span className="text-muted-foreground">
						{t('dashboards.demographic.cards.female.of_total')}
					</span>
					<span className="font-medium text-rose-500">
						{percentOfTotal.toLocaleString(language, {
							style: 'percent',
						})}
					</span>
				</div>
			</CardContent>
		</Card>
	)
}
