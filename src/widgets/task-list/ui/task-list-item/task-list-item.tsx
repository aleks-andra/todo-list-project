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
  ArrowDownIcon,
  ArrowRightIcon,
} from "../../../../shared/ui";
import { AddTaskModal } from "../../../../features/add-task";
import styles from "./task-list-item.module.css";

type Props = {
  task: Task;
  isSubTask?: boolean;
  onEdit?: (id: string, title: string) => void;
  onAddSubTask?: (parentId: string, title: string) => void;
  onEditSubTask?: (parentId: string, subTaskId: string, title: string) => void;
  onToggleComplete?: (id: string) => void;
  onToggleCollapse?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDeleteSubTask?: (parentId: string, subTaskId: string) => void;
};

export const TaskListItem: FC<Props> = ({
  task,
  isSubTask = false,
  onEdit,
  onAddSubTask,
  onEditSubTask,
  onToggleComplete,
  onToggleCollapse,
  onDelete,
  onDeleteSubTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const [isAddSubTaskModalOpen, setIsAddSubTaskModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const hasSubtasks = task.subtasks && task.subtasks.length > 0;
  const isCollapsed = task.isCollapsed ?? false;
  const subtaskCount = task.subtasks?.length || 0;

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

  const handleToggleComplete = () => {
    onToggleComplete?.(task.id);
  };

  const handleToggleCollapse = () => {
    onToggleCollapse?.(task.id);
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const closeAddSubTaskModal = () => {
    setIsAddSubTaskModalOpen(false);
  };

  const handleDelete = () => {
    onDelete?.(task.id);
  };

  const handleDeleteSubTask = (subTaskId: string) => {
    onDeleteSubTask?.(task.id, subTaskId);
  };

  if (isEditing) {
    return (
      <li className={styles.taskItem}>
        <label className={styles.taskItemLabel}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
          />
        </label>

        <div className={styles.editContainer}>
          <input
            ref={inputRef}
            className={styles.editInput}
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
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
      <li
        className={styles.taskItem}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <label className={styles.taskItemLabel}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
          />
        </label>

        <span
          className={`${styles.taskItemTitle} ${
            task.completed ? styles.completed : ""
          }`}
        >
          {task.title}
        </span>

        <div className={styles.taskItemRightSection}>
          <div
            className={`${styles.taskItemActions} ${
              isHovered ? styles.visible : styles.hidden
            }`}
          >
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
              onClick={handleDelete}
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

          {hasSubtasks && (
            <button
              className={styles.collapseButton}
              type="button"
              aria-label={
                isCollapsed ? "Развернуть подзадачи" : "Свернуть подзадачи"
              }
              onClick={handleToggleCollapse}
            >
              {isCollapsed ? <ArrowRightIcon /> : <ArrowDownIcon />}
            </button>
          )}

          {hasSubtasks && (
            <div className={styles.subtaskCounter}>{subtaskCount}</div>
          )}
        </div>
      </li>

      {!isSubTask && hasSubtasks && (
        <ul
          className={`${styles.subtasksList} ${
            isCollapsed ? styles.collapsed : ""
          }`}
        >
          {task.subtasks!.map((subtask) => (
            <TaskListItem
              key={subtask.id}
              task={subtask}
              isSubTask={true}
              onEdit={(id, title) => handleEditSubTask(id, title)}
              onToggleComplete={onToggleComplete}
              onDelete={(id) => handleDeleteSubTask(id)}
            />
          ))}
        </ul>
      )}

      {!isSubTask && (
        <AddTaskModal
          isOpen={isAddSubTaskModalOpen}
          onClose={closeAddSubTaskModal}
          onSubmit={handleAddSubTask}
          isSubTask={true}
        />
      )}
    </>
  );
};
