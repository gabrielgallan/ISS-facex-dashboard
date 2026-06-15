import type {
	EthnicityDTO,
	FacialHairDTO,
	GenderDTO,
	GlassesDTO,
	HairColorDTO,
	HairTypeDTO,
	HeadwearDTO,
} from '@/api/dto/list-detections-response.dto'

export const genderLabels: Record<GenderDTO, string> = {
	MALE: 'Masculino',
	FEMALE: 'Feminino',
	UNKNOWN: 'Não identificado',
}

export const ethnicityLabels: Record<EthnicityDTO, string> = {
	CAUCASIAN: 'Caucasiana',
	BLACK: 'Negra',
	ASIAN: 'Asiática',
	INDIAN: 'Indiana',
	HISPANIC: 'Hispânica',
	UNKNOWN: 'Não identificada',
}

export const facialHairLabels: Record<FacialHairDTO, string> = {
	BEARD: 'Barba',
	MUSTACHE: 'Bigode',
	SHAVED: 'Barbeado',
	GM: 'Cavanhaque/bigode',
	NONE: 'Nenhum',
	UNKNOWN: 'Não identificado',
}

export const glassesLabels: Record<GlassesDTO, string> = {
	NONE: 'Sem óculos',
	EYEGLASSES: 'Óculos de grau',
	SUNGLASSES: 'Óculos escuros',
	UNKNOWN: 'Não identificado',
}

export const hairColorLabels: Record<HairColorDTO, string> = {
	BLACK: 'Preto',
	BROWN: 'Castanho',
	BLOND: 'Loiro',
	GRAY: 'Grisalho',
	RED: 'Ruivo',
	WHITE: 'Branco',
	BALD: 'Careca',
	UNKNOWN: 'Não identificado',
}

export const hairTypeLabels: Record<HairTypeDTO, string> = {
	NORMAL: 'Normal',
	HIGH_TEMPLE: 'Entradas pronunciadas',
	BALD: 'Careca',
	UNKNOWN: 'Não identificado',
}

export const headwearLabels: Record<HeadwearDTO, string> = {
	YES: 'Sim',
	NO: 'Não',
	UNKNOWN: 'Não identificado',
}
