import { Component, Input, OnInit } from '@angular/core';
import { TaskList } from '../interface/task-list';
import { Task } from '../interface/task';
import { LocalStorageService } from '../local-storage.service';
import { MatCard } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [MatCard, MatRippleModule, RouterModule],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.css'
})
export class SortComponent implements OnInit {
  @Input() id!: number;
  tasks$: Task[] = [];
  taskList$: TaskList | undefined;
  choice$1:Task | undefined;
  choice$2:Task | undefined;

  constructor(private router: Router, private localStorageService: LocalStorageService) {
  }

  continueSorting = (id:number | undefined) => { };

  pause(): Promise<number | undefined> {
    return new Promise((resolve) => {
      this.continueSorting = resolve;
    });
  }

  async bubbleSort(): Promise<void> {
    let n = this.tasks$.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        this.choice$1 = this.tasks$[j]
        this.choice$2 = this.tasks$[j + 1]
        const choiceTaskId = await this.pause(); // Execution pauses here until the "Continue" button is clicked
        
        if (this.tasks$[j].id != choiceTaskId) {
          // Swap elements
          let temp = this.tasks$[j];
          this.tasks$[j] = this.tasks$[j + 1];
          this.tasks$[j + 1] = temp;
        }
      }
    }
    this.tasks$.forEach((_, index ) => {
      this.tasks$[index].id = index
    })
    this.localStorageService.saveTasksForList(this.tasks$, this.id)
    this.localStorageService.setAsSorted(this.id)
    this.router.navigateByUrl('project/'+this.id);
  }

  ngOnInit(): void {
    this.tasks$ = this.localStorageService.getTasksByTaskListId(this.id);
    this.taskList$ = this.localStorageService.getTaskList(this.id);
    if (this.taskList$ == undefined)
    {
      this.router.navigateByUrl('');
      return;
    }
    this.bubbleSort()
  }

}
