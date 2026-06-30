import { Moon, Sun } from 'lucide-react'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

type ThemeToggleProps = {
	compact?: boolean
}

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
	const { t } = useTranslation()

	const [theme, setThemeState] = React.useState<'theme-light' | 'dark' | 'system'>('theme-light')

	React.useEffect(() => {
		const isDarkMode = document.documentElement.classList.contains('dark')
		setThemeState(isDarkMode ? 'dark' : 'theme-light')
	}, [])

	React.useEffect(() => {
		const isDark =
			theme === 'dark' ||
			(theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
		document.documentElement.classList[isDark ? 'add' : 'remove']('dark')
	}, [theme])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size={compact ? 'icon' : 'default'}
					className={cn(!compact && 'justify-start')}
				>
					<span className="relative flex size-4 items-center justify-center">
						<Sun className="absolute size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
						<Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
					</span>
					{/* {!compact && <span>{currentThemeLabel}</span>} */}
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={() => setThemeState('theme-light')}>
					{t('theme.light')}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setThemeState('dark')}>{t('theme.dark')}</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setThemeState('system')}>
					{t('theme.system')}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
