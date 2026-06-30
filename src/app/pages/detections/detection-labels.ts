import type {
	DetectionEmotionDTO,
	EthnicityDTO,
	FacialHairDTO,
	GenderDTO,
	GlassesDTO,
	HairColorDTO,
	HairTypeDTO,
	HeadwearDTO,
} from '@/api/facex/dto/list-detections-response.dto'

export const genderLabels: Record<GenderDTO, string> = {
	MALE: 'detections.labels.gender.male',
	FEMALE: 'detections.labels.gender.female',
	UNKNOWN: 'detections.labels.gender.unknown',
}

export const ethnicityLabels: Record<EthnicityDTO, string> = {
	CAUCASIAN: 'detections.labels.ethnicity.caucasian',
	BLACK: 'detections.labels.ethnicity.black',
	EAST_INDIAN: 'detections.labels.ethnicity.east_indian',
	UNKNOWN: 'detections.labels.ethnicity.unknown',
}

export const facialHairLabels: Record<FacialHairDTO, string> = {
	BEARD: 'detections.labels.facial_hair.beard',
	MUSTACHE: 'detections.labels.facial_hair.mustache',
	GOATEE: 'detections.labels.facial_hair.goatee',
	GM: 'detections.labels.facial_hair.goatee_mustache',
	BRISTLE: 'detections.labels.facial_hair.bristle',
	UNKNOWN: 'detections.labels.facial_hair.unknown',
}

export const glassesLabels: Record<GlassesDTO, string> = {
	NONE: 'detections.labels.glasses.none',
	USUAL: 'detections.labels.glasses.usual',
	UNKNOWN: 'detections.labels.glasses.unknown',
}

export const hairColorLabels: Record<HairColorDTO, string> = {
	BLACK: 'detections.labels.hair_color.black',
	BROWN: 'detections.labels.hair_color.brown',
	BLOND: 'detections.labels.hair_color.blond',
	UNKNOWN: 'detections.labels.hair_color.unknown',
}

export const hairTypeLabels: Record<HairTypeDTO, string> = {
	NORMAL: 'detections.labels.hair_type.normal',
	HIGH_TEMPLE: 'detections.labels.hair_type.high_temple',
	UNKNOWN: 'detections.labels.hair_type.unknown',
}

export const headwearLabels: Record<HeadwearDTO, string> = {
	HOOD: 'detections.labels.headwear.hood',
	NO: 'detections.labels.headwear.no',
	UNKNOWN: 'detections.labels.headwear.unknown',
}

export const emotionLabels: Record<DetectionEmotionDTO, string> = {
	ANGER: 'detections.labels.emotion.anger',
	SADNESS: 'detections.labels.emotion.sadness',
	FEAR: 'detections.labels.emotion.fear',
	SURPRISE: 'detections.labels.emotion.surprise',
	NEUTRAL: 'detections.labels.emotion.neutral',
	HAPPINESS: 'detections.labels.emotion.happiness',
	UNKNOWN: 'detections.labels.emotion.unknown',
}
