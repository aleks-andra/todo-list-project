import type { FC } from "react";
import { AddIcon } from "../../../shared/ui";
import styles from "./add-task-button.module.css";

type AddTaskButtonProps = {
  onClick?: () => void;
};

export const AddTaskButton: FC<AddTaskButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      className={styles.button}
      aria-label="Добавить задачу"
      title="Добавить задачу"
      onClick={onClick}
    >
      <span className={styles.icon}>
        <AddIcon />
      </span>
    </button>
  );
};
