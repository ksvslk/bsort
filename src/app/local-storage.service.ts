import { Injectable } from '@angular/core';
import { Task } from '../app/interface/task';
import { TaskList } from '../app/interface/task-list';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  private taskListKey = 'taskLists';
  private taskKey = 'tasks';

  constructor() {
    if (this.isLocalStorageSupported()) {
      this.initializeDummyData();
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
    if (!localStorage.getItem(this.taskListKey) || !localStorage.getItem(this.taskKey)) {
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


  // TaskList Operations
  saveTaskList(taskList: TaskList): void {
    const taskLists = this.getTaskLists();
    const existingIndex = taskLists.findIndex(tl => tl.id === taskList.id);
    if (existingIndex > -1) {
      taskLists[existingIndex] = taskList;
    } else {
      const newId = taskLists.length > 0 ? Math.max(...taskLists.map(tl => tl.id || 0)) + 1 : 1;
      taskList.id = newId; // Assign a new ID
      taskLists.push(taskList);
    }
    localStorage.setItem(this.taskListKey, JSON.stringify(taskLists));
  }

  getTaskLists(): TaskList[] {
    const taskLists = localStorage.getItem(this.taskListKey);
    return taskLists ? JSON.parse(taskLists) : [];
  }

  deleteTaskList(id: number): void {
    let taskLists = this.getTaskLists();
    taskLists = taskLists.filter(tl => tl.id !== id);
    localStorage.setItem(this.taskListKey, JSON.stringify(taskLists));
  }

  // Task Operations
  saveTask(task: Task): void {
    const tasks = this.getTasks(task.taskListId);
    const existingIndex = tasks.findIndex(t => t.id === task.id);
    if (existingIndex > -1) {
      tasks[existingIndex] = task;
    } else {
      const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id || 0)) + 1 : 1;
      task.id = newId; // Assign a new ID
      tasks.push(task);
    }
    localStorage.setItem(this.taskKey, JSON.stringify(tasks));
  }

  getTasks(taskListId:number): Task[] {
    const tasks = localStorage.getItem(taskListId.toString());
    return tasks ? JSON.parse(tasks) : [];
  }

  getTasksByTaskListId(taskListId: number): Task[] {
    console.log("getting tasks for " + taskListId)
    return this.getTasks(taskListId);
  }

  deleteTask(id: number, taskListId:number): void {
    let tasks = this.getTasks(taskListId);
    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem(this.taskKey, JSON.stringify(tasks));
  }
}