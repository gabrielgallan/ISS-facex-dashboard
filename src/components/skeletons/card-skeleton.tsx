import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CardSkeleton() {
	return (
		<Card>
			<CardHeader>
				<Skeleton className="h-8 w-full" />
			</CardHeader>
			<CardContent className="flex flex-col gap-2 mt-2">
				<Skeleton className="h-10 w-20" />
				<Skeleton className="h-4 w-40" />
			</CardContent>
		</Card>
	)
}
