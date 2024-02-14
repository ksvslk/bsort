import { Component, Input } from '@angular/core';
import { liveQuery } from 'dexie';
import { Task, db } from '../db';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MatListModule, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input() listId!: number;

  tasks$ = liveQuery(() => db.tasks.get(this.listId));

  identifyTask(index: number, task: Task) {
    return `${task.id}${task.title}`;
  }

}


