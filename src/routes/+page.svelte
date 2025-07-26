<script>
    import Icon from "@iconify/svelte";

</script>
<div class="viewport">
    <div class="timer-view">
        <div class="timer-time">09:58</div>
        <div class="timer-controls">
            <Icon icon="mi:pause" width="24" height="24" />
            <Icon icon="mi:play" width="24" height="24" />
        </div>
    </div>
    <div class="phase-tasks-view">
        <div class="phase-view">
            <div class="phase-control"> 
                <Icon icon="grommet-icons:previous" width="24" height="24" />
            </div>
            <div class="phase-label">
                <span class="phase-name">Phase 1: Idea</span>
            </div>
            <div class="phase-control"> 
                <Icon icon="grommet-icons:next" width="24" height="24" />
            </div>
        </div>
        <div class="tasks-view">
            <ul>
                <li><s>One-line summary</s></li>
                <li>What's the problem</li>
                <li>Does anything exist like this</li>
            </ul>
        </div>
    </div>
</div>

<style>
    .viewport {
        display: flex;
        height: 100%;
    }

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
    }

    .phase-tasks-view {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .phase-view {
        height: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 80px;
    }

    .phase-control {
        cursor: pointer;
        font-weight: lighter;
        
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
        padding: 2rem;
    }

    .tasks-view ul>li {
        font-size: 30px;
        text-align: right;
        cursor: pointer;
    }
</style>