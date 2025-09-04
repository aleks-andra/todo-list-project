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
import { AddTaskModal } from "../../../../features/add-task";
import styles from "./task-list-item.module.css";

type Props = {
  task: Task;
  isSubTask?: boolean;
  onEdit?: (id: string, title: string) => void;
  onAddSubTask?: (parentId: string, title: string) => void;
  onEditSubTask?: (parentId: string, subTaskId: string, title: string) => void;
};

export const TaskListItem: FC<Props> = ({
  task,
  isSubTask = false,
  onEdit,
  onAddSubTask,
  onEditSubTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [isAddSubTaskModalOpen, setIsAddSubTaskModalOpen] = useState(false);
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
    } else if (event.key === "Escape") {
      handleCancel();
    }
  };

  const handleAddSubTaskClick = () => {
    setIsAddSubTaskModalOpen(true);
  };

  const handleAddSubTask = (title: string) => {
    onAddSubTask?.(task.id, title);
    setIsAddSubTaskModalOpen(false);
  };

  const handleEditSubTask = (subTaskId: string, title: string) => {
    onEditSubTask?.(task.id, subTaskId, title);
  };

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
              setEditTitle(event.target.value);
            }}
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
    <>
      <li className={styles.taskItem}>
        <label className={styles.taskItemLabel}>
          <input type="checkbox" checked={task.completed} />
        </label>
        <span className={styles.taskItemTitle}>{task.title}</span>
        <div className={styles.taskItemActions}>
          {!isSubTask && (
            <button
              className={styles.actionButton}
              type="button"
              aria-label="Добавить подзадачу"
              onClick={handleAddSubTaskClick}
            >
              <AddIcon />
            </button>
          )}
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
      {!isSubTask && task.subtasks && task.subtasks.length > 0 && (
        <ul className={styles.subtasksList}>
          {task.subtasks.map((subtask) => (
            <TaskListItem
              key={subtask.id}
              task={subtask}
              isSubTask={true}
              onEdit={(id, title) => handleEditSubTask(id, title)}
            />
          ))}
        </ul>
      )}
      {!isSubTask && (
        <AddTaskModal
          isOpen={isAddSubTaskModalOpen}
          onClose={() => setIsAddSubTaskModalOpen(false)}
          onSubmit={handleAddSubTask}
          isSubTask={true}
        />
      )}
    </>
  );
};
