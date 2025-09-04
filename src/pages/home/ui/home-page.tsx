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

  return (
    <main className={styles.page}>
      <Header />
      <TaskList tasks={tasks} onAdd={handleAdd} />
    </main>
  );
};
