
<script lang="ts">
    import { goto } from '$app/navigation';
    import { input as DSAInput} from '$lib/input/dsa';
    import { input as appSprintInput } from '$lib/input/app_sprint';
    import { input as writingInput } from '$lib/input/writing';
    import { defaultPhase } from '$lib/input/default_phase';
    import { input as DSAInput} from '$lib/input/dsa';
    import { getAppState } from '$lib/state/app-state.svelte';
    import type { Phase, Task } from '$lib/types/task.types';
    import Icon from '@iconify/svelte';

    let phases = $state<Phase[]>([ defaultPhase ]);
    let appState = getAppState();

    function addNewPhaseAction() {
        phases = [...phases, defaultPhase];
    }

    function startAction() {
        appState.setup(phases);
        goto("/timer");
    }

    function convertTasksToText(tasks: Task[]) {
        return tasks.map((task) => task.task_name).join("\n");
    }

    function convertTextToTasks(text: string) {
        return text.split("\n").filter(t => t.trim().length > 0).map((v): Task => { return {task_name: v} });
    }

    function removePhase(phaseCount: number) {
        phases.splice(phaseCount-1, 1);
    }

</script>

{#snippet addPhaseContainer(phase: Phase, count: number)}
<div class="add-phase-container">
    <p class="add-phase-count">
        #{count}
        {#if count > 1}
        <Icon icon="material-symbols-light:delete-outline-rounded" class="delete-icon" onclick={() => removePhase(count)} width="24" height="24"/>
        {/if}
    </p>
    <div class="add-phase">
        <div class="phase-input-container">
            <p class="phase-input-label">Phase</p>
            <p><input type="text" bind:value="{phase.phase_name}"/></p>
        </div>
        <div class="phase-input-container">
            <p class="phase-input-label">Minutes</p>
            <p><input type="number" bind:value={phase.phase_time_in_minutes}/></p>
        </div>
        <div class="phase-input-container">
            <p class="phase-input-label">Tasks</p>
            <p>
                <textarea
                value={convertTasksToText(phase.phase_tasks)}
                oninput={(e: {target: HTMLInputElement}) => {
                    phase.phase_tasks = convertTextToTasks(e.target.value);
                }}
                ></textarea>
            </p>

        </div>
    </div>
</div>
{/snippet}

{#snippet addNewPhase()}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="add-phase-actions" onclick={() => addNewPhaseAction()}>
        <Icon icon="mdi:plus" width="24" height="24" />
    </div>
{/snippet}

{#snippet start()} 
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="add-phase-actions start" onclick={() => startAction()}>
        <p>Start</p>
    </div>
{/snippet}


<div class="add-container">
    <div class="quick-tasks-container">
        <button onclick={() => phases = DSAInput}>DSA</button>
        <button onclick={() => phases = appSprintInput}>App-sprint</button>
        <button onclick={() => phases = writingInput}>Writing</button>
        <button onclick={() => { phases = [ defaultPhase ]; sessionName = ""; }}>New</button>
    </div>
    
    {#each phases as phase, index}
        {@render addPhaseContainer(phase, index+1)}
    {/each}
    
    {@render addNewPhase()}

    {@render start()}
</div>

<style>
    .add-container {
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: flex-start;
        /* margin-top: 100px; */
        align-items: center;
        gap: 10px;
    }
    
    .add-phase-container {
        width: 50%;
    }

    .add-phase {
        border: 1px solid black;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
    }

    .phase-input-container {
        margin-bottom: 5px;
    }

    .phase-input-container input[type="text"] {
        width: 100%;
    }

    .phase-input-container textarea {
        width: 100%;
        height: 200px;
    }

    .add-phase-count {
        font-weight: bolder;
        color: #9d9d9d;
        display: flex;
    }

    .phase-input-label {
        color: #9d9d9d;
    }

    .add-phase-actions {
        margin-top: 20px;
        width: 50%;
        border: 1px solid gray;
        /* background-color: gray; */
        display: flex;
        justify-content: center;
        padding: 12px;
        cursor: pointer;
    }

    .start {
        margin-top: 70px;
        background-color: rgba(0, 0, 0, 0.035);
        color: #9d9d9d;
        font-weight: bold;
    }

    :global(.delete-icon) {
        opacity: 0;
        transform: translateX(8px);
        transition: opacity 0.2s ease, transform 0.2s ease;
        cursor: pointer;
    }

    :global(.add-phase-count:hover .delete-icon) {
        opacity: 1;
        transform: translateX(0);
    }

    .quick-tasks-container {
        margin-bottom: 50px;
        width: 80%;
        margin-top: 50px;
        display: flex;
        gap: 20px;
    }

    .quick-tasks-container > button {
        min-width: 100px;
        min-height: 20px;
        padding: 10px;
        font-size: 20px;
        border: 1px solid gray;
        color: gray;
    }

</style>