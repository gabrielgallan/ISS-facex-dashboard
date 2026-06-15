import { api } from './client'

interface FetchArchiveListParams {
	body: {
		feeds: string[]
		min_timestamp: string
		max_timestamp: string
	}
	params: {
		page: number
	}
}

interface FetchArchiveListResponse {
	data: { id: string }[]
}

export async function fetchArchiveList({ body, params }: FetchArchiveListParams) {
	const limit = 20
	const offset = (params.page - 1) * limit

	const response = await api.post<FetchArchiveListResponse>('/v1/archive', body, {
		params: {
			action: 'list',
			limit,
			offset,
		},
	})

	return response.data
}
