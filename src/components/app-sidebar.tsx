import { ChartArea, ChartPie, History, Radar } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'
import { LanguageToggle } from '@/components/language-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarTrigger,
	useSidebar,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

const navItems = [
	{ to: '/dashboards/demographic', icon: ChartPie, labelKey: 'navigation.demographic_dashboard' },
	{ to: '/dashboards/movement', icon: Radar, labelKey: 'navigation.movement_dashboard' },
	{ to: '/detections', icon: History, labelKey: 'navigation.detections_history' },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { t } = useTranslation()
	const location = useLocation()
	const { state, isMobile } = useSidebar()
	const isCollapsed = state === 'collapsed' && !isMobile

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader className="border-b">
				<div className="group/logo-trigger relative flex h-8 items-center gap-2">
					<div
						className={cn(
							'flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg',
							'bg-sidebar-primary text-sidebar-primary-foreground',
							'transition-opacity duration-200',
							'group-data-[collapsible=icon]:group-hover/logo-trigger:opacity-0',
							'group-data-[collapsible=icon]:group-focus-within/logo-trigger:opacity-0'
						)}
					>
						<ChartArea className="size-4" />
					</div>

					<span className="truncate text-sm font-semibold group-data-[collapsible=icon]:hidden">
						FaceX Dashboard
					</span>

					<SidebarTrigger
						className={cn(
							'ml-auto',
							'group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:inset-0',
							'group-data-[collapsible=icon]:m-auto group-data-[collapsible=icon]:size-8',
							'group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:transition-opacity group-data-[collapsible=icon]:duration-200',
							'group-data-[collapsible=icon]:group-hover/logo-trigger:opacity-100',
							'group-data-[collapsible=icon]:group-focus-within/logo-trigger:opacity-100'
						)}
					/>
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu className="flex gap-1">
							{navItems.map(({ to, icon: Icon, labelKey }) => (
								<SidebarMenuItem key={to}>
									<SidebarMenuButton
										asChild
										isActive={location.pathname === to}
										tooltip={t(labelKey)}
									>
										<NavLink to={to} end className="h-10 pl-3">
											<Icon />
											<span>{t(labelKey)}</span>
										</NavLink>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem className="flex gap-1 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center">
						<LanguageToggle compact={isCollapsed} />
						<ThemeToggle compact={isCollapsed} />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	)
}
