import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enUS from './locales/en-US.json'
import ptBR from './locales/pt-BR.json'

type SupportedLanguages = 'pt-BR' | 'en-US'

const savedLanguage = localStorage.getItem('language') ?? 'en-US'

i18n.use(initReactI18next).init({
	resources: {
		'pt-BR': {
			translation: ptBR,
		},
		'en-US': {
			translation: enUS,
		},
	},
	lng: savedLanguage,
	fallbackLng: 'en-US',
	interpolation: {
		escapeValue: false,
	},
})

export { i18n, type SupportedLanguages }
