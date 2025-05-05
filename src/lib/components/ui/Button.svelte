<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		type?: 'button' | 'submit' | 'reset';
		variant?: 'solid' | 'outline' | 'ghost';
		color?: 'primary' | 'success' | 'error' | 'warning' | 'info';
		disabled?: boolean;
		class?: string;
		children?: Snippet;
	};

	let {
		type = 'button',
		variant = 'solid',
		color = 'primary',
		disabled = false,
		class: externalClass = '',
		children
	}: Props = $props();
</script>

<button
	{type}
	{disabled}
	class={[
		'btn', // px, py, flex, foco, etc.
		// 'border-error',
		variant === 'solid' && `bg-${color} hover:bg-${color}-dark text-white`,
		variant === 'outline' && `border border-${color} text-${color} hover:bg-${color}-light`,
		variant === 'ghost' && `text-${color} hover:bg-${color}-light`,
		disabled && 'opacity-50 cursor-not-allowed',
		externalClass
	]
		.filter(Boolean)
		.join(' ')}
>
	{@render children?.()}
</button>
