import { Component } from '@angular/core';
import { WorldClockComponent } from './world-clock/world-clock.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorldClockComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
