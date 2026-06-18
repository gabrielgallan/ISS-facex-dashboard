import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

export function NavMenu() {
	const { t } = useTranslation()

	return (
		<NavigationMenu>
			<NavigationMenuList className="flex gap-2">
				<NavigationMenuItem>
					<NavigationMenuTrigger>{t('navigation.dashboards')}</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="w-94">
							<ListItem
								href="/dashboards/demographic"
								title={t('navigation.demographic.title')}
							>
								{t('navigation.demographic.description')}
							</ListItem>
							<ListItem
								href="/dashboards/movement"
								title={t('navigation.movement.title')}
							>
								{t('navigation.movement.description')}
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<Link to="/detections">
							<span>{t('navigation.detections_history')}</span>
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}

function ListItem({
	title,
	children,
	href,
	...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<Link to={href}>
					<div className="flex flex-col gap-1 text-sm">
						<div className="leading-none font-medium">{title}</div>
						<div className="line-clamp-2 text-muted-foreground">{children}</div>
					</div>
				</Link>
			</NavigationMenuLink>
		</li>
	)
}
