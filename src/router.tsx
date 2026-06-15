import { createBrowserRouter } from 'react-router-dom'
import { DefaultLayout } from './app/layouts/default'
import { DashbaordPage } from './app/pages/dashboard'
import { DetectionsPage } from './app/pages/detections'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <DefaultLayout />,
		children: [
			{
				path: 'dashboard',
				element: <DashbaordPage />,
			},
			{
				path: 'detections',
				element: <DetectionsPage />,
			},
		],
	},
])
