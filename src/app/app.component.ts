import { Component, VERSION } from '@angular/core';
import { liveQuery } from 'dexie';
import { TaskList, db } from './db';
import { CommonModule, DatePipe } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, MatListModule, DatePipe, RouterLink]
})
export class AppComponent {
  taskLists$ = liveQuery(() => db.taskLists.toArray());

  async resetDatabase() {
    await db.resetDatabase();
  }

  identifyList(index: number, list: TaskList) {
    return `${list.id}${list.title}`;
  }
}
