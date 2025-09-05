import type { FC } from "react";
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Task } from "../../../../entities/task";
import { TaskListItem } from "../task-list-item/task-list-item";
import { AddTaskButton } from "../../../add-task-button";
import { AddTaskModal } from "../../../../features/add-task";
import { EmptyState } from "../../../../shared/ui/empty-state";
import styles from "./task-list.module.css";

type Props = {
  tasks: Task[];
  onAdd?: (title: string) => void;
  onEdit?: (id: string, title: string) => void;
  onAddSubTask?: (parentId: string, title: string) => void;
  onEditSubTask?: (parentId: string, subTaskId: string, title: string) => void;
  onToggleComplete?: (id: string) => void;
  onToggleCollapse?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDeleteSubTask?: (parentId: string, subTaskId: string) => void;
  onTaskReorder?: (activeId: string, overId: string) => void;
  onSubTaskReorder?: (
    parentId: string,
    activeId: string,
    overId: string
  ) => void;
};

export const TaskList: FC<Props> = ({
  tasks,
  onAdd,
  onEdit,
  onAddSubTask,
  onEditSubTask,
  onToggleComplete,
  onToggleCollapse,
  onDelete,
  onDeleteSubTask,
  onTaskReorder,
  onSubTaskReorder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const openAddModal = () => setIsOpen(true);
  const closeAddModal = () => setIsOpen(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeTask = tasks.find((task) =>
      task.subtasks?.some((subtask) => subtask.id === active.id)
    );

    if (activeTask) {
      onSubTaskReorder?.(activeTask.id, active.id, over.id);
    } else {
      onTaskReorder?.(active.id, over.id);
    }
  };

  const allIds = [
    ...tasks.map((task) => task.id),
    ...tasks.flatMap(
      (task) => task.subtasks?.map((subtask) => subtask.id) || []
    ),
  ];


  if (tasks.length === 0) {
    return (
      <section className={styles.taskContainer}>
        <EmptyState message="Здесь пусто" />
        <AddTaskButton onClick={openAddModal} />
        <AddTaskModal
          isOpen={isOpen}
          onClose={closeAddModal}
          onSubmit={(title) => onAdd?.(title)}
        />
      </section>
    );
  }

  return (
    <section className={styles.taskContainer}>
      <div className={styles.priorityHeader}>
        <span className={styles.priorityLabel}>Приоритет</span>
        <span className={styles.highPriority}>Высокий</span>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={allIds} strategy={verticalListSortingStrategy}>
          <ul className={styles.taskList}>
            {tasks.map((task) => (
              <TaskListItem
                key={task.id}
                task={task}
                onEdit={onEdit}
                onAddSubTask={onAddSubTask}
                onEditSubTask={onEditSubTask}
                onToggleComplete={onToggleComplete}
                onToggleCollapse={onToggleCollapse}
                onDelete={onDelete}
                onDeleteSubTask={onDeleteSubTask}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      <div className={styles.priorityFooter}>
        <span className={styles.lowPriority}>Низкий</span>
      </div>

      <AddTaskButton onClick={openAddModal} />
      <AddTaskModal
        isOpen={isOpen}
        onClose={closeAddModal}
        onSubmit={(title) => onAdd?.(title)}
      />
    </section>
  );
};
