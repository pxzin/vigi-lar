<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Props for the Alert component
	 * - variant: type of alert (success, error, warning, info)
	 * - class: additional classes to apply
	 * - children: content inside the alert
	 * - [x: string]: unknown to allow native attributes
	 */
	type Props = {
		variant?: 'success' | 'error' | 'warning' | 'info';
		class?: string;
		children?: Snippet;
		[x: string]: unknown;
	};

	// Desestrutura props
	let { variant = 'info', class: externalClass = '', children, ...attrs }: Props = $props();

	// Mapeamento de shortcuts definidos no uno.config.ts
	const variantClasses: Record<NonNullable<Props['variant']>, string> = {
		success: 'alert-success',
		error: 'alert-error',
		warning: 'alert-warning',
		info: 'alert-info'
	};
</script>

<div
	role="alert"
	class={[variantClasses[variant], externalClass].filter(Boolean).join(' ')}
	{...attrs}
>
	{@render children?.()}
</div>
