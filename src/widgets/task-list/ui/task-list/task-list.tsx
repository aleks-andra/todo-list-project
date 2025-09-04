import type { FC } from "react";
import type { Task } from "../../../../entities/task";
import { TaskListItem } from "../task-list-item/task-list-item";
import { AddTaskButton } from "../../../add-task-button";
import styles from "./task-list.module.css";

type Props = {
  tasks: Task[];
};

export const TaskList: FC<Props> = ({ tasks }) => {
  return (
    <section className={styles.taskContainer}>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))}
      </ul>
      <AddTaskButton onClick={() => {}} />
    </section>
  );
};
