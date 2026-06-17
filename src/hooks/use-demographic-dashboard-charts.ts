import { addDays, format, getHours, isValid, parseISO, startOfDay } from 'date-fns'
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

interface DemographicDashboardCharts {
	charts: {
		age: AgeChartItem[]
		gender: GenderChartItem[]
	}
}

type DashboardView = 'daily' | 'monthly' | 'weekly'

interface DashboardChartInterval {
	startDate: Date
	endDate: Date
}

const ageRanges = [
	{ label: '0-17', min: 0, max: 17 },
	{ label: '18-24', min: 18, max: 24 },
	{ label: '25-34', min: 25, max: 34 },
	{ label: '35-44', min: 35, max: 44 },
	{ label: '45-54', min: 45, max: 54 },
	{ label: '55+', min: 55, max: Number.POSITIVE_INFINITY },
] as const

function getEmptyGenderPassages(): Omit<GenderChartItem, 'label'> {
	return { female: 0, male: 0 }
}

export function useDemographicDashboardCharts(
	detections: DetectionDTO[] | undefined,
	view: DashboardView,
	interval: DashboardChartInterval
): DemographicDashboardCharts {
	return useMemo(() => {
		const age = ageRanges.map(({ label }) => ({
			age: label,
			passages: 0,
		}))
		const passagesByHour = new Map<number, Omit<GenderChartItem, 'label'>>()
		const passagesByDay = new Map<string, Omit<GenderChartItem, 'label'>>()

		for (const detection of detections ?? []) {
			const detectionAge = detection.demographics.age

			if (Number.isFinite(detectionAge) && detectionAge >= 0) {
				const rangeIndex = ageRanges.findIndex(
					({ min, max }) => detectionAge >= min && detectionAge <= max
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
			const day = format(startOfDay(timestamp), 'yyyy-MM-dd')
			const passages =
				view === 'daily'
					? (passagesByHour.get(hour) ?? getEmptyGenderPassages())
					: (passagesByDay.get(day) ?? getEmptyGenderPassages())

			if (gender === 'MALE') {
				passages.male += 1
			} else {
				passages.female += 1
			}

			if (view === 'daily') {
				passagesByHour.set(hour, passages)
			} else {
				passagesByDay.set(day, passages)
			}
		}

		const gender: GenderChartItem[] = []

		if (view === 'daily') {
			for (let hour = 0; hour <= 23; hour += 1) {
				const passages = passagesByHour.get(hour) ?? getEmptyGenderPassages()

				gender.push({
					label: `${hour}h`,
					...passages,
				})
			}
		} else {
			let currentDay = startOfDay(interval.startDate)
			const lastDay = startOfDay(interval.endDate)

			while (currentDay <= lastDay) {
				const dayKey = format(currentDay, 'yyyy-MM-dd')
				const passages = passagesByDay.get(dayKey) ?? getEmptyGenderPassages()

				gender.push({
					label: format(currentDay, 'dd MMM'),
					...passages,
				})

				currentDay = addDays(currentDay, 1)
			}
		}

		return {
			charts: {
				age,
				gender,
			},
		}
	}, [detections, view, interval.startDate, interval.endDate])
}
