import type { Phase } from "$lib/types/task.types";

export const input: Phase[] = [
    {
        phase_name: "Ideation",
        phase_time_in_minutes: 10,
        phase_tasks: [
            { task_name: "What is the idea" },
            { task_name: "What problem is it solving" },
            { task_name: "How people will use it" },
        ],
    },

    {
        phase_name: "High-level design",
        phase_time_in_minutes: 20,
        phase_tasks: [
            { task_name: "List 3 use cases" },
            { task_name: "Pick one use case and create a user journey" },
        ],
    },

    {
        phase_name: "UI",
        phase_time_in_minutes: 10,
        phase_tasks: [
            { task_name: "Which process of the user journey is most important" },
            { task_name: "Design a minimal UI" },
        ],
    },

    {
        phase_name: "Choosing tools",
        phase_time_in_minutes: 5,
        phase_tasks: [
            { task_name: "Identify components" },
            { task_name: "Tech or libraries to be used for the components" },
        ],
    },

    {
        phase_name: "Low-level design",
        phase_time_in_minutes: 10,
        phase_tasks: [
            { task_name: "Entities involved" },
            { task_name: "Reponsibilities of each entity" },
            { task_name: "MVC, MVVM, framework Components" },
            { task_name: "Service classes" },
        ],
    },

    {
        phase_name: "Code",
        phase_time_in_minutes: 120,
        phase_tasks: [
            { task_name: "Code the entities" },
            { task_name: "Remaining" },
        ],
    },
];