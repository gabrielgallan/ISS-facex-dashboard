import { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
	const { t } = useTranslation()
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

	const selectedCount = selectedCameras.length

	const buttonLabel =
		selectedCount > 0
			? t('filters.inputs.selected_cameras', { count: selectedCount })
			: t('filters.inputs.select_cameras')

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="max-w-72 justify-start">
					<span className="truncate">{buttonLabel}</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="start" className="w-56">
				<DropdownMenuLabel>{t('filters.labels.cameras')}</DropdownMenuLabel>

				<DropdownMenuSeparator />

				{isLoading && (
					<DropdownMenuCheckboxItem disabled checked={false}>
						{t('filters.inputs.loading_cameras')}
					</DropdownMenuCheckboxItem>
				)}

				{!isLoading && options.length === 0 && (
					<DropdownMenuCheckboxItem disabled checked={false}>
						{t('filters.inputs.no_cameras')}
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
