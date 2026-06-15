import { Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ChartSkeletonProps {
	className: string
}

export function ChartSkeleton({ className }: ChartSkeletonProps) {
	return (
		<Card className={cn(className)}>
			<CardContent className="h-full flex items-center justify-center">
				<Loader2 className="text-muted-foreground animate-spin" />
			</CardContent>
		</Card>
	)
}
