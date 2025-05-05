<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';

	const variants = ['solid', 'outline', 'ghost'] as const;
	const colors = ['primary', 'success', 'error', 'warning', 'info'] as const;
</script>

<svelte:head>
	<title>Button Playground</title>
</svelte:head>

<main class="p-6 space-y-6">
	<h1 class="text-2xl font-semibold">Button Variants</h1>

	{#each variants as variant (variant)}
		<section>
			<h2 class="text-xl capitalize mb-2">{variant}</h2>
			<div class="flex flex-wrap gap-4">
				{#each colors as color (color)}
					<Button {variant} {color}>
						{variant} · {color}
					</Button>
				{/each}
			</div>

			<h3 class="mt-4 font-medium">Disabled</h3>
			<div class="flex flex-wrap gap-4 mt-2">
				{#each colors as color (color)}
					<Button {variant} {color} disabled>
						{variant} · {color}
					</Button>
				{/each}
			</div>
		</section>
	{/each}
</main>
