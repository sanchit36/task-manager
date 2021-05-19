import tasksTypes from "./tasks.types";

export const getAllTasks = (tasks) => ({
  type: tasksTypes.GET_ALL_TASKS,
  payload: tasks,
});
