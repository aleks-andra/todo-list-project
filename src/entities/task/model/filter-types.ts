export const TaskFilter = {
  ALL: "ВСЕ",
  COMPLETE: "ЗАВЕРШЕННЫЕ",
  INCOMPLETE: "НЕЗАВЕРШЕННЫЕ",
} as const;

export type TaskFilter = (typeof TaskFilter)[keyof typeof TaskFilter];

export type SearchAndFilterState = {
  searchQuery: string;
  filter: TaskFilter;
};

export type TaskFilteringOptions = {
  tasks: import("./types").Task[];
  searchQuery: string;
  filter: TaskFilter;
};
