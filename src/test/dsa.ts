import type { Phase } from "$lib/types/task.types";

export const input: Phase[] = [
    {
        phase_name: "Planning",
        phase_time_in_minutes: 10,
        phase_tasks: [
            {
                task_name: "Draft a solution",
            },
            {
                task_name: "What's the time complexity?",
            },
            {
                task_name: "What's the space complexity?",
            },
        ]
    },
    
    {
        phase_name: "Code and Submit",
        phase_time_in_minutes: 15,
        phase_tasks: [
            {
                task_name: "List the possible corner cases in comments",
            },
            {
                task_name: "Code",
            },
            {
                task_name: "Are the corner cases covered?",
            }
        ]
    },

    {
        phase_name: "Review and Rewrite",
        phase_time_in_minutes: 20,
        phase_tasks: [
            {
                task_name: "Can time or space complexity be improved?"
            },
            {
                task_name: "Can code be made better?"
            },
            {
                task_name: "Rewrite"
            }
        ] 
    }
]