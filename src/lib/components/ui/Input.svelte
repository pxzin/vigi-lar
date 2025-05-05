<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Props for the Input component
	 * - id: HTML id attribute
	 * - name: HTML name attribute (defaults to id)
	 * - type: input type
	 * - placeholder: placeholder text
	 * - label: optional label text
	 * - error: optional error message
	 * - class: additional classes
	 * - children: optional icon/snippet
	 * - value: bindable value
	 * - [x: string]: unknown for native attributes
	 */
	type Props = {
		id?: string;
		name?: string;
		type?: string;
		placeholder?: string;
		label?: string;
		error?: string;
		class?: string;
		children?: Snippet;
		value?: string;
		[x: string]: unknown;
	};

	// Destructure props; default 'name' to 'id'
	let {
		id,
		name = id,
		type = 'text',
		placeholder = '',
		label,
		error,
		class: externalClass = '',
		children,
		value = $bindable(''),
		...attrs
	}: Props = $props();
</script>

<div class="mb-4">
	{#if label}
		<label for={id} class="block mb-1 text-sm font-medium text-gray-700">
			{label}
		</label>
	{/if}
	<div class="relative">
		{#if children}
			<span
				class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"
			>
				{@render children?.()}
			</span>
		{/if}
		<input
			{id}
			{name}
			{type}
			{placeholder}
			bind:value
			class={[
				'block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
				children && 'pl-10',
				error && 'border-error',
				externalClass
			]
				.filter(Boolean)
				.join(' ')}
			{...attrs}
		/>
	</div>
	{#if error}
		<p class="mt-1 text-sm text-error">{error}</p>
	{/if}
</div>
