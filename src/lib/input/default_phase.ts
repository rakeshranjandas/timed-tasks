import type { Phase } from "$lib/types/task.types";

export const defaultPhase: Phase = {
    phase_name: "Dummy Phase",
    phase_time_in_minutes: 10,
    phase_tasks: [
        { task_name: "task 1" },
        { task_name: "task 2" },
        { task_name: "task 3" },
    ],
};
