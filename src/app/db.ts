import "fake-indexeddb/auto";
import Dexie, { Table } from 'dexie';


export interface TaskList {
    id?: number;
    title: string;
    date: Date;
    prioritized: boolean;
}

export interface Task {
    id?: number;
    taskListId: number;
    title: string;
}

export class AppDB extends Dexie {
    tasks!: Table<Task, number>;
    taskLists!: Table<TaskList, number>;

    constructor() {
        super('ngdexieliveQuery');
        this.version(3).stores({
            taskLists: '++id',
            tasks: '++id, taskListId',
        });
        this.on('populate', () => this.populate());
    }

    async populate() {
        const taskListId1 = await db.taskLists.add({
            title: 'Project 1',
            date: new Date(Date.now()),
            prioritized: false
        });
        const taskListId2 = await db.taskLists.add({
            title: 'Project 2',
            date: new Date(Date.now()),
            prioritized: false
        });
        const taskListId3 = await db.taskLists.add({
            title: 'Project 3',
            date: new Date(Date.now()),
            prioritized: false
        });
        const taskListId4 = await db.taskLists.add({
            title: 'Project 4',
            date: new Date(Date.now()),
            prioritized: false
        });
        const taskListId5 = await db.taskLists.add({
            title: 'Project 4',
            date: new Date(Date.now()),
            prioritized: false
        });
        
        await db.tasks.bulkAdd([
            {
                taskListId:taskListId1,
                title: 'Feed the birds',
            },
            {
                taskListId:taskListId1,
                title: 'Watch a movie',
            },
            {
                taskListId:taskListId1,
                title: 'Have some sleep',
            },
            {
                taskListId:taskListId2,
                title: 'Feed the birds',
            },
            {
                taskListId:taskListId2,
                title: 'Watch a movie',
            },
            {
                taskListId:taskListId2,
                title: 'Have some sleep',
            },
            {
                taskListId:taskListId3,
                title: 'Feed the birds',
            },
            {
                taskListId:taskListId3,
                title: 'Watch a movie',
            },
            {
                taskListId:taskListId3,
                title: 'Have some sleep',
            },
            {
                taskListId:taskListId4,
                title: 'Feed the birds',
            },
            {
                taskListId:taskListId4,
                title: 'Watch a movie',
            },
            {
                taskListId:taskListId4,
                title: 'Have some sleep',
            },
            {
                taskListId:taskListId5,
                title: 'Feed the birds',
            },
            {
                taskListId:taskListId5,
                title: 'Watch a movie',
            },
            {
                taskListId:taskListId5,
                title: 'Have some sleep',
            },
        ]);
    }
    async resetDatabase() {
        await db.transaction('rw', 'tasks', 'taskLists', () => {
          this.tasks.clear();
          this.taskLists.clear();
          this.populate();
        });
      }
}

export const db = new AppDB();