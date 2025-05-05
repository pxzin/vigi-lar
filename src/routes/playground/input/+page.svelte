<script lang="ts">
	import Input from '$lib/components/ui/Input.svelte';
</script>

<svelte:head>
	<title>Input Playground</title>
</svelte:head>

<main class="p-6 space-y-6">
	<h1 class="text-2xl font-semibold">Input Variations</h1>

	<section>
		<h2 class="text-lg font-medium">Default</h2>
		<Input placeholder="Default input" />
	</section>

	<section>
		<h2 class="text-lg font-medium">With Label</h2>
		<Input label="Name" placeholder="Enter your name" />
	</section>

	<section>
		<h2 class="text-lg font-medium">With Error</h2>
		<Input label="Email" placeholder="Enter your email" error="Invalid email address" />
	</section>

	<section>
		<h2 class="text-lg font-medium">With Icon</h2>
		<Input label="Search" placeholder="Search...">🔍</Input>
	</section>
</main>
