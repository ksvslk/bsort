import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatListModule, MatToolbarModule, DatePipe, RouterLink, MatButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router, private localStorageService: LocalStorageService) {}
  taskLists$ = this.localStorageService.getTaskLists();

  createNewTaskList()
  {
    const id = this.localStorageService.createNewTaskList();
    this.router.navigateByUrl('/'+id);
  }
}
