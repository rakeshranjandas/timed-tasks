<script lang="ts">
    import { AppState, setAppState } from '$lib/state/app-state.svelte';
    import { workerUrl } from '$lib/workers/tick.worker';
    import { input } from '$test/dsa';
    import '../app.css';
    import { onDestroy, onMount } from 'svelte';

    

    let worker = $state<Worker | null>(null);
    let appState = $derived.by(() => {
        if (!worker) return null;
        return setAppState(input, worker);
    });

    onMount(() => {
        worker = new Worker(workerUrl, {
            type: 'module'
        });
    });

    onDestroy(() => {
        worker?.terminate();
    });

    let { children } = $props();

</script>

{#if appState}
{@render children()}
{/if}