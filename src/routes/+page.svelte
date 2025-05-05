<script lang="ts">
	import Container from '$lib/components/ui/Container.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import Player from '$lib/components/ui/Player.svelte';
	import VideoStream from '$lib/components/VideoStream.svelte';
	import type { PageProps } from './$types';

	// pega o user do load, mas não descartamos nosso grid
	let { data }: PageProps = $props();
	let user = data.user;

	type Channel = { id: number; name: string };
	const channels: Channel[] = Array(4)
		.fill(0)
		.map((_, i) => ({ id: i + 1, name: `Canal ${i + 1}` }));

	let visibleCount = $state(Math.min(channels.length, 4));

	let pageIndex = $state(0);
	let pagedChannels = $derived.by(() => channels.slice(pageIndex, pageIndex + visibleCount));
	function prevPage() {
		pageIndex = Math.max(0, pageIndex - visibleCount);
	}
	function nextPage() {
		pageIndex = Math.min(channels.length - visibleCount, pageIndex + visibleCount);
	}
</script>

<Container size="full" class="min-h-screen flex flex-col bg-gray-50">
	<!-- Header: agora mostra o usuário -->
	<Header userName={user.id} class="border-b" />

	<!-- Toolbar -->
	<div
		class="
	flex flex-col sm:flex-row sm:items-center justify-between
	p-6 bg-white border-b gap-4
"
	>
		<!-- Stepper de quantidade (fica full width no mobile, auto em sm+) -->
		<div class="flex items-center gap-4 w-full sm:w-auto">
			<span class="text-sm">Câmeras por página:</span>
			<div class="flex items-center border rounded overflow-hidden">
				<!-- botões “–” e “+” como antes -->
				<button
					onclick={() => {
						visibleCount = Math.max(1, visibleCount - 1);
						pageIndex = 0;
					}}
					disabled={visibleCount <= 1}
					aria-label="Diminuir câmeras"
					class={[
						'inline-flex items-center justify-center px-3 py-1',
						visibleCount > 1
							? 'text-primary border-primary hover:bg-primary-light'
							: 'text-gray-300 border-gray-200',
						'disabled:opacity-50'
					].join(' ')}
				>
					<span class="i-mdi:minus text-lg leading-none"></span>
				</button>
				<div class="px-4 py-1 text-center min-w-[2rem]">
					{visibleCount}
				</div>
				<button
					onclick={() => {
						visibleCount = Math.min(channels.length, visibleCount + 1);
						pageIndex = 0;
					}}
					disabled={visibleCount >= channels.length}
					aria-label="Aumentar câmeras"
					class={[
						'inline-flex items-center justify-center px-3 py-1',
						visibleCount < channels.length
							? 'text-primary border-primary hover:bg-primary-light'
							: 'text-gray-300 border-gray-200',
						'disabled:opacity-50'
					].join(' ')}
				>
					<span class="i-mdi:plus text-lg leading-none"></span>
				</button>
			</div>
		</div>

		<!-- Navegação de páginas (também full width no mobile e right-aligned em sm+) -->
		<div class="flex items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
			<button
				onclick={prevPage}
				disabled={pageIndex === 0}
				aria-label="Página anterior"
				class={[
					'inline-flex items-center justify-center px-3 py-1 rounded',
					pageIndex > 0
						? 'bg-primary text-white hover:bg-primary-dark'
						: 'bg-gray-200 text-gray-400',
					'disabled:opacity-50'
				].join(' ')}
			>
				<span class="i-mdi:chevron-left text-lg leading-none"></span>
			</button>

			<button
				onclick={nextPage}
				disabled={pageIndex + visibleCount >= channels.length}
				aria-label="Próxima página"
				class={[
					'inline-flex items-center justify-center px-3 py-1 rounded',
					pageIndex + visibleCount < channels.length
						? 'bg-primary text-white hover:bg-primary-dark'
						: 'bg-gray-200 text-gray-400',
					'disabled:opacity-50'
				].join(' ')}
			>
				<span class="i-mdi:chevron-right text-lg leading-none"></span>
			</button>
		</div>
	</div>

	<!-- Players Grid (sem alterações) -->
	<main class="flex-1 p-6">
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{#each pagedChannels as channel (channel.id)}
				<Player channelId={channel.id} channelName={channel.name} class="rounded-lg shadow-lg" />
			{/each}
		</div>
	</main>
</Container>
