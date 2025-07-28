import { TimerAction } from "$lib/types/timer.types";

let ticks = 0;
let isRunning = false;

self.addEventListener("message", (e) => {
    const data = e.data;

    switch(data) {
        case TimerAction.RESET:
            ticks = 0;
            isRunning = false;
            break;

        case TimerAction.RUN:
            isRunning = true;
            break;

        case TimerAction.STOP:
            isRunning = false;
            break;
    }

});



setInterval(() => {

    if (isRunning) {
        ticks++;
        self.postMessage(ticks);
    }

}, 1000);