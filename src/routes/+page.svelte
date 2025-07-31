<script lang="ts">
    import { clickOutside } from "$lib/actions/click_outside";
    import { getAppState } from "$lib/state/app-state.svelte";
    import Icon from "@iconify/svelte";
    import { tick } from "svelte";

    let appState = getAppState();
    let blinkTimeClass = $derived.by(() => appState.timerIsRunning() && appState.timeIsLessThanAMinute() ? "blinking-time": "");
    let timeFinishedClass = $derived.by(() => appState.timerIsFinished() ? "finished-time": "");

    let showAddNewTaskInput = $state<boolean>(false);
    let newTask = $state<string>("");

    // svelte-ignore non_reactive_update
    let addNewTaskInputRef = $state<HTMLInputElement | null>(null);
        
    async function showAddNewTaskInputAction() {
        showAddNewTaskInput = true;
        await tick();
        addNewTaskInputRef?.focus();
    }

    function saveAddNewTaskInputAction() {
        showAddNewTaskInput = false;
        appState.addNewTask(newTask);
        newTask = "";
    }

    function saveAddNewTaskInputActionOnEnter(event: KeyboardEvent) {
        if (event.key === "Enter") {
            saveAddNewTaskInputAction();
            showAddNewTaskInputAction();
        }
    }

</script>

    <div class="timer-view">
        <div class="timer-time {blinkTimeClass} {timeFinishedClass}">{appState.getTimeRemaining()}</div>
        <div class="timer-controls">
            {#if appState.timerIsRunning()}
                <Icon icon="si:pause-fill" width="24" height="24" onclick={() => appState.timerPause()}/>
            {:else}
                {#if !appState.timerIsFinished()}
                    <Icon icon="si:play-fill" width="24" height="24" onclick={() => appState.timerRun()}/>
                {/if}
                <Icon icon="iconamoon:restart" width="24" height="24" onclick={() => appState.timerRestart()}/>
            {/if}
            </div>
    </div>
    
    <div class="phase-tasks-view {!appState.isRunningPhase() ? "phase-tasks-view-inactive": ""}">
        <div class="phase-view">
            <div class="phase-control"> 
                <Icon icon="grommet-icons:previous" class={appState.hasPrevPhase() ? "": "phase-control-hidden"} width="24" height="24" onclick={() => appState.goPrevPhase()}/>
            </div>

            <div class="phase-label">
                <span class="phase-name">{appState.getPhaseName()}</span>
            </div>
            
            <div class="phase-control"> 
                <Icon icon="grommet-icons:next" class={appState.hasNextPhase() ? "": "phase-control-hidden"} width="24" height="24" onclick={() => appState.goNextPhase()}/>
            </div>
        </div>

        <div class="phase-change-control">
            {#if !appState.isRunningPhase()}
                <span class="phase-change-time">{appState.getPhaseTime()}</span>
                <Icon icon="material-symbols:timer-outline-rounded" class="phase-change-control-icon" width="24" height="24" onclick={() => appState.startPhase()}/>
            {:else if appState.allTasksComplete()}
                <Icon icon="subway:tick" class="phase-change-control-icon" width="24" height="24" onclick={() => appState.startNextPhase()}/>
            {:else}
                <Icon icon="tdesign:edit" class="phase-change-control-icon" width="24" height="24" style="opacity:0;cursor:default"/>
            {/if}
        </div>

        <div class="tasks-view">

            <ul>
                {#each appState.getTasks() as task, i}
                <li>
                    <div class="task-container">
                        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <span onclick={() => appState.toggleTask(i)} class={task.task_completed ? "task-done": ""}>{task.task_name}</span>
                        <Icon icon="material-symbols-light:delete-outline-rounded" class="delete-icon" onclick={() => appState.removeTask(i)} width="24" height="24"/>
                    </div>
                </li>
                {/each}

                
                <li>
                    {#if !showAddNewTaskInput}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <span class="show-add-new-task-input" onclick={() => showAddNewTaskInputAction()}>&nbsp;</span>
                    {:else}
                    <input 
                        bind:this={addNewTaskInputRef} 
                        bind:value={newTask} 
                        use:clickOutside={() => saveAddNewTaskInputAction()} 
                        onkeydown={saveAddNewTaskInputActionOnEnter} 
                        class="add-new-task-input" 
                        type="text" 
                    />
                    {/if}
                </li>
            </ul>
        </div>
    </div>

<style>

    .timer-view {
        width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .timer-time {
        font-size: 150px;
    }

    .timer-controls {
        font-size: 50px;
        cursor: pointer;
    }

    .phase-tasks-view {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .phase-tasks-view-inactive {
        background-color: rgb(236, 155, 155);
    }

    .phase-view {
        height: 20%;
        width: 60%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px;
        /* gap: 80px; */
    }

    .phase-control {
        cursor: pointer;
        font-weight: lighter;
    }

    :global(.phase-control-hidden) {
        display: none;
    }

    .phase-label {
        display: flex;
        font-weight: bold;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .phase-count {
        font-size: 15px;
        color: gray;
    }

    .phase-name {
        font-size: 50px;
    }

    .tasks-view {
        flex: 1;
    }

    .tasks-view ul>li {
        font-size: 30px;
        text-align: right;
        cursor: pointer;
        margin: 20px;
    }

    .blinking-time {
      animation: blink 1s infinite; /* name duration iteration-count */
    }
    
    @keyframes blink {
      0% { opacity: 1; }
      50% { opacity: 0; }
      100% { opacity: 1; }
    }

    .finished-time {
        color: red;
    }

    .task-done {
        text-decoration: line-through;
    }

    .phase-change-control {
        display: flex;
        justify-content: center;
        margin-bottom: 32px;
    }

    :global(.phase-change-control-icon) {
        cursor: pointer;
    }

    .phase-change-time {
        font-size: 24px;
        font-weight: lighter;
        margin-right: 10px;
    }

    .show-add-new-task-input {
        width: 100%;
        display: block;
    }

    .show-add-new-task-input:hover {
        background-color: rgba(0, 0, 0, 0.035);
    }

    .add-new-task-input {
        width: 100%;
    }

    :global(.delete-icon) {
        opacity: 0;
        transform: translateX(8px);
        transition: opacity 0.2s ease, transform 0.2s ease;
        cursor: pointer;
    }

    :global(.task-container:hover .delete-icon) {
        opacity: 1;
        transform: translateX(0);
    }

</style>