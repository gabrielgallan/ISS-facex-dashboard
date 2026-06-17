import axios from 'axios'
import { env } from '@/env'

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export const api = axios.create({
	baseURL: env.VITE_FACEX_API_URL,
})

api.interceptors.request.use(async (config) => {
	await sleep(200)

	return config
})
