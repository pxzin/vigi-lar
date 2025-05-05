<script lang="ts">
	import Container from '$lib/components/ui/Container.svelte';
	type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
	const sizes: ContainerSize[] = ['sm', 'md', 'lg', 'xl', 'full'];
</script>

<svelte:head>
	<title>Container Playground</title>
</svelte:head>

<main class="p-6 space-y-8 bg-gray-50">
	{#each sizes as size (size)}
		<section class="space-y-2">
			<h2 class="text-lg font-medium">{size}</h2>
			<!-- Wrapper to visualize parent width -->
			<div class="bg-gray-200 p-4">
				<Container {size} class="bg-white border">
					This is a <span class="font-medium">{size}</span> container.
				</Container>
			</div>
		</section>
	{/each}
</main>
