import React, { ReactNode } from "react";
import Task from "../../src/models/Task/Task";
import { TaskInterface } from "../../src/models/Task/TaskInterface";

async function getTasksFromStore(
  date: number,
  callback: (tasks: TaskInterface[]) => void | ReactNode
) {
  const tasks = await Task.all(date);
  !!tasks && callback(tasks);
};

export { getTasksFromStore };