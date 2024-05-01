<!-- LoadingWrapper.svelte -->
<script lang="ts">
	export let isLoading: boolean;
</script>

<div>
	{#if isLoading}
		<div class="preloader">
			<div class="preloader-text">Loading...</div>
		</div>
	{:else}
		<slot />
	{/if}
</div>

<style>
	.preloader {
		display: flex;
		justify-content: center;
		font-size: 1.5em;
		padding: 10px;
	}
	.preloader-text {
		font-size: 1.5em;
		animation: spin 1s infinite linear alternate;
	}

	@keyframes spin {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(1.5);
		}
	}
</style>
