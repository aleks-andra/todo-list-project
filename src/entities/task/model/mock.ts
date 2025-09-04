import type { Task } from "./types";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Read recommended book",
    completed: false,
    subtasks: [
      { id: "1-1", title: "Find book recommendations", completed: false },
      { id: "1-2", title: "Order book online", completed: true },
    ],
  },
  {
    id: "2",
    title: "Vacation planning",
    completed: false,
    subtasks: [
      { id: "2-1", title: "Choose destination", completed: false },
      { id: "2-2", title: "Book flights", completed: false },
      { id: "2-3", title: "Reserve hotel", completed: false },
    ],
  },
  { id: "3", title: "Cook dinner", completed: false },
  { id: "4", title: "Sign up for training", completed: false },
];
