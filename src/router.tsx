import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from './app'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
])
