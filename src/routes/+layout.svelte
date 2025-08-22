<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import GithubIcon from '@lucide/svelte/icons/github';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
	<nav class="mx-auto max-w-6xl px-8 h-14 flex items-center gap-4">
		<a href="/" class="text-sm font-semibold">OpenReport</a>
		<a href="/projects" class="text-sm text-muted-foreground hover:text-foreground">Projects</a>
		<div class="ml-auto"></div>
		<a 
			href="https://github.com/kettu-studio/openreport" 
			target="_blank" 
			rel="noopener noreferrer"
			class="text-muted-foreground hover:text-foreground transition-colors"
			title="Ver en GitHub"
		>
			<GithubIcon class="w-5 h-5" />
		</a>
	</nav>
</header>

{@render children?.()}
