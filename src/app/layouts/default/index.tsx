import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/sidebar'

export function DefaultLayout() {
	return (
		<div className="flex min-h-screen antialiased">
			<Sidebar />

			<main className="flex w-full">
				<Outlet />
			</main>
		</div>
	)
}
