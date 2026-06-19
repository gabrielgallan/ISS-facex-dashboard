import { useMemo } from 'react'
import type { DetectionDTO, GenderDTO } from '@/api/facex/dto/list-detections-response.dto'

interface CardMetric {
	amount: number
	percent: number
}

export interface DemographicDashboardCards {
	cards: {
		detections: Pick<CardMetric, 'amount'>
		confidence: Pick<CardMetric, 'amount'>
		male: CardMetric
		female: CardMetric
	}
}

function isGender(value: GenderDTO): value is 'MALE' | 'FEMALE' {
	return value === 'MALE' || value === 'FEMALE'
}

export function useDemographicDashboardCards(
	detections?: DetectionDTO[]
): DemographicDashboardCards {
	return useMemo(() => {
		const list = detections ?? []
		const total = list.length

		if (total === 0) {
			return {
				cards: {
					detections: { amount: 0 },
					confidence: { amount: 0 },
					male: { amount: 0, percent: 0 },
					female: { amount: 0, percent: 0 },
				},
			}
		}

		let maleAmount = 0
		let femaleAmount = 0
		let confidenceSum = 0

		for (const detection of list) {
			confidenceSum += detection.confidence

			if (isGender(detection.demographics.gender)) {
				if (detection.demographics.gender === 'MALE') {
					maleAmount += 1
				} else {
					femaleAmount += 1
				}
			}
		}

		return {
			cards: {
				detections: { amount: total },
				confidence: { amount: confidenceSum / total },
				male: { amount: maleAmount, percent: maleAmount / total },
				female: { amount: femaleAmount, percent: femaleAmount / total },
			},
		}
	}, [detections])
}
