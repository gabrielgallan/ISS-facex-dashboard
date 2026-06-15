import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useSearchParams } from 'react-router-dom'
import { Pagination } from '@/components/pagination'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

const DetectionsTableRow = () => {
	return (
		<TableRow>
			<TableCell>
				<img
					src="https://github.com/gabrielgallan.png"
					className="size-12 rounded-md object-cover"
					alt="Face detectada"
				/>
			</TableCell>

			<TableCell>
				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-2">
						<span className="font-medium">Masculino</span>
						<span className="bg-muted border px-2 py-0.5 rounded-sm text-xs text-muted-foreground">
							20 anos
						</span>
					</div>

					<span className="text-xs text-muted-foreground">Etnia: WHITE</span>
				</div>
			</TableCell>

			<TableCell>
				<div className="flex flex-col gap-1">
					<span className="text-sm font-medium">Cabelo castanho</span>

					<div className="flex flex-wrap gap-1.5">
						<span className="rounded-sm bg-muted px-2 py-0.5 text-xs text-muted-foreground">
							Óculos: Não
						</span>

						<span className="rounded-sm bg-muted px-2 py-0.5 text-xs text-muted-foreground">
							Barba: Não
						</span>

						<span className="rounded-sm bg-muted px-2 py-0.5 text-xs text-muted-foreground">
							Chapéu: Não
						</span>
					</div>
				</div>
			</TableCell>

			<TableCell>
				<div className="flex flex-col gap-1">
					<span className="text-sm font-medium">Neutra</span>
					<span className="text-xs text-muted-foreground">Expressão predominante</span>
				</div>
			</TableCell>

			<TableCell>
				<span className="text-sm">Câmera 1</span>
			</TableCell>

			<TableCell>
				<span className="text-sm text-muted-foreground">
					{format(new Date(), "dd/MM/yyyy 'às' HH:mm:ss", { locale: ptBR })}
				</span>
			</TableCell>

			<TableCell className="text-right">
				<span className="font-medium font-mono">95%</span>
			</TableCell>
		</TableRow>
	)
}

export function DetectionsTable() {
	const [_searchParams, setSearchParams] = useSearchParams()

	// const _pageIndex = searchParams.get('page') ?? '1'

	function handlePaginate(page: number) {
		setSearchParams((url) => {
			url.set('page', page.toString())

			return url
		})
	}

	return (
		<>
			<div className="overflow-hidden rounded-sm border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-20">Face</TableHead>
							<TableHead>Perfil estimado</TableHead>
							<TableHead>Características faciais</TableHead>
							<TableHead>Emoção estimada</TableHead>
							<TableHead>Câmera</TableHead>
							<TableHead>Data/Horário</TableHead>
							<TableHead className="text-right">Confiança</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						<DetectionsTableRow />
						<DetectionsTableRow />
						<DetectionsTableRow />
					</TableBody>
				</Table>
			</div>

			<Pagination onPageChange={handlePaginate} page={1} limit={10} total={30} />
		</>
	)
}
