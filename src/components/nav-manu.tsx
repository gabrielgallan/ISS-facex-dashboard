import { Link } from 'react-router-dom'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

export function NavMenu() {
	return (
		<NavigationMenu>
			<NavigationMenuList className="flex gap-2">
				<NavigationMenuItem>
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<Link to="/dashboard">
							<span>Dashboard</span>
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<Link to="/detections">
							<span>Detecções</span>
						</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}
