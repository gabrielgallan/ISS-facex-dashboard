import { Check, ChevronsUpDown, Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { SupportedLanguages } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'

const languages: Record<SupportedLanguages, { label: string }> = {
	'pt-BR': { label: 'Português BR' },
	'en-US': { label: 'English' },
} as const

type Language = keyof typeof languages

type LanguageToggleProps = {
	compact?: boolean
}

export function LanguageToggle({ compact = false }: LanguageToggleProps) {
	const { i18n } = useTranslation()

	const currentLanguage = i18n.language as Language

	function handleChangeLanguage(language: Language) {
		i18n.changeLanguage(language)

		localStorage.setItem('language', language)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size={compact ? 'icon' : 'default'}
					className={cn(!compact && 'flex justify-between')}
				>
					<div className="flex gap-2 items-center">
						<Languages className="size-4" />
						<span className={cn(compact && 'sr-only')}>
							{languages[currentLanguage].label ?? 'Idioma'}
						</span>
					</div>

					{!compact && <ChevronsUpDown className="size-4 text-muted-foreground" />}
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				{Object.entries(languages).map(([language, option]) => {
					const isSelected = currentLanguage === language

					return (
						<DropdownMenuItem
							key={language}
							onClick={() => handleChangeLanguage(language as Language)}
							className="justify-between"
						>
							<span>{option.label}</span>

							{isSelected && <Check className="size-4" />}
						</DropdownMenuItem>
					)
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
