<script lang="ts">
	import 'virtual:uno.css';

	import type { Snippet } from 'svelte';
	let { children }: { children?: Snippet } = $props();
</script>

<div>
	{@render children?.()}
</div>

<svelte:head>
	<meta charset="utf-8" />
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
	/>
	<meta name="format-detection" content="telephone=no" />
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
</svelte:head>
