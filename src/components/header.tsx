import securosLogo from '../assets/securos.svg'
import { NavMenu } from './nav-menu'
import { ThemeToggle } from './theme-toggle'
import { Separator } from './ui/separator'

export function Header() {
	return (
		<div className="border-b">
			<div className="flex h-14 items-center gap-4 px-6">
				<div className="flex gap-4 items-center">
					<img src={securosLogo} alt="" className="size-6" />
				</div>

				<div>
					<Separator orientation="vertical" className="h-6 rotate-24" />
				</div>

				<NavMenu />

				<div className="ml-auto flex items-center gap-2">
					<ThemeToggle />
				</div>
			</div>
		</div>
	)
}
