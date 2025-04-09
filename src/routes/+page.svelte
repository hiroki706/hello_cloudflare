<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	import type { SubmitFunction } from './$types';

	const option: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	};
	let { data, form }: PageProps = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<h1>ハローワールド!</h1>
<form method="POST" use:enhance={option} action="?/runCode">
	<label>
		入力
		<input type="text" name="input" disabled={true} value="Hello" />
	</label>
	<label>
		code
		<input type="text" name="code" disabled={loading} />
	</label>
	<button disabled={loading}>Push Me!</button>
	{#if form?.codeEmpty}
		<p class="formErr">Code欄は空でない必要があります</p>
	{/if}
	{#if form?.inputEmpty}
		<p class="formErr">Input欄は空でない必要があります</p>
	{/if}
</form>

{#if loading}
	<p>Loading...</p>
{/if}
{#if form?.success}
	<p>{data.loadtest}</p>
	<h4>{form?.data?.result}</h4>
	<p>{form?.data?.stdout}</p>
{/if}

<style>
	.formErr {
		color: red;
	}
</style>
