import { Injectable } from '@angular/core';
import { Task } from '../app/interface/task';
import { TaskList } from '../app/interface/task-list';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  private taskListKey = 'taskLists';

  constructor() { }

  // Check if localStorage is supported
  private isLocalStorageSupported(): boolean {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  }

  changeTitle(newTitle: string, taskListId: number) : TaskList | undefined {
    var taskLists = this.getTaskLists();
    var targetTaskList = taskLists.find(taskList => taskList.id == taskListId);
    if (targetTaskList) {
      targetTaskList.title = newTitle;
      localStorage.setItem(this.taskListKey, JSON.stringify(taskLists));
    }
    return this.getTaskList(taskListId);
  }

  addTask(title: string, taskListId: number): Task[] {
    const currentTasks = this.getTasks(taskListId);
    const newTask: Task = {
      id: currentTasks.length + 1,
      taskListId: taskListId,
      title: title
    }
    currentTasks.push(newTask);
    localStorage.setItem(taskListId.toString(), JSON.stringify(currentTasks));
    const r = this.getTasks(taskListId)
    return r;
  }

  getMaxId(taskLists: TaskList[]): number {
    if (taskLists.length === 0) return 0;
    const maxId = taskLists.reduce((max, currentList) => {
      return currentList.id! > max! ? currentList.id : max;
    }, taskLists[0].id);
    return maxId ?? 0;
  }

  createNewTaskList(): number {
    const currentTaskLists = this.getTaskLists();
    const newTaskListId = this.getMaxId(currentTaskLists) + 1
    const defaultTaskList = { id: newTaskListId, title: 'Project #' + newTaskListId, date: new Date(), prioritized: false };
    currentTaskLists.push(defaultTaskList)
    localStorage.setItem(this.taskListKey, JSON.stringify(currentTaskLists));
    return defaultTaskList.id;
  }

  deleteTaskList(id: number): void {
    // delete the item with key same as the id, this deletes all tasks
    localStorage.removeItem(id.toString());
    // delete task list itself
    let taskListsJson = localStorage.getItem(this.taskListKey)
    const taskLists: TaskList[] = taskListsJson ? JSON.parse(taskListsJson) : [];
    const updatedTaskLists = taskLists.filter(tl => {
      return tl.id != id
    });
    localStorage.setItem(this.taskListKey, JSON.stringify(updatedTaskLists));
  }

  deleteTask(taskId: number, taskListId:number): Task[] {
    const tasks = this.getTasks(taskListId);
    const updatedTasks = tasks.filter(v => { return v.id != taskId });
    localStorage.setItem(taskListId.toString(), JSON.stringify(updatedTasks));
    return this.getTasks(taskListId);
  }

  renameTitleOfTask(taskId: number, taskListId:number, newTitle:string): Task[] {
    const tasks = this.getTasks(taskListId);
    tasks.forEach(v => {
      if (v.id == taskId)
      {
        v.title = newTitle;
      }
    });
    localStorage.setItem(taskListId.toString(), JSON.stringify(tasks));
    return this.getTasks(taskListId);
  }

  getTaskList(id: number): TaskList | undefined {
    const taskLists = localStorage.getItem(this.taskListKey.toString());
    const lists: [TaskList] = taskLists ? JSON.parse(taskLists) : [];
    const currentList = lists.find((value, _) => {
      return value.id == id
    });
    return currentList;
  }

  getTaskLists(): TaskList[] {
    const taskLists = localStorage.getItem(this.taskListKey.toString());
    return taskLists ? JSON.parse(taskLists) : [];
  }

  getTasks(taskListId: number): Task[] {
    const tasks = localStorage.getItem(taskListId.toString());
    return (tasks ? JSON.parse(tasks) : []);
  }

  getTasksByTaskListId(taskListId: number): Task[] {
    const tasks = this.getTasks(taskListId);
    return tasks;
  }

  saveTasksForList(tasks:Task[], listId:number)
  {
    console.log("Saving sorted tasks for: " + listId, tasks)
    localStorage.setItem(listId.toString(), JSON.stringify(tasks));
  }

  setAsSorted(listId:number, sorted:boolean = true) : TaskList | undefined
  {
    var taskLists = this.getTaskLists();
    var targetTaskList = taskLists.find(taskList => taskList.id == listId);
    if (targetTaskList) {
      targetTaskList.prioritized = sorted
      localStorage.setItem(this.taskListKey, JSON.stringify(taskLists));
    }
    return this.getTaskList(listId);
  }

}