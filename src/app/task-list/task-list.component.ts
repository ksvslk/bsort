import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Task } from '../interface/task';
import { TaskList } from '../interface/task-list';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MatListModule, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})

export class TaskListComponent implements OnInit{
  @Input() id!: number;
  tasks$: Task[] = [];

  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    console.log(this.id)
    this.tasks$ = this.localStorageService.getTasksByTaskListId(this.id);
    console.log(this.tasks$)
  }

 
}


