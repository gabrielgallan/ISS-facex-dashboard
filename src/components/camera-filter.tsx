import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface CameraOption {
	id: string
	name: string
}

interface CameraFilterProps {
	options: CameraOption[]
	value?: string[]
	onValueChange?: (value: string[]) => void
	isLoading?: boolean
}

export function CameraFilter({ options, value, onValueChange, isLoading }: CameraFilterProps) {
	const [internalValue, setInternalValue] = useState<string[]>([])

	const selectedValues = value ?? internalValue
	const selectedCameras = options.filter((camera) => selectedValues.includes(camera.id))

	function handleCheckedChange(cameraId: string, checked: boolean) {
		const nextValue = checked
			? [...new Set([...selectedValues, cameraId])]
			: selectedValues.filter((value) => value !== cameraId)

		setInternalValue(nextValue)
		onValueChange?.(nextValue)
	}

	const buttonLabel =
		selectedCameras.length > 0
			? `${selectedCameras.length} ${selectedCameras.length === 1 ? 'selecionada' : 'selecionadas'}`
			: 'Selecionar câmeras'

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="max-w-72 justify-start">
					<span className="truncate">{buttonLabel}</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="start" className="w-56">
				<DropdownMenuLabel>Câmeras</DropdownMenuLabel>

				<DropdownMenuSeparator />

				{isLoading && (
					<DropdownMenuCheckboxItem disabled checked={false}>
						Carregando câmeras...
					</DropdownMenuCheckboxItem>
				)}

				{!isLoading && options.length === 0 && (
					<DropdownMenuCheckboxItem disabled checked={false}>
						Nenhuma câmera disponível
					</DropdownMenuCheckboxItem>
				)}

				{!isLoading &&
					options.map((camera) => (
						<DropdownMenuCheckboxItem
							key={camera.id}
							checked={selectedValues.includes(camera.id)}
							onCheckedChange={(checked) => handleCheckedChange(camera.id, checked)}
							onSelect={(event) => event.preventDefault()}
						>
							{camera.name}
						</DropdownMenuCheckboxItem>
					))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
