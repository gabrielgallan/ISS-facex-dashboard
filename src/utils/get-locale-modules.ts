import {
	type Locale as DateFnsLocale,
	enUS as dateFnsEnUS,
	ptBR as dateFnsPtBR,
} from 'date-fns/locale'

import {
	type Locale as DayPickerLocale,
	enUS as dayPickerEnUS,
	ptBR as dayPickerPtBR,
} from 'react-day-picker/locale'

import type { SupportedLanguages } from '@/lib/i18n'

interface LocaleModules {
	dateFns: DateFnsLocale
	dayPicker: DayPickerLocale
}

const localeModulesMap: Record<SupportedLanguages, LocaleModules> = {
	'en-US': {
		dateFns: dateFnsEnUS,
		dayPicker: dayPickerEnUS,
	},
	'pt-BR': {
		dateFns: dateFnsPtBR,
		dayPicker: dayPickerPtBR,
	},
}

export function getLocaleModules(language: string): LocaleModules {
	return localeModulesMap[language as SupportedLanguages] ?? localeModulesMap['en-US']
}
