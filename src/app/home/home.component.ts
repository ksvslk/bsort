import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatListModule, DatePipe, RouterLink, MatButtonModule, RouterModule, MatIcon],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router, private localStorageService: LocalStorageService) {}
  taskLists$ = this.localStorageService.getTaskLists();

  createNewTaskList()
  {
    console.log("TERE")
    const id = this.localStorageService.createNewTaskList();
    this.router.navigateByUrl('/list/'+id);
  }
}
