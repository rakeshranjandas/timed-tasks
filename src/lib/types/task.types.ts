export interface Phase {
    phase_name: string,
    phase_time_in_minutes: number;
    phase_tasks: Task[]
}

export interface Task {
    task_name: string,
    task_completed ?: boolean;
}