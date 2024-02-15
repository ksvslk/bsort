import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Task } from '../interface/task';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TaskList } from '../interface/task-list';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MatListModule, CommonModule, MatButtonModule, MatIconModule, RouterModule, MatBottomSheetModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})

export class TaskListComponent implements OnInit {
  @Input() id!: number;
  tasks$: Task[] = [];
  taskList$: TaskList | undefined;
  isEditing$: boolean = false;

  constructor(private _bottomSheet: MatBottomSheet, private router: Router, private localStorageService: LocalStorageService) {
  }

  openAddTaskSheet(): void {
    this._bottomSheet.open(BottomSheetAddTask, {
      data: { id : this.id },
    }).afterDismissed().subscribe(taskSubmit => {
      if (taskSubmit && taskSubmit.result.length > 0)
      {
        this.tasks$ = this.localStorageService.addTask(taskSubmit.result, this.id)
      }
    });
  }

  changeTitle(): void {
    console.log("changing title")
  }


  deleteTaskList(): void {
    this.localStorageService.deleteTaskList(this.id);
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
    console.log(this.id)
    this.tasks$ = this.localStorageService.getTasksByTaskListId(this.id);
    this.taskList$ = this.localStorageService.getTaskList(this.id);
    console.log(this.taskList$?.title)
    console.log(this.tasks$)
  }

}

@Component({
  selector: 'add-task-sheet',
  templateUrl: 'add-task-sheet.html',
  standalone: true,
  imports: [MatListModule, MatButtonModule,FormsModule, MatFormFieldModule, MatInputModule],
})
export class BottomSheetAddTask {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetAddTask>) { }
  addTask(title:string) {
    const returnData = { result: title };
    this._bottomSheetRef.dismiss(returnData);
  }
}


