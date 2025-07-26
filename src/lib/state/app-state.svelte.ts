import type { Phase } from "$lib/types/task.types";
import { getContext, setContext } from "svelte";


export class AppState {
    phases = $state<Phase[]>([]);
    current_phase_index = $state<number>(0);
    timer = $state<Timer | null>(null);

    constructor(phases: Phase[]) {
        this.phases = phases;
        this.current_phase_index = 0;
        this.timer = new Timer();
        this.setTimer();
    }

    setTimer() {
        if (this.current_phase_index >= this.phases.length) {
            console.log(`No phase present with index ${this.current_phase_index}`);
            return;
        }

        this.timer?.init(this.phases[this.current_phase_index].phase_time_in_minutes * 60);
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

}

class Timer {
    target_in_seconds: number = 0;
    time_remaining_in_seconds = $state<number>(0);
    is_running = $state<boolean>(false);
    is_finished = $state<boolean>(false);
    timer_instance: number | null = null;

    constructor() {
        this.timer_instance = setInterval(() => {
            if (!this.is_running || this.is_finished) {
                return;
            }

            this.time_remaining_in_seconds--;
            if (this.time_remaining_in_seconds === 0) {
                this.is_finished = true;
                this.is_running = false;
            }

        }, 1000);
    }

    init(target_in_seconds: number) {
        this.target_in_seconds = target_in_seconds;
        this.time_remaining_in_seconds = target_in_seconds;
        this.is_running = false;
        this.is_finished = false;
    }

    run() {
        this.is_running = true;
    }

    pause() {
        this.is_running = false;
    }

    restart() {
        this.init(this.target_in_seconds);
    }
}

const APP_STATE_KEY = Symbol("APP_STATE");

export function setAppState(phases: Phase[]) {
    return setContext(APP_STATE_KEY, new AppState(phases));
}

export function getAppState() {
    return getContext<ReturnType<typeof setAppState>>(APP_STATE_KEY);
}