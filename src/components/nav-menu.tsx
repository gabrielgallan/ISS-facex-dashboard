import { Link } from 'react-router-dom'
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
	return (
		<NavigationMenu>
			<NavigationMenuList className="flex gap-2">
				<NavigationMenuItem>
					<NavigationMenuTrigger>Dashboards</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="w-94">
							<ListItem href="/dashboard" title="Dashboard Demográfico">
								Visualize dados demográficos das detecções, como gênero, idade, horários de pico e
								volume de passagens.
							</ListItem>
							<ListItem href="/movement-dashboard" title="Dashboard de Movimentacao">
								Acompanhe fluxo por camera, areas de maior atividade e sinais operacionais de
								atencao.
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<Link to="/detections">
							<span>Histórico de Detecções</span>
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
