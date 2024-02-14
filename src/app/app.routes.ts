import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'list/:id', component: TaskListComponent}
];
