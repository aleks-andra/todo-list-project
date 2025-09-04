import type { FC, KeyboardEvent } from "react";
import { useState, useRef, useEffect } from "react";
import type { Task } from "../../../../entities/task";
import {
  AddIcon,
  EditIcon,
  DeleteIcon,
  DragIcon,
  CheckIcon,
  CrossIcon,
} from "../../../../shared/ui";
import styles from "./task-list-item.module.css";

type Props = {
  task: Task;
  onEdit?: (id: string, title: string) => void;
};

export const TaskListItem: FC<Props> = ({ task, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setEditTitle(task.title);
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmedTitle = editTitle.trim();
    if (trimmedTitle && trimmedTitle !== task.title) {
      onEdit?.(task.id, trimmedTitle);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  console.log(editTitle);
  

  if (isEditing) {
    return (
      <li className={styles.taskItem}>
        <label className={styles.taskItemLabel}>
          <input type="checkbox" checked={task.completed} />
        </label>

        <div className={styles.editContainer}>
          <input
            ref={inputRef}
            className={styles.editInput}
            value={editTitle}
            onChange={(event) => { 
              setEditTitle(event.target.value)}}
            onKeyDown={handleKeyDown}
          />
          <button
            className={styles.saveButton}
            type="button"
            onClick={handleSave}
            aria-label="Сохранить изменения"
          >
            <CheckIcon />
          </button>
          <button
            className={styles.cancelButton}
            type="button"
            onClick={handleCancel}
            aria-label="Отменить изменения"
          >
            <CrossIcon />
          </button>
        </div>
      </li>
    );
  }

  return (
      <li className={styles.taskItem}>
        <label className={styles.taskItemLabel}>
          <input type="checkbox" checked={task.completed} />
        </label>
        <span className={styles.taskItemTitle}>{task.title}</span>
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
            onClick={handleEditClick}
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
