import { format, getHours, isValid, parseISO } from 'date-fns'
import { useMemo } from 'react'
import type { DetectionDTO } from '@/api/facex/dto/list-detections-response.dto'
import type { GetCamerasResponseDTO } from '@/api/server/dto/get-cameras-response.dto'

interface MovementDashboardCards {
	cards: {
		movement: { amount: number }
		mostActiveCamera: { cameraName: string; passages: number }
		peakHour: { hour: string; passages: number }
		noMatchRate: { percent: number }
	}
}

function getEmptyCards(): MovementDashboardCards {
	return {
		cards: {
			movement: { amount: 0 },
			mostActiveCamera: { cameraName: 'Sem dados', passages: 0 },
			peakHour: { hour: 'Sem dados', passages: 0 },
			noMatchRate: { percent: 0 },
		},
	}
}

export function useMovementDashboardCards(
	detections?: DetectionDTO[],
	cameras?: GetCamerasResponseDTO
): MovementDashboardCards {
	return useMemo(() => {
		const list = detections ?? []
		const total = list.length

		if (total === 0) {
			return getEmptyCards()
		}

		const passagesByCamera = new Map<string, number>()
		const passagesByHour = new Map<number, number>()
		let noMatchAmount = 0

		for (const detection of list) {
			passagesByCamera.set(detection.feed, (passagesByCamera.get(detection.feed) ?? 0) + 1)

			if (detection.no_match) {
				noMatchAmount += 1
			}

			const timestamp = parseISO(detection.timestamp)

			if (isValid(timestamp)) {
				const hour = getHours(timestamp)

				passagesByHour.set(hour, (passagesByHour.get(hour) ?? 0) + 1)
			}
		}

		let mostActiveCameraId = ''
		let mostActiveCameraPassages = 0

		for (const [cameraId, passages] of passagesByCamera) {
			if (passages > mostActiveCameraPassages) {
				mostActiveCameraId = cameraId
				mostActiveCameraPassages = passages
			}
		}

		let peakHour = -1
		let peakHourPassages = 0

		for (const [hour, passages] of passagesByHour) {
			if (passages > peakHourPassages || (passages === peakHourPassages && hour < peakHour)) {
				peakHour = hour
				peakHourPassages = passages
			}
		}

		const cameraName =
			cameras?.find((camera) => camera.id === mostActiveCameraId)?.name ??
			(mostActiveCameraId ? `Câmera ${mostActiveCameraId}` : 'Sem dados')

		return {
			cards: {
				movement: { amount: total },
				mostActiveCamera: {
					cameraName,
					passages: mostActiveCameraPassages,
				},
				peakHour: {
					hour:
						peakHour >= 0
							? format(new Date(2000, 0, 1, peakHour), 'HH:00')
							: 'Sem dados',
					passages: peakHourPassages,
				},
				noMatchRate: { percent: noMatchAmount / total },
			},
		}
	}, [detections, cameras])
}
