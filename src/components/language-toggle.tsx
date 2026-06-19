import { Check, ChevronsUpDown, Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { SupportedLanguages } from '@/lib/i18n'
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

export function LanguageToggle() {
	const { i18n } = useTranslation()

	const currentLanguage = i18n.language as Language

	function handleChangeLanguage(language: Language) {
		i18n.changeLanguage(language)

		localStorage.setItem('language', language)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<Languages className="size-4" />
					<span>{languages[currentLanguage].label ?? 'Idioma'}</span>

					<ChevronsUpDown className="size-4 text-muted-foreground" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
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
