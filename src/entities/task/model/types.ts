export type TaskId = string;

export type Task = {
  id: TaskId;
  title: string;
  completed: boolean;
  subtasks?: Task[];
  isCollapsed?: boolean;
};
