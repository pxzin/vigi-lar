<script lang="ts">
	type Link = { name: string; path: string };
	const links: Link[] = [
		{ name: 'Button', path: '/playground/button' },
		{ name: 'Input', path: '/playground/input' },
		{ name: 'Alert', path: '/playground/alert' },
		{ name: 'Container', path: '/playground/container' }
	];
</script>

<svelte:head>
	<title>Playground Components</title>
</svelte:head>

<main class="p-6 space-y-4">
	<h1 class="text-3xl font-bold">Component Playground</h1>
	<ul class="list-disc list-inside space-y-1">
		{#each links as { name, path } (path)}
			<li>
				<a href={path} class="text-blue-600 hover:underline">{name}</a>
			</li>
		{/each}
	</ul>
</main>
