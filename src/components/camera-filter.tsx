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
	name: string
	value: string
}

interface CameraFilterProps {
	value?: string[]
	onValueChange?: (value: string[]) => void
}

const cameraOptions: CameraOption[] = [
	{ name: 'Câmera 1', value: '1' },
	{ name: 'Câmera 2', value: '2' },
	{ name: 'Câmera 3', value: '3' },
]

export function CameraFilter({ value, onValueChange }: CameraFilterProps) {
	const [internalValue, setInternalValue] = useState<string[]>([])

	const selectedValues = value ?? internalValue
	const selectedCameras = cameraOptions.filter((camera) => selectedValues.includes(camera.value))

	function handleCheckedChange(cameraValue: string, checked: boolean) {
		const nextValue = checked
			? [...new Set([...selectedValues, cameraValue])]
			: selectedValues.filter((value) => value !== cameraValue)

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

				{cameraOptions.map((camera) => (
					<DropdownMenuCheckboxItem
						key={camera.value}
						checked={selectedValues.includes(camera.value)}
						onCheckedChange={(checked) => handleCheckedChange(camera.value, checked)}
						onSelect={(event) => event.preventDefault()}
					>
						{camera.name}
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
