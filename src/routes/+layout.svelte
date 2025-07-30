<script lang="ts">
    import { input } from '$lib/input/dsa';
    import { AppState, setAppState } from '$lib/state/app-state.svelte';
    import { TickWorker } from '$lib/workers/tick.worker';
    import '../app.css';
    import { onDestroy, onMount } from 'svelte';

    let worker = $state<Worker | null>(null);
    let appState = $derived.by(() => {
        if (!worker) return null;
        let createdAppState = setAppState(worker);
        createdAppState.setup(input);
        return createdAppState;
    });

    onMount(() => {
        worker = new TickWorker();
    });

    onDestroy(() => {
        worker?.terminate();
    });

    let { children } = $props();

</script>

<div class="viewport">

    {#if appState}
    {@render children()}
    {/if}

</div>

<style>

    .viewport {
        display: flex;
        height: 100%;
    }

</style>
