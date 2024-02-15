import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { HomeComponent } from './home/home.component';
import { SortComponent } from './sort/sort.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: ':id', component: TaskListComponent},
    { path: 'sort/:id', component: SortComponent}
];
