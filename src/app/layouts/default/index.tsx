import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

const SIDEBAR_COLLAPSED_STORAGE_KEY = 'sidebar-collapsed'

export function DefaultLayout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
		if (typeof window === 'undefined') {
			return true
		}

		return localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY) !== 'true'
	})

	function handleSidebarOpenChange(open: boolean) {
		setIsSidebarOpen(open)

		localStorage.setItem(SIDEBAR_COLLAPSED_STORAGE_KEY, String(!open))
	}

	return (
		<SidebarProvider open={isSidebarOpen} onOpenChange={handleSidebarOpenChange}>
			<div className="flex w-full min-h-screen antialiased">
				<AppSidebar />

				<SidebarInset>
					<main>
						<Outlet />
					</main>
				</SidebarInset>
			</div>
		</SidebarProvider>
	)
}
