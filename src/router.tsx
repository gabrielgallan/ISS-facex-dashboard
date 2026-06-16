import { createBrowserRouter } from 'react-router-dom'
import { DefaultLayout } from './app/layouts/default'
import { DashboardPage } from './app/pages/dashboard'
import { DetectionsPage } from './app/pages/detections'
import { MovementDashboardPage } from './app/pages/movement-dashboard'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <DefaultLayout />,
		children: [
			{
				path: 'dashboard',
				element: <DashboardPage />,
			},
			{
				path: 'movement-dashboard',
				element: <MovementDashboardPage />,
			},
			{
				path: 'detections',
				element: <DetectionsPage />,
			},
		],
	},
])
