import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: ':id', component: TaskListComponent}
];
