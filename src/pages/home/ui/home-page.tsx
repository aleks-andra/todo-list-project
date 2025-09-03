import type { FC } from "react";
import { Header } from "../../../widgets/header";
import { TaskList } from "../../../widgets/task-list";
import { mockTasks } from "../../../entities/task";
import styles from "./home-page.module.css";

export const HomePage: FC = () => {
  return (
    <main className={styles.page}>
      <Header />
      <TaskList tasks={mockTasks} />
    </main>
  );
};
