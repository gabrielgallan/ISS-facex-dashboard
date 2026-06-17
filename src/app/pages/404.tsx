import { Link } from 'react-router-dom'

export function NotFoundPage() {
	return (
		<main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-10">
			<div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35" />
			<div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent" />

			<section className="relative flex w-full max-w-3xl flex-col items-center text-center">
				<h1 className="text-3xl font-extrabold leading-none text-foreground">
					Página não encontrada
				</h1>

				<p className="mt-5 text-base leading-7 text-muted-foreground">
					O endereço acessado não existe, foi movido ou expirou. Voltar para o{' '}
					<Link to="/dashboards/demographic">
						<span className="text-primary font-medium">Dashboard</span>
					</Link>
				</p>
			</section>
		</main>
	)
}
