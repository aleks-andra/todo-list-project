import type { Task } from "./types";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Прочитать рекомендованную книгу",
    completed: false,
    isCollapsed: true,
    priority: 1,
    subtasks: [
      {
        id: "1-1",
        title: "Найти рекомендованные книги",
        completed: false,
        priority: 1, 
      },
      { id: "1-2", title: "Заказать книгу онлайн", completed: true, priority: 2 },
    ],
  },
  {
    id: "2",
    title: "Заняться планированием отпуска",
    completed: false,
    isCollapsed: true,
    priority: 2, 
    subtasks: [
      { id: "2-1", title: "Выбрать место для отпуска", completed: false, priority: 1 },
      { id: "2-2", title: "Заказать билеты", completed: false, priority: 2 },
      { id: "2-3", title: "Забронировать отель", completed: false, priority: 3 },
    ],
  },
  { id: "3", title: "Приготовить ужин", completed: false, priority: 3 },
  { id: "4", title: "Записаться на тренировку", completed: false, priority: 4 }, 
];
