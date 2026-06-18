import { BadgeCheck, Minus, TrendingDown, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ConfidenceCardProps {
	confidence: number
}

export function getConfidenceLabel(percent: number) {
	if (percent >= 0.7) {
		return <TrendingUp className="size-4" />
	}

	if (percent >= 0.5) {
		return <Minus className="size-4" />
	}

	return <TrendingDown className="size-4" />
}

export function ConfidenceCard({ confidence }: ConfidenceCardProps) {
	const { t, i18n } = useTranslation()

	const language = i18n.resolvedLanguage ?? i18n.language

	return (
		<Card className="gap-4">
			<CardHeader className="flex flex-row items-start justify-between space-y-0">
				<div className="space-y-1">
					<CardTitle className="text-base font-semibold">
						{t('dashboards.demographic.cards.confidence.title')}
					</CardTitle>
					<p className="text-xs text-muted-foreground">
						{t('dashboards.demographic.cards.confidence.subtitle')}
					</p>
				</div>

				<div className="rounded-xl p-2.5 bg-muted">
					<BadgeCheck className="size-5" />
				</div>
			</CardHeader>

			<CardContent className="flex flex-col gap-3">
				<div className="flex items-end gap-2">
					<span className="text-3xl font-bold tracking-tight">
						{confidence.toLocaleString(language, { style: 'percent' })}
					</span>
					<span className="pb-1 text-sm text-muted-foreground">
						{t('dashboards.demographic.cards.confidence.average')}
					</span>
				</div>

				<div className="flex items-center justify-between text-xs">
					<span className="text-muted-foreground">
						{t('dashboards.demographic.cards.confidence.footer_text')}
					</span>
					<span className="font-medium">{getConfidenceLabel(confidence)}</span>
				</div>
			</CardContent>
		</Card>
	)
}
