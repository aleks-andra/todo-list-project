import type { FC, FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { Modal } from "../../../shared/ui";
import styles from "./add-task-modal.module.css";

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
  isSubTask?: boolean;
};

export const AddTaskModal: FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubTask = false,
}) => {
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setTitle("");
    }
  }, [isOpen]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const value = title.trim();
    if (!value) return;
    onSubmit(value);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isSubTask ? "Новая подзадача" : "Новая задача"}
    >
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className={styles.input}
          placeholder="Введите задачу..."
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={200}
        />

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.buttonSecondary}
            onClick={onClose}
          >
            Отменить
          </button>
          <button
            type="submit"
            className={styles.buttonPrimary}
            disabled={!title.trim()}
          >
            Сохранить
          </button>
        </div>
      </form>
    </Modal>
  );
};
