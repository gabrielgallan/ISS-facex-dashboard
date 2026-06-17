import { format, getHours, isValid, parseISO } from 'date-fns'
import { useMemo } from 'react'
import type { DetectionDTO } from '@/api/facex/dto/list-detections-response.dto'
import type { GetCamerasResponseDTO } from '@/api/server/dto/get-cameras-response.dto'

interface CameraRankingChartItem {
	cameraName: string
	passages: number
}

interface TimelineChartItem {
	label: string
	passages: number
}

interface MovementDashboardCharts {
	charts: {
		cameraRanking: CameraRankingChartItem[]
		timeline: TimelineChartItem[]
	}
}

function getTimelineLabel(hour: number) {
	return format(new Date(2000, 0, 1, hour), 'HH:00')
}

export function useMovementDashboardCharts(
	detections?: DetectionDTO[],
	cameras?: GetCamerasResponseDTO
): MovementDashboardCharts {
	return useMemo(() => {
		const passagesByCamera = new Map<string, number>()
		const passagesByHour = new Map<number, number>()

		for (const detection of detections ?? []) {
			passagesByCamera.set(detection.feed, (passagesByCamera.get(detection.feed) ?? 0) + 1)

			const timestamp = parseISO(detection.timestamp)

			if (isValid(timestamp)) {
				const hour = getHours(timestamp)

				passagesByHour.set(hour, (passagesByHour.get(hour) ?? 0) + 1)
			}
		}

		const cameraRanking = [...passagesByCamera.entries()]
			.map(([cameraId, passages]) => ({
				cameraName:
					cameras?.find((camera) => camera.id === cameraId)?.name ?? `Câmera ${cameraId}`,
				passages,
			}))
			.sort((cameraA, cameraB) => cameraB.passages - cameraA.passages)

		const timeline = Array.from({ length: 24 }, (_, hour) => ({
			label: getTimelineLabel(hour),
			passages: passagesByHour.get(hour) ?? 0,
		}))

		return {
			charts: {
				cameraRanking,
				timeline,
			},
		}
	}, [detections, cameras])
}
