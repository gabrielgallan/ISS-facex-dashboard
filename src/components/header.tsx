import securosLogo from '../../public/securos.svg'
import { NavMenu } from './nav-manu'
import { ThemeToggle } from './theme-toggle'
import { Separator } from './ui/separator'

export function Header() {
	return (
		<div className="border-b">
			<div className="flex h-14 items-center gap-6 px-6">
				<div className="flex gap-4 items-center">
					<img src={securosLogo} alt="" className="size-8" />
					<span className="font-semibold">facex.dashboard</span>
				</div>

				<div>
					<Separator orientation="vertical" className="h-6" />
				</div>

				<NavMenu />

				<div className="ml-auto flex items-center gap-2">
					<ThemeToggle />
				</div>
			</div>
		</div>
	)
}
