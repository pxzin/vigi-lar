<script lang="ts">
	import VideoStream from '../VideoStream.svelte';
	import FullscreenWrapper from './FullscreenWrapper.svelte';

	type Props = {
		channelId: number;
		channelName: string;
		class?: string;
	};
	let { channelId, channelName, class: externalClass = '' }: Props = $props();
</script>

<FullscreenWrapper>
	<VideoStream {channelId} />
	<!-- Label do canal -->
	<div
		class={[
			'absolute top-2 left-2 bg-black/60 px-2 py-1 text-xs rounded z-10 text-white',
			externalClass
		]}
	>
		{channelName}
	</div>
</FullscreenWrapper>
