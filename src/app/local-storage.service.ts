import { Injectable } from '@angular/core';
import { Task } from '../app/interface/task';
import { TaskList } from '../app/interface/task-list';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  private taskListKey = 'taskLists';

  constructor() {
    if (this.isLocalStorageSupported()) {
     // this.initializeDummyData();
    }
  }

  // Check if localStorage is supported
  private isLocalStorageSupported(): boolean {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  }

  private initializeDummyData(): void {
    // Check if data already exists to avoid overwriting
    if (!localStorage.getItem(this.taskListKey)) {
      const taskLists: TaskList[] = [
        { id: 1, title: 'Work', date: new Date(), prioritized: true },
        { id: 2, title: 'Home', date: new Date(), prioritized: false },
        { id: 3, title: 'Hobby', date: new Date(), prioritized: true },
        { id: 4, title: 'Exercise', date: new Date(), prioritized: false },
        { id: 5, title: 'Grocery Shopping', date: new Date(), prioritized: false },
      ];

      // Save task lists
      localStorage.setItem(this.taskListKey, JSON.stringify(taskLists));

      // Create and save tasks for each list
      taskLists.forEach((taskList) => {
        const numberOfTasks = Math.floor(Math.random() * (7 - 4 + 1)) + 4; // Generate between 4 and 7 tasks
        const tasks: Task[] = [];
        for (let i = 1; i <= numberOfTasks; i++) {
          tasks.push({
            id: i,
            taskListId: taskList.id!,
            title: `Task ${i} for ${taskList.title}`,
          });
        }
        localStorage.setItem(taskList.id!.toString(), JSON.stringify(tasks)); // Store tasks separately for each list
      });
    }
  }

  addTask(title:string, taskListId:number):Task[]
  {
    const currentTasks = this.getTasks(taskListId);
    const newTask:Task = {
      taskListId: taskListId,
      title: title
    }
    currentTasks.push(newTask);
    console.log("Adding task: ", newTask)
    localStorage.setItem(taskListId.toString(), JSON.stringify(currentTasks));
     const r = this.getTasks(taskListId)
    console.log("Result ", r)

    return r;
  }

  getMaxId(taskLists: TaskList[]): number {
    if (taskLists.length === 0) return 0;
    const maxId = taskLists.reduce((max, currentList) => {
      return currentList.id! > max! ? currentList.id : max;
    }, taskLists[0].id);
    return maxId ?? 0;
  }

  createNewTaskList():number {
    const currentTaskLists = this.getTaskLists();
    const newTaskListId = this.getMaxId(currentTaskLists) + 1
    const defaultTaskList =  { id: newTaskListId, title: 'Project #' + newTaskListId, date: new Date(), prioritized: false };
    currentTaskLists.push(defaultTaskList)
    localStorage.setItem(this.taskListKey, JSON.stringify(currentTaskLists));
    return newTaskListId;
  }

  deleteTaskList(id: number): void {
    // delete the item with key same as the id, this deletes all tasks
    localStorage.removeItem(id.toString());
    // delete task list itself
    let taskListsJson = localStorage.getItem(this.taskListKey)
    console.log(taskListsJson)
    const taskLists: TaskList[] = taskListsJson ? JSON.parse(taskListsJson) : [];
    console.log(taskLists)
    const updatedTaskLists = taskLists.filter(tl =>{
      return tl.id != id
    });
    console.log(updatedTaskLists)
    localStorage.setItem(this.taskListKey, JSON.stringify(updatedTaskLists));
  }

  getTaskList(id:number): TaskList | undefined {
    const taskLists = localStorage.getItem(this.taskListKey.toString());
    const lists:[TaskList] = taskLists ? JSON.parse(taskLists) : [];
    console.log("lists: ", lists)
    const currentList = lists.find((value, _) => {
      return value.id == id
    });
    console.log("currentList: ",currentList )
    return currentList;
  }

  getTaskLists(): TaskList[] {
    const taskLists = localStorage.getItem(this.taskListKey.toString());
    return taskLists ? JSON.parse(taskLists) : [];
  }

  getTasks(taskListId: number): Task[] {
    const tasks = localStorage.getItem(taskListId.toString());
    return tasks ? JSON.parse(tasks) : [];
  }

  getTasksByTaskListId(taskListId: number): Task[] {
    console.log("getting tasks for " + taskListId)
    return this.getTasks(taskListId);
  }

}