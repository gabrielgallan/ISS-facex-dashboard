import type { ReactNode } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

interface CameraDetailsDialogProps {
	children: ReactNode
}

export function CameraDetailsDialog({ children }: CameraDetailsDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Camera position</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
