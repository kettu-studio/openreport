<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import logo from '$lib/assets/openreport.svg';
	import GithubIcon from '@lucide/svelte/icons/github';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={logo} />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<header class="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
		<nav class="mx-auto max-w-6xl px-8 h-14 flex items-center gap-4">
			<a href="/" class="flex items-center gap-2 text-lg font-semibold">
				<img src={logo} alt="OpenReport Logo" class="w-10 h-10" />
				<span>
					<span class="text-[#86C379]">Open</span>Report
				</span>
			</a>
			<a href="/projects" class="text-sm text-muted-foreground hover:text-foreground">Projects</a>
			<div class="ml-auto"></div>
		
		</nav>
	</header>

	<main class="flex-1">
		{@render children?.()}
	</main>

	<footer class="border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
	<div class="mx-auto max-w-6xl px-8 py-8">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<!-- Logo y descripción -->
			<div class="space-y-4">
				<div class="flex items-center gap-2">
					<img src={logo} alt="OpenReport Logo" class="w-8 h-8" />
					<span class="text-lg font-semibold">
						<span class="text-[#86C379]">Open</span>Report
					</span>
				</div>
				<p class="text-sm text-muted-foreground max-w-xs">
					Plataforma open source para análisis de seguridad y dependencias de proyectos de software.
				</p>
			</div>

			<!-- Enlaces útiles -->
			<div class="space-y-4">
				<h3 class="font-semibold text-sm">Enlaces</h3>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li><a href="/projects" class="hover:text-foreground transition-colors">Proyectos</a></li>
					<li><a href="https://github.com/kettu-studio/openreport" target="_blank" rel="noopener noreferrer" class="hover:text-foreground transition-colors">GitHub</a></li>
					<li><a href="/docs" class="hover:text-foreground transition-colors">Documentación</a></li>
				</ul>
			</div>

			<!-- Información del proyecto -->
			<div class="space-y-4">
				<h3 class="font-semibold text-sm">Proyecto</h3>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li>Open Source</li>
					<li>MIT License</li>
					<li>Contribuciones bienvenidas</li>
				</ul>
			</div>
		</div>

		<!-- Línea separadora y copyright -->
		<div class="border-t mt-8 pt-6">
			<div class="flex flex-col md:flex-row items-center justify-between gap-4">
				<div class="flex items-center gap-4 text-sm text-muted-foreground">
					<span>© 2025 OpenReport</span>
					<span>•</span>
					<span>Desarrollado por <a href="https://github.com/foxkdev" target="_blank" class="font-bold hover:underline">@Foxkdev</a></span>
				</div>
				<div class="flex items-center gap-4">
					<a 
						href="https://github.com/kettu-studio/openreport" 
						target="_blank" 
						rel="noopener noreferrer"
						class="text-muted-foreground hover:text-foreground transition-colors"
						title="Ver en GitHub"
					>
						<GithubIcon class="w-4 h-4" />
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>
</div>
