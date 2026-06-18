import { ScanFace } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DetectionsAmountCardProps {
	amount: number
	activeCams: number
}

export function DetectionsAmountCard({ amount, activeCams }: DetectionsAmountCardProps) {
	const { t } = useTranslation()

	return (
		<Card className="gap-4">
			<CardHeader className="flex flex-row items-start justify-between space-y-0">
				<div className="space-y-1">
					<CardTitle className="text-base font-semibold">
						{t('dashboards.demographic.cards.total.title')}
					</CardTitle>
					<p className="text-xs text-muted-foreground">
						{t('dashboards.demographic.cards.total.subtitle')}
					</p>
				</div>

				<div className="rounded-xl p-2.5 bg-muted">
					<ScanFace className="size-5" />
				</div>
			</CardHeader>

			<CardContent className="flex flex-col gap-3">
				<div className="flex items-end gap-2">
					<span className="text-3xl font-bold tracking-tight">{amount}</span>
					<span className="pb-1 text-sm text-muted-foreground">
						{t('dashboards.demographic.cards.total.passages')}
					</span>
				</div>

				<div className="flex items-center justify-between text-xs">
					<span className="text-muted-foreground">
						{t('dashboards.demographic.cards.total.footer_text')}
					</span>
					<span className="font-medium">
						{t('dashboards.demographic.cards.total.active', { count: activeCams })}
					</span>
				</div>
			</CardContent>
		</Card>
	)
}
