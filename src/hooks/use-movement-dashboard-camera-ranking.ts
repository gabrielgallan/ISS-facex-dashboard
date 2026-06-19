import { useMemo } from 'react'
import type { DetectionDTO } from '@/api/facex/dto/list-detections-response.dto'
import type { GetCamerasResponseDTO } from '@/api/server/dto/get-cameras-response.dto'

export interface CameraRank {
	rank: number
	id: string
	name: string
	passages: number
	percentOfTotal: number
}

interface MovementDashboardCameraRanking {
	cameraRanking: CameraRank[]
}

export function useMovementDashboardCameraRanking(
	detections?: DetectionDTO[],
	cameras?: GetCamerasResponseDTO
): MovementDashboardCameraRanking {
	return useMemo(() => {
		if (!detections || !cameras) return { cameraRanking: [] }

		const passagesByCamera = new Map<string, number>()

		for (const detection of detections) {
			passagesByCamera.set(detection.feed, (passagesByCamera.get(detection.feed) ?? 0) + 1)
		}

		const total = detections.length
		const cameraRanking = cameras
			.map((camera, originalIndex) => {
				const passages = passagesByCamera.get(camera.id) ?? 0

				return {
					originalIndex,
					id: camera.id,
					name: camera.name,
					passages,
					percentOfTotal: total > 0 ? passages / total : 0,
				}
			})
			.sort(
				(cameraA, cameraB) =>
					cameraB.passages - cameraA.passages || cameraA.originalIndex - cameraB.originalIndex
			)
			.map(({ originalIndex: _originalIndex, ...camera }, index) => ({
				...camera,
				rank: index + 1,
			}))

		return { cameraRanking }
	}, [detections, cameras])
}
