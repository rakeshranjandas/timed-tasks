<script lang="ts">
    import { setAppState } from '$lib/state/app-state.svelte';
    import { input } from '$test/dsa';
    import '../app.css';

    let appState = setAppState(input);

    let { children } = $props();

</script>

{@render children()}