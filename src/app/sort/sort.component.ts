import { Component, Input, OnInit } from '@angular/core';
import { TaskList } from '../interface/task-list';
import { Task } from '../interface/task';
import { LocalStorageService } from '../local-storage.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCard} from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [MatToolbarModule, MatCard, MatRippleModule],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.css'
})
export class SortComponent implements OnInit {
  @Input() id!: number;
  tasks$: Task[] = [];
  taskList$: TaskList | undefined;

  constructor(private localStorageService: LocalStorageService) {
    console.log("tasks @ sort ", this.tasks$);
  }

  test()
  {
    console.log("Test")
  }

  ngOnInit(): void {
    this.tasks$ = this.localStorageService.getTasksByTaskListId(this.id);
    this.taskList$ = this.localStorageService.getTaskList(this.id);
  }

}
