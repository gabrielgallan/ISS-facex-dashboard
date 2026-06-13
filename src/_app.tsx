import { ThemeProvider } from './components/theme-provider'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

export function App() {
	return (
		<ThemeProvider>
			<RouterProvider router={router} />
		</ThemeProvider>
	)
}
