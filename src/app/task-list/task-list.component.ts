import { Component, Input, OnInit } from '@angular/core';
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
import {MatMenuModule} from '@angular/material/menu';
import {Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MatListModule, MatToolbarModule, CommonModule, MatButtonModule, MatIconModule,MatMenuModule, RouterModule, MatBottomSheetModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})

export class TaskListComponent implements OnInit {
  @Input() id!: number;
  tasks$: Task[] = [];
  taskList$: TaskList | undefined;

  constructor(private _bottomSheet: MatBottomSheet, private router: Router, private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.tasks$ = this.localStorageService.getTasksByTaskListId(this.id);
    this.taskList$ = this.localStorageService.getTaskList(this.id);
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

  openEditTaskSheet(taskId:number, taskName:string): void {
    this._bottomSheet.open(BottomSheetEditTask, {
      data: { title : taskName },
    }).afterDismissed().subscribe(taskEdit => {
      if (taskEdit && taskEdit.result.length > 0)
      {
        this.renameTaskTitle(taskId, taskEdit.result);
      }
    });
  }

  openEditTaskListSheet(): void {
    this._bottomSheet.open(BottomSheetEditTaskList, {
      data: { title : this.taskList$?.title },
    }).afterDismissed().subscribe(taskListNameEdit => {
      if (taskListNameEdit && taskListNameEdit.result.length > 0)
      {
        this.taskList$ = this.localStorageService.changeTitle(taskListNameEdit.result, this.id)
      }
    });
  }

  deleteTask(taskId:number)
  {
    this.tasks$ = this.localStorageService.deleteTask(taskId, this.id);
  }

  renameTaskTitle(taskId:number, newTitle:string){
    this.tasks$ = this.localStorageService.renameTitleOfTask(taskId, this.id, newTitle);
  }

  deleteTaskList(): void {
    this.localStorageService.deleteTaskList(this.id);
    this.router.navigateByUrl('/');
  }

  goToSortPage(): void {
    this.router.navigateByUrl('/sort/' + this.id);
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

@Component({
  selector: 'edit-task-sheet',
  templateUrl: 'edit-task-sheet.html',
  standalone: true,
  imports: [MatListModule, MatButtonModule,FormsModule, MatFormFieldModule, MatInputModule],
})
export class BottomSheetEditTask {
  currentTaskName$: string = ""

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: {title: string}, private _bottomSheetRef: MatBottomSheetRef<BottomSheetEditTask>) {
    this.currentTaskName$ = this.data.title;
  }

  renameTaskName(newTitle:string) {
    const returnData = { result: newTitle };
    this._bottomSheetRef.dismiss(returnData);
  }
}


@Component({
  selector: 'edit-tasklist-sheet',
  templateUrl: 'edit-tasklist-sheet.html',
  standalone: true,
  imports: [MatListModule, MatButtonModule,FormsModule, MatFormFieldModule, MatInputModule],
})
export class BottomSheetEditTaskList {
  currentTaskListName$: string = ""

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: {title: string}, private _bottomSheetRef: MatBottomSheetRef<BottomSheetEditTaskList>) {
    this.currentTaskListName$ = this.data.title;
  }

  renameTaskListTitle(newTitle:string) {
    const returnData = { result: newTitle };
    this._bottomSheetRef.dismiss(returnData);
  }
}
