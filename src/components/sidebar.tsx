import {
	ChartArea,
	ChartPie,
	History,
	PanelLeft,
	PanelLeftClose,
	PanelLeftOpen,
	Radar,
} from 'lucide-react'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { LanguageToggle } from './language-toggle'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'

const SIDEBAR_COLLAPSED_STORAGE_KEY = 'sidebar-collapsed'

const navItems = [
	{ to: '/dashboards/demographic', icon: ChartPie, labelKey: 'navigation.demographic_dashboard' },
	{ to: '/dashboards/movement', icon: Radar, labelKey: 'navigation.movement_dashboard' },
	{ to: '/detections', icon: History, labelKey: 'navigation.detections_history' },
]

export function Sidebar() {
	const { t } = useTranslation()
	const [isCollapsed, setIsCollapsed] = React.useState(() => {
		if (typeof window === 'undefined') {
			return false
		}

		return localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY) === 'true'
	})

	function handleToggleSidebar() {
		setIsCollapsed((currentState) => {
			const nextState = !currentState
			localStorage.setItem(SIDEBAR_COLLAPSED_STORAGE_KEY, String(nextState))

			return nextState
		})
	}

	const _ToggleIcon = isCollapsed ? PanelLeftOpen : PanelLeftClose

	return (
		<aside
			className={cn(
				'flex min-h-screen shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground transition-[width] duration-300 ease-in-out',
				isCollapsed ? 'w-16' : 'w-64'
			)}
			data-collapsed={isCollapsed}
		>
			<div
				className={cn(
					'flex items-center border-b p-4',
					isCollapsed ? 'justify-center' : 'justify-between'
				)}
			>
				<ChartArea />

				<Button
					type="button"
					variant="ghost"
					size="icon"
					className={cn('size-8', isCollapsed && 'sr-only')}
					onClick={handleToggleSidebar}
					aria-label={isCollapsed ? 'Expandir sidebar' : 'Retrair sidebar'}
					aria-expanded={!isCollapsed}
				>
					<PanelLeft className="size-4" />
				</Button>
			</div>

			<div className={cn('flex h-full flex-col p-4', isCollapsed && 'items-center px-3')}>
				<nav className="space-y-1">
					{navItems.map(({ to, icon: Icon, labelKey }) => (
						<NavLink
							key={to}
							to={to}
							end
							className={({ isActive }) =>
								cn(
									'flex h-10 items-center rounded-md text-sm transition-colors',
									isActive
										? 'bg-sidebar-accent text-sidebar-accent-foreground'
										: 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
									isCollapsed ? 'w-10 justify-center' : 'w-56 gap-3 px-3'
								)
							}
							aria-label={t(labelKey)}
							title={isCollapsed ? t(labelKey) : undefined}
						>
							<Icon className="size-4" />
							<span className={cn('truncate', isCollapsed && 'sr-only')}>{t(labelKey)}</span>
						</NavLink>
					))}
				</nav>

				<div className={cn('mt-auto flex flex-col gap-1', isCollapsed ? 'items-center' : 'w-full')}>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className={cn('size-8', !isCollapsed && 'hidden')}
						onClick={handleToggleSidebar}
						aria-label="Expandir sidebar"
						aria-expanded={!isCollapsed}
					>
						<PanelLeft className="size-4" />
					</Button>
					<div className={cn(isCollapsed ? 'flex flex-col gap-2' : 'flex gap-1')}>
						<LanguageToggle compact={isCollapsed} />
						<ThemeToggle compact={isCollapsed} />
					</div>
				</div>
			</div>
		</aside>
	)
}
