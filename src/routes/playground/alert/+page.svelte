<script lang="ts">
	import Alert from '$lib/components/ui/Alert.svelte';
</script>

<svelte:head>
	<title>Alert Playground</title>
</svelte:head>

<main class="p-6 space-y-6">
	<h1 class="text-2xl font-semibold">Alert Variations</h1>

	<section>
		<h2 class="text-lg font-medium">Success</h2>
		<Alert variant="success">This is a success alert.</Alert>
	</section>

	<section>
		<h2 class="text-lg font-medium">Error</h2>
		<Alert variant="error">This is an error alert.</Alert>
	</section>

	<section>
		<h2 class="text-lg font-medium">Warning</h2>
		<Alert variant="warning">This is a warning alert.</Alert>
	</section>

	<section>
		<h2 class="text-lg font-medium">Info</h2>
		<Alert variant="info">This is an info alert.</Alert>
	</section>
</main>
