import type { FC } from "react";
import { useState } from "react";
import { Header } from "../../../widgets/header";
import { TaskList } from "../../../widgets/task-list";
import { mockTasks } from "../../../entities/task";
import type { Task } from "../../../entities/task";
import styles from "./home-page.module.css";

export const HomePage: FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleAdd = (title: string) => {
    const newTask: Task = { id: String(Date.now()), title, completed: false };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleEdit = (id: string, title: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title } : task))
    );
  };

  const handleAddSubTask = (parentId: string, title: string) => {
    const newSubTask: Task = {
      id: `${parentId}-${Date.now()}`,
      title,
      completed: false,
    };

    setTasks((prev) =>
      prev.map((task) =>
        task.id === parentId
          ? {
              ...task,
              subtasks: [...(task.subtasks || []), newSubTask],
            }
          : task
      )
    );
  };

  const handleEditSubTask = (
    parentId: string,
    subTaskId: string,
    title: string
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === parentId
          ? {
              ...task,
              subtasks: task.subtasks?.map((subtask) =>
                subtask.id === subTaskId ? { ...subtask, title } : subtask
              ),
            }
          : task
      )
    );
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }

        if (task.subtasks) {
          const updatedSubtasks = task.subtasks.map((subtask) =>
            subtask.id === id
              ? { ...subtask, completed: !subtask.completed }
              : subtask
          );
          return { ...task, subtasks: updatedSubtasks };
        }

        return task;
      })
    );
  };

  const handleToggleCollapse = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCollapsed: !task.isCollapsed } : task
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleDeleteSubTask = (parentId: string, subTaskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === parentId
          ? {
              ...task,
              subtasks: task.subtasks?.filter(
                (subtask) => subtask.id !== subTaskId
              ),
            }
          : task
      )
    );
  };

  return (
    <main className={styles.page}>
      <Header />
      <TaskList
        tasks={tasks}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onAddSubTask={handleAddSubTask}
        onEditSubTask={handleEditSubTask}
        onToggleComplete={handleToggleComplete}
        onToggleCollapse={handleToggleCollapse}
        onDelete={handleDelete}
        onDeleteSubTask={handleDeleteSubTask}
      />
    </main>
  );
};
