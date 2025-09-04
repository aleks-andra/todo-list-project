import type { FC } from "react";
import { useState } from "react";
import type { Task } from "../../../../entities/task";
import { TaskListItem } from "../task-list-item/task-list-item";
import { AddTaskButton } from "../../../add-task-button";
import { AddTaskModal } from "../../../../features/add-task";
import styles from "./task-list.module.css";

type Props = {
  tasks: Task[];
  onAdd?: (title: string) => void;
  onEdit?: (id: string, title: string) => void;
};

export const TaskList: FC<Props> = ({ tasks, onAdd, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openAddModal = () => setIsOpen(true);
  const closeAddModal = () => setIsOpen(false);
  return (
    <section className={styles.taskContainer}>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <TaskListItem key={task.id} task={task} onEdit={onEdit} />
        ))}
      </ul>
      <AddTaskButton onClick={openAddModal} />
      <AddTaskModal
        isOpen={isOpen}
        onClose={closeAddModal}
        onSubmit={(title) => onAdd?.(title)}
      />
    </section>
  );
};
