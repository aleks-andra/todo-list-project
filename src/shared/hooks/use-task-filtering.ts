import { useMemo } from "react";
import type { Task } from "../../entities/task";
import { TaskFilter } from "../../entities/task";

type UseTaskFilteringProps = {
  tasks: Task[];
  searchQuery: string;
  filter: TaskFilter;
};

export const useTaskFiltering = ({
  tasks,
  searchQuery,
  filter,
}: UseTaskFilteringProps) => {
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (filter === TaskFilter.COMPLETE) {
      result = result.filter((task) => task.completed);
    } else if (filter === TaskFilter.INCOMPLETE) {
      result = result.filter((task) => !task.completed);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((task) => {
        const title = task.title.toLowerCase();

        return title.includes(query);
      });
    }

    return result;
  }, [tasks, searchQuery, filter]);

  return {
    filteredTasks,
  };
};
