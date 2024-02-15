import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatListModule, DatePipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private localStorageService: LocalStorageService) {}
  taskLists$ = this.localStorageService.getTaskLists();
}
