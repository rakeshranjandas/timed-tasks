<script lang="ts">
    import { AppState, setAppState } from '$lib/state/app-state.svelte';
    import { input } from '$test/dsa';
    import '../app.css';

    setAppState(input);

    let { children } = $props();

</script>

{@render children()}