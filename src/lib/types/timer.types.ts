export enum TimerAction {
    RESET,
    RUN,
    STOP
}

export interface TimerActionData {
    action: TimerAction,
    timestamp?: number
}