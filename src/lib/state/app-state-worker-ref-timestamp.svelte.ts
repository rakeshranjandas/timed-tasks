import type { Phase } from "$lib/types/task.types";
import { getContext, setContext, tick } from "svelte";
import timerAudio from "$assets/timer-audio.mp3";
import { TimerAction } from "$lib/types/timer.types";

export class AppState {
    phases = $state<Phase[]>([]);
    current_phase_index = $state<number>(0);
    view_phase_index = $state<number>(0);
    timer = $state<TimerWithWorker | null>(null);

    constructor(phases: Phase[], worker: Worker) {
        this.phases = phases;
        this.current_phase_index = 0;
        this.view_phase_index = 0;
        this.timer = new TimerWithWorker(worker);

        this.setTimer();
    }

    setTimer() {
        if (this.current_phase_index >= this.phases.length) {
            console.log(
                `No phase present with index ${this.current_phase_index}`
            );
            return;
        }

        this.timer?.init(
            this.phases[this.current_phase_index].phase_time_in_minutes * 60
        );
    }

    getTimeRemaining() {
        return this.formatTime(this.timer?.time_remaining_in_seconds);
    }

    timeIsLessThanAMinute() {
        return this.timer && this.timer?.time_remaining_in_seconds < 60;
    }

    formatTime(timeInSeconds: number | undefined) {
        if (!timeInSeconds) {
            return "00:00";
        }

        let seconds: number = timeInSeconds % 60;
        let minutes: number = Math.floor(timeInSeconds / 60);

        let seconds_string = seconds.toString().padStart(2, "0");
        let minutes_string = minutes.toString().padStart(2, "0");

        return minutes_string + ":" + seconds_string;
    }

    timerPause() {
        this.timer?.pause();
    }

    timerRun() {
        this.timer?.run();
    }

    timerRestart() {
        this.timer?.restart();
    }

    timerIsRunning() {
        return this.timer?.is_running;
    }

    timerIsFinished() {
        return this.timer?.is_finished;
    }

    startPhase() {
        this.current_phase_index = this.view_phase_index;
        this.setTimer();
    }

    startNextPhase() {
        if (!this.hasNextPhase()) {
            alert("There are no more phases.");
            return;
        }

        this.goNextPhase();
        this.startPhase();
    }

    isRunningPhase() {
        return this.current_phase_index === this.view_phase_index;
    }

    getPhaseName() {
        if (this.view_phase_index >= this.phases.length) {
            return "";
        }

        return this.phases[this.view_phase_index].phase_name;
    }

    hasNextPhase() {
        return this.view_phase_index + 1 < this.phases.length;
    }

    goNextPhase() {
        if (!this.hasNextPhase()) {
            return;
        }

        this.view_phase_index++;
    }

    hasPrevPhase() {
        return this.view_phase_index - 1 >= 0;
    }

    goPrevPhase() {
        if (!this.hasPrevPhase()) {
            return;
        }

        this.view_phase_index--;
    }

    getTasks() {
        return this.phases[this.view_phase_index].phase_tasks;
    }

    toggleTask(taskIndex: number) {
        this.phases[this.view_phase_index].phase_tasks[
            taskIndex
        ].task_completed =
            !this.phases[this.view_phase_index].phase_tasks[taskIndex]
                .task_completed;
    }

    allTasksComplete() {
        let tasks = this.phases[this.view_phase_index].phase_tasks;

        let completeTasksCount = 0;
        tasks.forEach((task) => {
            if (task.task_completed) completeTasksCount++;
        });

        return completeTasksCount === tasks.length;
    }
}

class TimerWithWorker {
    target_in_seconds: number = 0;
    time_remaining_in_seconds = $state<number>(0);
    is_running = $state<boolean>(false);
    is_finished = $state<boolean>(false);
    timer_instance: number | null = null;
    timer_audio: HTMLAudioElement | null = null;
    worker: Worker | null = null;

    constructor(worker: Worker) {
        // Since Audio API is only available in the browser, it has to
        // be made sure that the following code runs explicity in the browser
        if (typeof window !== "undefined" && typeof Audio !== "undefined") {
            this.timer_audio = new Audio(timerAudio);
        }

        this.worker = worker;

        worker.onmessage = (e) => {
            let ticks = e.data;
            this.time_remaining_in_seconds = Math.max(
                0,
                this.target_in_seconds - ticks
            );

            if (this.time_remaining_in_seconds === 0) {
                this.worker?.postMessage({ action: TimerAction.STOP });
                this.timer_audio?.play();
                this.is_finished = true;
                this.is_running = false;
            }
        };

    }

    init(target_in_seconds: number) {
        this.target_in_seconds = target_in_seconds;
        this.time_remaining_in_seconds = target_in_seconds;
        this.is_running = false;
        this.is_finished = false;
        this.worker?.postMessage({ action: TimerAction.RESET });
    }

    run() {
        this.is_running = true;
        this.worker?.postMessage({
            action: TimerAction.RUN,
            timestamp: new Date().getTime(),
        });
    }

    pause() {
        this.is_running = false;
        this.worker?.postMessage({ action: TimerAction.STOP });
    }

    restart() {
        this.init(this.target_in_seconds);
    }
}

const APP_STATE_KEY = Symbol("APP_STATE");

export function setAppState(phases: Phase[], worker: Worker) {
    return setContext(APP_STATE_KEY, new AppState(phases, worker));
}

export function getAppState() {
    return getContext<ReturnType<typeof setAppState>>(APP_STATE_KEY);
}
