<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	type Props = {
		userName: string;
		class?: string;
	};

	let { userName, class: externalClass = '' }: Props = $props();

	let streamsByChannel = $state<{ channel: number; clients: number }[]>([]);
	let interval: ReturnType<typeof setInterval>;

	async function fetchStatus() {
		try {
			const res = await fetch('/api/streams/status');
			const data = await res.json();
			streamsByChannel = data.channels;
		} catch (e) {
			console.warn('❌ Falha ao buscar status do servidor');
			streamsByChannel = [];
		}
	}

	onMount(() => {
		fetchStatus();
		interval = setInterval(fetchStatus, 10_000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<header class={['flex items-center justify-between py-4 px-6 bg-white shadow', externalClass]}>
	<div class="text-2xl font-bold">Logo</div>

	<div class="flex items-center gap-6 text-sm text-gray-700">
		<div class="text-gray-600 flex gap-2 items-center">
			📡
			{#each streamsByChannel as { channel, clients } (channel)}
				<span class="px-2 py-1 bg-gray-100 rounded text-xs">
					Ch {channel}: <strong>{clients}</strong>
				</span>
			{/each}
		</div>

		<div>
			Bem-vindo, <span class="font-medium">{userName}</span>
		</div>
	</div>
</header>
