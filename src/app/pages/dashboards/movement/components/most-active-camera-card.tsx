import { Video } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MostActiveCameraCardProps {
	cameraName: string
	passages: number
}

export function MostActiveCameraCard({
	cameraName = 'Camera 1',
	passages = 742,
}: MostActiveCameraCardProps) {
	return (
		<Card className="gap-4">
			<CardHeader className="flex flex-row items-start justify-between space-y-0">
				<div className="space-y-1">
					<CardTitle className="text-base font-semibold">Câmera de pico</CardTitle>
					{/* <p className="text-xs text-muted-foreground"></p> */}
				</div>

				<div className="rounded-xl p-2.5 bg-muted">
					<Video className="size-5" />
				</div>
			</CardHeader>

			<CardContent className="flex flex-col gap-3">
				<div className="flex items-end gap-2">
					<span className="text-3xl font-bold tracking-tight">{cameraName}</span>
				</div>

				<div className="flex items-center justify-between text-xs">
					<span className="text-muted-foreground">{passages} passagens</span>
				</div>
			</CardContent>
		</Card>
	)
}
