
<script lang="ts">
    import type { Phase, Task } from '$lib/types/task.types';
    import Icon from '@iconify/svelte';

    let defaultPhases: Phase[] = [
        {
            phase_name: "",
            phase_time_in_minutes: 0,
            phase_tasks: [
                {task_name: "task 1"},
                {task_name: "task 1"},
                {task_name: "task 1"},
            ],
        }
    ]

    let phases = $state<Phase[]>(defaultPhases);

</script>

{#snippet addPhaseContainer(phase: Phase, count: number)}
<div class="add-phase-container">
    <p class="add-phase-count">#{count}</p>
    <div class="add-phase">
        <div class="phase-input-container">
            <p class="phase-input-label">Phase</p>
            <p><input type="text" value="{phase.phase_name}"/></p>
        </div>
        <div class="phase-input-container">
            <p class="phase-input-label">Minutes</p>
            <p><input type="number" value={phase.phase_time_in_minutes}/></p>
        </div>
        <div class="phase-input-container">
            <p class="phase-input-label">Tasks</p>
            <p><textarea>{phase.phase_tasks.map((task) => task.task_name).join("\n")}</textarea></p>
        </div>
    </div>
</div>
{/snippet}

{#snippet addNewPhase()}
    <div class="add-new-phase">
        <Icon icon="mdi:plus" width="24" height="24" />
    </div>
{/snippet}

<div class="add-container">
    {#each phases as phase, index}
        {@render addPhaseContainer(phase, index+1)}
    {/each}
    
    {@render addNewPhase()}
</div>

<style>
    .add-container {
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: flex-start;
        margin-top: 100px;
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
    }

    .phase-input-label {
        color: #9d9d9d;
    }

    .add-new-phase {
        margin-top: 20px;
        width: 50%;
        border: 1px solid gray;
        /* background-color: gray; */
        display: flex;
        justify-content: center;
        padding: 12px;
        cursor: pointer;
    }
</style>