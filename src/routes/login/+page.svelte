<script lang="ts">
	import Container from '$lib/components/ui/Container.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
	import { enhance } from '$app/forms';
	import { fly } from 'svelte/transition';

	// Props da action
	let { form }: { form?: { errorMsg?: string; username?: string } } = $props();

	// Bind dos campos usando username em vez de email
	let username = $state(form?.username ?? '');
	let password = $state('');

	// Alerta derivado
	let errorMsg = $derived(form?.errorMsg ?? '');

	$effect(() => {
		if (errorMsg) {
			const timeout = setTimeout(() => (errorMsg = ''), 5000);
			return () => clearTimeout(timeout);
		}
	});
</script>

<Container size="sm" class="mt-12 mx-auto">
	<h1 class="text-2xl font-semibold mb-6">Entrar no VigiLar</h1>

	<form method="POST" use:enhance class="space-y-4">
		<!-- Username em vez de email -->
		<Input
			id="username"
			type="text"
			label="Usuário"
			placeholder="seu usuário"
			bind:value={username}
		/>

		<Input
			id="password"
			type="password"
			label="Senha"
			placeholder="••••••••"
			bind:value={password}
		/>

		<Button type="submit" variant="solid" color="primary" class="w-full">Entrar</Button>
	</form>

	{#if errorMsg}
		<div class="mt-4" transition:fly={{ y: 20 }}>
			<Alert variant="error">{errorMsg}</Alert>
		</div>
	{/if}
</Container>
