<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Props for the Container component
	 * - size: one of 'sm' | 'md' | 'lg' | 'xl' | 'full'
	 * - class: additional classes
	 * - children: content inside the container
	 * - [x: string]: unknown to allow native attributes
	 */
	type Props = {
		size: 'sm' | 'md' | 'lg' | 'xl' | 'full';
		class?: string;
		children?: Snippet;
		[x: string]: unknown;
	};

	let { size = 'full', class: externalClass = '', children, ...attrs }: Props = $props();

	const maxWidths: Record<Props['size'], string> = {
		sm: 'max-w-screen-sm',
		md: 'max-w-screen-md',
		lg: 'max-w-screen-lg',
		xl: 'max-w-screen-xl',
		full: 'max-w-full'
	};
</script>

<div
	class={['w-full mx-auto px-4', maxWidths[size], externalClass].filter(Boolean).join(' ')}
	{...attrs}
>
	{@render children?.()}
</div>
