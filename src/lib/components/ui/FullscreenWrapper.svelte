<script lang="ts">
	let { children }: { children?: Snippet } = $props();

	import { onMount, onDestroy } from 'svelte';

	let container: HTMLDivElement;
	let isFullscreen = $state(false);
	let lastTap = 0;

	function toggleFullscreen() {
		if (typeof document === 'undefined') return;

		if (!document.fullscreenElement && container?.requestFullscreen) {
			container.requestFullscreen();
		} else if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	}

	function handleFullscreenChange() {
		if (typeof document === 'undefined') return;
		isFullscreen = !!document.fullscreenElement;
	}

	function handleDoubleTap() {
		if (typeof window === 'undefined') return;

		const now = Date.now();
		if (now - lastTap < 300) {
			toggleFullscreen();
		}
		lastTap = now;
	}

	onMount(() => {
		if (typeof document !== 'undefined') {
			document.addEventListener('fullscreenchange', handleFullscreenChange);
		}
	});

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
		}
	});
</script>

<div
	bind:this={container}
	class="relative w-full h-full overflow-hidden"
	ontouchend={handleDoubleTap}
>
	{@render children?.()}

	<!-- Botão fullscreen -->
	<div class="absolute top-2 right-2 group z-10">
		<button
			class="text-white bg-black/50 hover:bg-black/80 rounded-full w-10 h-10 flex items-center justify-center text-lg sm:text-xl"
			onclick={toggleFullscreen}
			title="Alternar modo tela cheia"
		>
			{isFullscreen ? '✕' : '⛶'}
		</button>

		<!-- Tooltip -->
		<div
			class="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs rounded bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap min-w-[100px] max-w-[180px] text-center"
		>
			{isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
		</div>
	</div>
</div>
