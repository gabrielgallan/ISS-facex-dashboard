interface DetectionAttributesDTO {
	facial_hair: FacialHairDTO
	glasses: GlassesDTO
	hair_color: HairColorDTO
	hair_type: HairTypeDTO
	headwear: HeadwearDTO
}

interface DetectionDemographicsDTO {
	age: number
	ethnicity: EthnicityDTO
	gender: GenderDTO
}

export type GenderDTO = 'MALE' | 'FEMALE' | 'UNKNOWN'

export type EthnicityDTO = 'CAUCASIAN' | 'BLACK' | 'EAST_INDIAN' | 'UNKNOWN'

export type FacialHairDTO = 'BEARD' | 'MUSTACHE' | 'SHAVED' | 'GM' | 'NONE' | 'UNKNOWN'

export type GlassesDTO = 'NONE' | 'USUAL'

export type HairColorDTO =
	| 'BLACK'
	| 'BROWN'
	| 'BLOND'
	| 'GRAY'
	| 'RED'
	| 'WHITE'
	| 'BALD'
	| 'UNKNOWN'

export type HairTypeDTO = 'NORMAL' | 'HIGH_TEMPLE' | 'BALD' | 'UNKNOWN'

export type HeadwearDTO = 'HOOD' | 'NO'

export type DetectionEmotionDTO =
	| 'ANGER'
	| 'SADNESS'
	| 'FEAR'
	| 'SURPRISE'
	| 'NEUTRAL'
	| 'HAPPINESS'
	| 'UNKNOWN'

export type DetectionLivenessDTO = number

export type DetectionMaskDTO = 'NO_MASK' | unknown

export interface PaginationDTO {
	next_link: string | null
	prev_link: string | null
	total_records: number
}

export interface DetectionDTO {
	_links: {
		_self: string
		detection_image: string
	}
	attributes: DetectionAttributesDTO
	bounding_box: {
		h: number
		w: number
		x: number
		y: number
	}
	confidence: number
	demographics: DetectionDemographicsDTO
	emotion: DetectionEmotionDTO | null
	feed: string
	id: number
	is_mask_dressed_correctly: boolean | null
	is_mask_dressed_correctly_confidence: number | null
	liveness: DetectionLivenessDTO | null
	mask: DetectionMaskDTO | null
	no_match: boolean
	pitch: number
	timestamp: string
	track_finish_timestamp: string
	track_start_timestamp: string
	yaw: number
}

export interface ListDetectionsResponseDTO {
	_pagination: PaginationDTO
	detections: DetectionDTO[]
}
