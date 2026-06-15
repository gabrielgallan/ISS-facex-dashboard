import { getHours, isValid, parseISO } from 'date-fns'
import { useMemo } from 'react'
import type { DetectionDTO } from '@/api/dto/list-detections-response.dto'

interface AgeChartItem {
	age: string
	passages: number
}

interface GenderChartItem {
	label: string
	female: number
	male: number
}

interface DashboardCharts {
	charts: {
		age: AgeChartItem[]
		gender: GenderChartItem[]
	}
}

const ageRanges = [
	{ label: '0-17', min: 0, max: 17 },
	{ label: '18-24', min: 18, max: 24 },
	{ label: '25-34', min: 25, max: 34 },
	{ label: '35-44', min: 35, max: 44 },
	{ label: '45-54', min: 45, max: 54 },
	{ label: '55+', min: 55, max: Number.POSITIVE_INFINITY },
] as const

export function useDashboardCharts(detections?: DetectionDTO[]): DashboardCharts {
	return useMemo(() => {
		const age = ageRanges.map(({ label }) => ({
			age: label,
			passages: 0,
		}))
		const passagesByHour = new Map<number, Omit<GenderChartItem, 'label'>>()

		for (const detection of detections ?? []) {
			const detectionAge = detection.demographics.age

			if (Number.isFinite(detectionAge) && detectionAge >= 0) {
				const rangeIndex = ageRanges.findIndex(
					({ min, max }) => detectionAge >= min && detectionAge <= max,
				)

				if (rangeIndex >= 0) {
					age[rangeIndex].passages += 1
				}
			}

			const gender = detection.demographics.gender

			if (gender !== 'MALE' && gender !== 'FEMALE') {
				continue
			}

			const timestamp = parseISO(detection.timestamp)

			if (!isValid(timestamp)) {
				continue
			}

			const hour = getHours(timestamp)
			const passages = passagesByHour.get(hour) ?? { female: 0, male: 0 }

			if (gender === 'MALE') {
				passages.male += 1
			} else {
				passages.female += 1
			}

			passagesByHour.set(hour, passages)
		}

		const hours = [...passagesByHour.keys()]
		const gender: GenderChartItem[] = []

		if (hours.length > 0) {
			const firstHour = Math.min(...hours)
			const lastHour = Math.max(...hours)

			for (let hour = firstHour; hour <= lastHour; hour += 1) {
				const passages = passagesByHour.get(hour) ?? { female: 0, male: 0 }

				gender.push({
					label: `${hour}h`,
					...passages,
				})
			}
		}

		return {
			charts: {
				age,
				gender,
			},
		}
	}, [detections])
}
