import { TimerAction, type TimerActionData } from "$lib/types/timer.types";

let ticksElapsed = 0;
let ticksFromLastReference = 0;
let referenceTimestamp: number | undefined = new Date().getTime();
let isRunning = false;

self.addEventListener("message", (e) => {
    const timerActionData: TimerActionData = e.data;

    switch (timerActionData.action) {
        case TimerAction.RESET:
            ticksElapsed = 0;
            ticksFromLastReference = 0;
            isRunning = false;
            break;

        case TimerAction.RUN:
            referenceTimestamp = timerActionData?.timestamp;
            isRunning = true;
            break;

        case TimerAction.STOP:
            ticksElapsed += ticksFromLastReference;
            isRunning = false;
            break;
    }
});

setInterval(() => {
    if (isRunning) {
        ticksFromLastReference = Math.round((new Date().getTime() - (referenceTimestamp ?? 0))/1000);
        self.postMessage(ticksElapsed + ticksFromLastReference);
    }
}, 1000);
