import { createBrowserRouter } from 'react-router-dom'
import { DefaultLayout } from './app/layouts/default'
import { NotFoundPage } from './app/pages/404'
import { DemographicDashboardPage } from './app/pages/dashboards/demographic'
import { MovementDashboardPage } from './app/pages/dashboards/movement'
import { DetectionsPage } from './app/pages/detections'
import { ErrorPage } from './app/pages/error'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <DefaultLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'dashboards',
				children: [
					{
						path: 'demographic',
						element: <DemographicDashboardPage />,
					},
					{
						path: 'movement',
						element: <MovementDashboardPage />,
					},
				],
			},
			{
				path: 'detections',
				element: <DetectionsPage />,
			},
		],
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
])
