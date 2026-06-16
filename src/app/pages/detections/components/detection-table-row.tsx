import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ScanFace } from 'lucide-react'
import { useState } from 'react'
import type { DetectionDTO } from '@/api/dto/list-detections-response.dto'
import { TableCell, TableRow } from '@/components/ui/table'
import { env } from '@/env'
import {
	ethnicityLabels,
	facialHairLabels,
	genderLabels,
	glassesLabels,
	hairColorLabels,
	hairTypeLabels,
	headwearLabels,
} from '../detection-labels'

interface DetectionsTableRowProps {
	detection: DetectionDTO
}

export function DetectionsTableRow({ detection }: DetectionsTableRowProps) {
	const [imageFailed, setImageFailed] = useState(false)

	const timestamp = parseISO(detection.timestamp)

	const imageUrl = new URL(detection._links.detection_image, env.VITE_FACEX_API_URL).toString()

	const age = Math.round(detection.demographics.age)

	const confidence = detection.confidence.toLocaleString('en-US', {
		style: 'percent',
		maximumFractionDigits: 1,
	})

	return (
		<TableRow>
			<TableCell>
				{imageFailed ? (
					<div className="flex size-12 items-center justify-center rounded-md border bg-muted text-muted-foreground">
						<ScanFace className="size-5" aria-hidden="true" />
						<span className="sr-only">Imagem da face indisponível</span>
					</div>
				) : (
					<img
						src={imageUrl}
						className="size-12 rounded-sm border bg-muted object-cover"
						alt={`Face da detecção ${detection.id}`}
						onError={() => setImageFailed(true)}
					/>
				)}
			</TableCell>

			<TableCell>
				<div className="flex flex-col gap-1.5">
					<div className="flex items-center gap-2">
						<span className="font-medium">{genderLabels[detection.demographics.gender]}</span>

						<span className="rounded-md border bg-muted px-2 py-0.5 text-xs text-muted-foreground">
							{age} anos
						</span>
					</div>

					<div className="w-fit text-xs">
						<span className="text-muted-foreground">Etnia estimada: </span>
						<span className="font-medium">{ethnicityLabels[detection.demographics.ethnicity]}</span>
					</div>
				</div>
			</TableCell>

			<TableCell>
				<div className="flex max-w-80 flex-wrap gap-1.5">
					<div className="rounded-md border bg-muted/40 px-2.5 py-1 text-xs">
						<span className="text-muted-foreground">Cabelo: </span>
						<span className="font-medium">{hairColorLabels[detection.attributes.hair_color]}</span>
					</div>

					<div className="rounded-md border bg-muted/40 px-2.5 py-1 text-xs">
						<span className="text-muted-foreground">Tipo: </span>
						<span className="font-medium">{hairTypeLabels[detection.attributes.hair_type]}</span>
					</div>

					<div className="rounded-md border bg-muted/40 px-2.5 py-1 text-xs">
						<span className="text-muted-foreground">Óculos: </span>
						<span className="font-medium">{glassesLabels[detection.attributes.glasses]}</span>
					</div>

					<div className="rounded-md border bg-muted/40 px-2.5 py-1 text-xs">
						<span className="text-muted-foreground">Facial: </span>
						<span className="font-medium">
							{facialHairLabels[detection.attributes.facial_hair]}
						</span>
					</div>

					<div className="rounded-md border bg-muted/40 px-2.5 py-1 text-xs">
						<span className="text-muted-foreground">Atributos na cabeça: </span>
						<span className="font-medium">{headwearLabels[detection.attributes.headwear]}</span>
					</div>
				</div>
			</TableCell>

			<TableCell>
				<div className="flex flex-col gap-1">
					<span className="text-sm font-medium">Não disponível</span>
					<span className="text-xs text-muted-foreground">Emoção ainda não mapeada</span>
				</div>
			</TableCell>

			<TableCell>
				<span className="text-sm">Câmera {detection.feed}</span>
			</TableCell>

			<TableCell className="text-right">
				<span className="text-xs text-muted-foreground">
					{format(timestamp, "dd/MM/yyyy 'às' HH:mm:ss", { locale: ptBR })}
				</span>
			</TableCell>

			<TableCell className="text-right pr-5">
				<span className="font-medium">{confidence}</span>
			</TableCell>
		</TableRow>
	)
}
