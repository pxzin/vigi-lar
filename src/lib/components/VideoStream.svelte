<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	type Props = {
		channelId: number;
	};

	let { channelId = 1 }: Props = $props();
	let canvas: HTMLCanvasElement | null = $state(null);
	let loading = $state(true);
	let pipVideo: HTMLVideoElement | null = null;

	onMount(async () => {
		if (import.meta.env.SSR) return;

		try {
			const { default: jsmpeg } = await import('jsmpeg');
			const res = await fetch(`/api/start-stream?channel=${channelId}`);
			const { wsUrl } = await res.json();
			if (!wsUrl) throw new Error('WebSocket URL not found');

			const ws = new WebSocket(wsUrl);
			ws.binaryType = 'arraybuffer';

			new jsmpeg(ws, {
				canvas,
				autoplay: true
			});

			ws.addEventListener('open', () => {
				loading = false;
			});
		} catch (error) {
			console.error('Error starting stream:', error);
			loading = false;
		}
	});

	onDestroy(() => {
		if (import.meta.env.SSR) return;

		// Fecha PiP se ativo
		if (document.pictureInPictureElement === pipVideo) {
			document.exitPictureInPicture().catch(() => {});
		}
		pipVideo?.remove();
	});

	async function enterPiP() {
		if (import.meta.env.SSR || !canvas) return;
		const stream = (canvas as any).captureStream?.();
		if (!stream) {
			console.warn('⚠️ captureStream não suportado');
			return;
		}

		if (!pipVideo) {
			pipVideo = document.createElement('video');
			pipVideo.style.display = 'none';
			pipVideo.muted = true;
			document.body.appendChild(pipVideo);
		}

		pipVideo.srcObject = stream;
		await pipVideo.play();

		try {
			await pipVideo.requestPictureInPicture();
		} catch (err) {
			console.error('Erro ao entrar em PiP:', err);
		}
	}
</script>

<div class="relative w-full h-full">
	<canvas bind:this={canvas} class="w-full h-full bg-black" />

	{#if loading}
		<div
			class="absolute inset-0 flex items-center justify-center bg-black text-white text-sm opacity-75"
		>
			Conectando ao canal {channelId}...
		</div>
	{/if}

	<!-- Botão PiP -->
	<button
		onclick={enterPiP}
		class="absolute bottom-2 right-2 z-10 text-white bg-black/60 hover:bg-black/80 w-9 h-9 rounded-full flex items-center justify-center"
		title="Picture-in-Picture"
		aria-label="Picture-in-Picture"
	>
		<!-- Ícone SVG de PiP -->
		<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
			<path
				d="M19 7H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h5v2H5c-2.21 0-4-1.79-4-4V9c0-2.21 
				1.79-4 4-4h14c2.21 0 4 1.79 4 4v2h-2V9c0-1.1-.9-2-2-2z"
			/>
			<path d="M21 13h-8v6h8v-6z" />
		</svg>
	</button>
</div>
