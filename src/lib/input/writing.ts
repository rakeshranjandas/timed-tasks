import type { Phase } from "$lib/types/task.types";

export const input: Phase[] = [
    {
        phase_name: "Idea",
        phase_time_in_minutes: 10,
        phase_tasks: [
            { task_name: "What's the idea?" },
            { task_name: "Title" },
            { task_name: "Why it's important for you?" },
            { task_name: "Who's the audience?" },
            { task_name: "How do you want them to feel?" },
            { task_name: "What's the takeaway at the end?" },
        ],
    },

    {
        phase_name: "Write - initial draft",
        phase_time_in_minutes: 20,
        phase_tasks: [
            { task_name: "Whatever comes and however it comes, put it on the paper" },
        ],
    },

    {
        phase_name: "Write - finalise",
        phase_time_in_minutes: 10,
        phase_tasks: [
            { task_name: "Organise the draft" },
        ],
    },

    {
        phase_name: "Review - note the changes needed",
        phase_time_in_minutes: 15,
        phase_tasks: [
            { task_name: "Noise (Is there any unnecessary information)" },
            { task_name: "Obscurity (Any assumptions made)" },
            { task_name: "Brevity (Use short sentences)" },
            { task_name: "Appeal (Verbs, Relatable nouns)" },
            { task_name: "Jargon (Find simple words)" },
        ],
    },

    {
        phase_name: "Rewrite",
        phase_time_in_minutes: 20,
        phase_tasks: [
            { task_name: "Make changes as noted in the Review phase" },
        ],
    },

    {
        phase_name: "Publish",
        phase_time_in_minutes: 10,
        phase_tasks: [
            { task_name: "Quartz - blog setup" },
        ],
    },
];