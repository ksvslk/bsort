import { Component, OnInit, VERSION } from '@angular/core';
import {  RouterModule, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, RouterModule]
})
export class AppComponent implements OnInit {
  
  currentUrl$: string = "";

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(navEnd => {
      this.currentUrl$ = (navEnd as NavigationEnd).url;
    })
  }
 
}
