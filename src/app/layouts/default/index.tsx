import { Outlet } from 'react-router-dom'
import { Header } from '@/components/header'

export function DefaultLayout() {
	return (
		<div className="flex min-h-screen flex-col antialiased">
			<Header />

			<div className="flex flex-1 flex-col p-6">
				<Outlet />
			</div>
		</div>
	)
}
