import { Activity, ChartPie, History } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import securosLogo from '../assets/securos.svg'

const navItems = [
	{ to: '/dashboards/demographic', icon: ChartPie },
	{ to: '/dashboards/movement', icon: Activity },
	{ to: '/detections', icon: History },
]

export function Sidebar() {
	return (
		<aside className="min-h-screen border-r flex flex-col">
			<div className="p-4 border-b">
				<img src={securosLogo} alt="" className="size-8" />
			</div>

			{/* Nav */}
			<nav className="flex-1 p-4 space-y-1">
				{navItems.map(({ to, icon: Icon }) => (
					<NavLink
						key={to}
						to={to}
						end
						className={({ isActive }) =>
							`flex px-3 py-3 rounded-md text-sm transition-colors ${
								isActive
									? 'text-foreground bg-muted/35'
									: 'text-muted-foreground hover:bg-muted hover:text-muted-foreground'
							}`
						}
					>
						<Icon className="size-4" />
					</NavLink>
				))}
			</nav>
		</aside>
	)
}
