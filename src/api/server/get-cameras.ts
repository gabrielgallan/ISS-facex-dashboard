import { api } from './client'
import type { GetCamerasResponseDTO } from './dto/get-cameras-response.dto'

export async function getCameras(): Promise<GetCamerasResponseDTO> {
    const response = await api.get<GetCamerasResponseDTO>('/api/v2/cameras')

    return response.data
}
