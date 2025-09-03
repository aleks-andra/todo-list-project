import type { FC } from "react";
import type { Task } from "../../../../entities/task";
import styles from "./task-list-item.module.css";

type Props = {
  task: Task;
}

export const TaskListItem: FC<Props> = ({ task }) => {
  return (
    <li className={styles.taskItem}>
      <label className={styles.taskItemLabel}>
        <input type="checkbox" checked={task.completed} />
        <span className={styles.taskItemTitle}>{task.title}</span>
      </label>
    </li>
  );
};
