import { ThemeProvider } from './components/theme-provider'

import './index.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
import { queryClient } from './lib/react-query'
import { router } from './router'

export function App() {
	return (
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<Toaster />

				<RouterProvider router={router} />
			</QueryClientProvider>
		</ThemeProvider>
	)
}
