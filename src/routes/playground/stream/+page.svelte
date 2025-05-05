<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement | null = null;

	onMount(async () => {
		const { default: jsmpeg } = await import('jsmpeg');

		const ws = new WebSocket('ws://localhost:10001/');
		ws.binaryType = 'arraybuffer';

		new jsmpeg(ws, {
			canvas,
			autoplay: true,
			audio: false,
			socketBufferSize: 1024 * 1024
		});
	});
</script>

<h1 class="text-white mb-4 text-center">🛠 Debug Stream - Porta 10001</h1>

<canvas bind:this={canvas} class="w-full h-[60vh] bg-black"></canvas>
