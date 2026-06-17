import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Button } from './ui/button'

interface PaginationProps {
	page: number
	total: number
	limit: number
	onPageChange: (page: number) => Promise<void> | void
}

export function Pagination({ page, total, limit, onPageChange }: PaginationProps) {
	const pages = Math.ceil(total / limit) || 1

	return (
		<div className="flex items-center justify-between">
			<span className="text-sm text-muted-foreground">{total} total item(s)</span>

			<div className="flex items-center gap-4 lg:gap-8">
				<div className="flex text-sm font-medium">
					Página {page} de {pages}
				</div>
				<div className="flex items-center gap-2">
					<Button
						onClick={() => onPageChange(1)}
						variant="outline"
						className="h-4 w-4 p-4"
						disabled={page === 1}
					>
						<ChevronsLeft className="h-4 w-4" />
						<span className="sr-only">primeira página</span>
					</Button>
					<Button
						onClick={() => onPageChange(page - 1)}
						variant="outline"
						className="h-4 w-4 p-4"
						disabled={page === 1}
					>
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">página anterior</span>
					</Button>
					<Button
						onClick={() => onPageChange(page + 1)}
						variant="outline"
						className="h-4 w-4 p-4"
						disabled={pages <= page}
					>
						<ChevronRight className="h-4 w-4" />
						<span className="sr-only">próxima página</span>
					</Button>
					<Button
						onClick={() => onPageChange(pages)}
						variant="outline"
						className="h-4 w-4 p-4"
						disabled={pages === page}
					>
						<ChevronsRight className="h-4 w-4" />
						<span className="sr-only">última página</span>
					</Button>
				</div>
			</div>
		</div>
	)
}
