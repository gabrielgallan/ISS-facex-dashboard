import { api } from './client'
import type { ListDetectionsResponseDTO } from './dto/list-detections-response.dto'

interface ListDetectionsParams {
	body: {
		feeds: string[]
		min_timestamp: string
		max_timestamp: string
	}
	params?: {
		limit: number
		offset: number
	}
}

export async function listDetections({
	body,
	params = { limit: 20, offset: 0 },
}: ListDetectionsParams) {
	const response = await api.post<ListDetectionsResponseDTO>('/v1/archive', body, {
		params: {
			action: 'list',
			limit: params.limit,
			offset: params.offset,
		},
	})

	return response.data
}
