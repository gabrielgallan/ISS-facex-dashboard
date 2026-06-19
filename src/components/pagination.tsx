import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from './ui/button'

interface PaginationProps {
	page: number
	total: number
	limit: number
	onPageChange: (page: number) => Promise<void> | void
}

export function Pagination({ page, total, limit, onPageChange }: PaginationProps) {
	const { t } = useTranslation()
	const pages = Math.ceil(total / limit) || 1

	return (
		<div className="flex items-center justify-between">
			<span className="text-sm text-muted-foreground">{t('pagination.total_items', { count: total })}</span>

			<div className="flex items-center gap-4 lg:gap-8">
				<div className="flex text-sm font-medium">
					{t('pagination.page_of', { page, pages })}
				</div>
				<div className="flex items-center gap-2">
					<Button
						onClick={() => onPageChange(1)}
						variant="outline"
						className="h-4 w-4 p-4"
						disabled={page === 1}
					>
						<ChevronsLeft className="h-4 w-4" />
						<span className="sr-only">{t('pagination.first_page')}</span>
					</Button>
					<Button
						onClick={() => onPageChange(page - 1)}
						variant="outline"
						className="h-4 w-4 p-4"
						disabled={page === 1}
					>
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">{t('pagination.previous_page')}</span>
					</Button>
					<Button
						onClick={() => onPageChange(page + 1)}
						variant="outline"
						className="h-4 w-4 p-4"
						disabled={pages <= page}
					>
						<ChevronRight className="h-4 w-4" />
						<span className="sr-only">{t('pagination.next_page')}</span>
					</Button>
					<Button
						onClick={() => onPageChange(pages)}
						variant="outline"
						className="h-4 w-4 p-4"
						disabled={pages === page}
					>
						<ChevronsRight className="h-4 w-4" />
						<span className="sr-only">{t('pagination.last_page')}</span>
					</Button>
				</div>
			</div>
		</div>
	)
}
