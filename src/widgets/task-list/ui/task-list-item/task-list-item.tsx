import type { FC } from "react";
import type { Task } from "../../../../entities/task";
import { AddIcon, EditIcon, DeleteIcon, DragIcon } from "../../../../shared/ui";
import styles from "./task-list-item.module.css";

type Props = {
  task: Task;
};

export const TaskListItem: FC<Props> = ({ task }) => {
  return (
    <li className={styles.taskItem}>
      <label className={styles.taskItemLabel}>
        <input type="checkbox" checked={task.completed} />
        <span className={styles.taskItemTitle}>{task.title}</span>
      </label>

      <div className={styles.taskItemActions}>
        <button
          className={styles.actionButton}
          type="button"
          aria-label="Добавить задачу"
        >
          <AddIcon />
        </button>
        <button
          className={styles.actionButton}
          type="button"
          aria-label="Редактировать задачу"
        >
          <EditIcon />
        </button>
        <button
          className={styles.actionButton}
          type="button"
          aria-label="Удалить задачу"
        >
          <DeleteIcon />
        </button>
        <button
          className={styles.actionButton}
          type="button"
          aria-label="Перетащить задачу"
        >
          <DragIcon />
        </button>
      </div>
    </li>
  );
};
